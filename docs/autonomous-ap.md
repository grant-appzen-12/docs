# Autonomous AP

{% hint style="info" %}
AppZen Autonomous AP delivers autonomous processing for all invoices sent to your organization, increasing the speed and accuracy of processing while lowering costs.
{% endhint %}

## Introduction

Autonomous AP automates the processing of non-digital invoices (PDF and standard images) and posts processed information back to the customer's ERP systems. It is an AI-first application that understands invoice content, context, and meaning, enforces company spend policies, performs 3-way PO matching, predicts GL and cost centers, audits and verifies vendor information, prepares each invoice for workflow approval, and posts processed invoices in the ERP system.

## API Reference Overview

This page provides an understanding of how the Autonomous AP APIs behave. AppZen APIs are organized around REST as follows:
* The API accepts form-encoded request bodies
* It returns JSON-encoded responses
* It uses standard HTTP response codes and verbs

### Request and Response Structure

#### Request Structure

Below is the Request Structure for AppZen Autonomous AP:

**Request URI**:
The requests to AppZen APIs must be sent to the base URL:
```
https://api.appzen.com/ap
```

For a particular call, append the base URL with the name of the resource. Some endpoints may contain Path Parameters.

Example:
```
https://api.appzen.com/ap/v1/invoices
```

**Request Method**:
AppZen APIs use the standard HTTP Verbs/Methods. Select the suitable method: GET, POST, PUT, or DELETE based on the action to be performed.

**Request Headers**:
AppZen APIs use headers for authentication. The Autonomous AP APIs use API key-based authentication.

**Request Body**:
The request body supports JSON payloads.

#### Response Structure

Below is the Response Structure for Autonomous AP:

**Response Headers**:
The Standard HTTP response headers are returned.

**Response Body**:
The response body is in JSON format returning the success or failure information.

**Pagination**:
For endpoints that return multiple results, pagination is supported per the JSON API specification.

**Response Codes**:
The endpoints in the AppZen APIs return standard HTTP status codes for successful or unsuccessful operations. The following table describes the common response codes:

| Response Code | Description |
| --- | --- |
| 2xx | The request is successful. |
| 4xx, 5xx | The request failed. |

## Key Features

* **Intelligent invoice capture** with 99.5%+ accuracy
* **Autonomous 2 and 3-way matching** against purchase orders
* **AI-powered GL coding** and approver routing
* **Fraud and compliance detection** before payment
* **Seamless ERP integration** through APIs and CSV files

## Integration Options

| Integration Method | Description | Best For |
| --- | --- | --- |
| API Integration | Real-time data exchange with your ERP system | Organizations requiring immediate invoice processing and status updates |
| CSV Integration | File-based data exchange through SFTP | Organizations with legacy systems or limited API capabilities |
| Email Integration | Email-based invoice submission | Organizations seeking simplicity or with low invoice volumes |

## Authentication

Autonomous AP APIs use API key-based authentication. For detailed authentication instructions, see the [Authentication](/__authentication-__.md) section.

{% hint style="info" %}
Authentication for Autonomous AP APIs is done based on the following fields provided by the AppZen Support team:
1. **customer_id**: You will be provided with a unique value for this field.
2. **x-api-key**: You will be provided with a unique value for this field.
3. **customer-key**: You will be provided with a unique value for this field.
{% endhint %}

## API Endpoints

### Invoice Management APIs

| API | Description |
| --- | --- |
| Submit Invoice | Upload an invoice document for processing |
| Get Processing Status | Check the current status of an invoice in the processing pipeline |
| Retrieve Invoice Data | Get the extracted data for a processed invoice |
| Update Invoice | Update or correct information for an existing invoice |

### Master Data APIs

| API | Description |
| --- | --- |
| Sync Vendors | Synchronize vendor master data from your ERP |
| Sync Chart of Accounts | Synchronize GL account codes and cost centers |
| Sync Purchase Orders | Synchronize PO data for matching |
| Sync Payments | Update payment information for processed invoices |

### Workflow APIs

| API | Description |
| --- | --- |
| Get Workflow Status | Retrieve the current approval status for an invoice |
| Submit Approval | Submit an approval decision for an invoice |
| Route Invoice | Change the routing of an invoice to a different approver |

## Invoice Submission API

### Overview

The Invoice Submission API allows you to upload invoice documents for processing by the Autonomous AP system. The system supports various document formats including PDF, TIFF, PNG, and JPG.

### Submit Invoice

**Request URI**
```
POST https://api.appzen.com/ap/v1/invoices
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| Content-Type | String | multipart/form-data | Yes |

**Form Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| document | File | The invoice document (PDF, TIFF, PNG, JPG) | Yes |
| metadata | JSON | Additional metadata about the invoice | No |
| external_id | String | Your system's identifier for this invoice | Yes |

**Sample Request**

```bash
curl -X POST "https://api.appzen.com/ap/v1/invoices" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -F "document=@invoice.pdf" \
  -F "external_id=INV12345" \
  -F 'metadata={"priority":"high", "department":"finance"}'
```

**Sample Response - Success**

```json
{
  "status": "success",
  "invoice_id": "azp_inv_1234567890",
  "message": "Invoice successfully submitted for processing",
  "estimated_completion_time": "2023-05-01T10:30:00Z"
}
```

**Sample Response - Failure**

```json
{
  "status": "error",
  "error_code": "invalid_document",
  "message": "The submitted document could not be processed. Please ensure it is a valid invoice in PDF, TIFF, PNG, or JPG format."
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 202 | The invoice was accepted for processing |
| 400 | Bad request - validation error in the request |
| 401 | Unauthorized - invalid API credentials |
| 415 | Unsupported media type - document format not supported |
| 500 | Server error - processing failed |

## Invoice Status API

### Overview

The Invoice Status API allows you to check the current processing status of an invoice that was previously submitted.

### Get Processing Status

**Request URI**
```
GET https://api.appzen.com/ap/v1/invoices/{invoice_id}/status
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |

**Path Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| invoice_id | String | The AppZen-assigned invoice ID | Yes |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/ap/v1/invoices/azp_inv_1234567890/status" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key"
```

**Sample Response - Success**

```json
{
  "invoice_id": "azp_inv_1234567890",
  "external_id": "INV12345",
  "status": "processing_complete",
  "processing_steps": [
    {
      "step": "document_validation",
      "status": "complete",
      "timestamp": "2023-05-01T10:15:30Z"
    },
    {
      "step": "data_extraction",
      "status": "complete",
      "timestamp": "2023-05-01T10:18:45Z"
    },
    {
      "step": "vendor_validation",
      "status": "complete",
      "timestamp": "2023-05-01T10:20:10Z"
    },
    {
      "step": "po_matching",
      "status": "complete",
      "timestamp": "2023-05-01T10:22:30Z"
    },
    {
      "step": "gl_coding",
      "status": "complete",
      "timestamp": "2023-05-01T10:24:15Z"
    }
  ],
  "confidence_score": 0.95,
  "processing_time": 540,
  "next_action": "ready_for_approval"
}
```

**Sample Response - In Progress**

```json
{
  "invoice_id": "azp_inv_1234567890",
  "external_id": "INV12345",
  "status": "processing",
  "processing_steps": [
    {
      "step": "document_validation",
      "status": "complete",
      "timestamp": "2023-05-01T10:15:30Z"
    },
    {
      "step": "data_extraction",
      "status": "complete",
      "timestamp": "2023-05-01T10:18:45Z"
    },
    {
      "step": "vendor_validation",
      "status": "in_progress",
      "timestamp": "2023-05-01T10:19:10Z"
    }
  ],
  "estimated_completion_time": "2023-05-01T10:30:00Z"
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request was successful |
| 404 | Invoice not found |
| 401 | Unauthorized - invalid API credentials |
| 500 | Server error |

## Invoice Data Retrieval API

### Overview

The Invoice Data Retrieval API allows you to fetch the extracted data for invoices that have completed processing.

### Get Invoice Data

**Request URI**
```
GET https://api.appzen.com/ap/v1/invoices/{invoice_id}
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |

**Path Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| invoice_id | String | The AppZen-assigned invoice ID | Yes |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/ap/v1/invoices/azp_inv_1234567890" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key"
```

**Sample Response**

```json
{
  "invoice_id": "azp_inv_1234567890",
  "external_id": "INV12345",
  "status": "processing_complete",
  "vendor": {
    "name": "Acme Office Supplies",
    "vendor_id": "V-12345",
    "tax_id": "123456789",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postal_code": "12345",
      "country": "US"
    },
    "confidence": 0.98
  },
  "invoice_details": {
    "invoice_number": "INV-2023-05-0001",
    "invoice_date": "2023-04-15",
    "due_date": "2023-05-15",
    "currency": "USD",
    "total_amount": 1250.75,
    "tax_amount": 95.75,
    "confidence": 0.96
  },
  "line_items": [
    {
      "description": "Office Desk - Standard",
      "quantity": 2,
      "unit_price": 450.00,
      "amount": 900.00,
      "tax_code": "T1",
      "gl_code": "6505",
      "confidence": 0.95
    },
    {
      "description": "Office Chair - Ergonomic",
      "quantity": 3,
      "unit_price": 85.00,
      "amount": 255.00,
      "tax_code": "T1",
      "gl_code": "6505",
      "confidence": 0.93
    }
  ],
  "po_match": {
    "po_number": "PO-2023-0456",
    "match_type": "3-way",
    "match_status": "matched",
    "match_confidence": 0.97,
    "discrepancies": []
  },
  "gl_coding": {
    "default_gl_code": "6505",
    "default_cost_center": "CC001",
    "confidence": 0.92
  },
  "approval_workflow": {
    "current_status": "pending_approval",
    "approvers": [
      {
        "name": "Jane Smith",
        "email": "jane.smith@company.com",
        "level": 1,
        "status": "pending"
      }
    ]
  },
  "risk_assessment": {
    "risk_level": "low",
    "risk_factors": []
  },
  "document_url": "https://api.appzen.com/ap/v1/invoices/azp_inv_1234567890/document"
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request was successful |
| 404 | Invoice not found |
| 401 | Unauthorized - invalid API credentials |
| 500 | Server error |

## Document Requirements

{% hint style="info" %}
For optimal processing results, invoice documents should:
{% endhint %}

* Be in PDF, PNG, JPG, or TIFF format
* Have a minimum resolution of 300 DPI
* Contain clear, readable text (not handwritten)
* Include essential invoice information (date, amount, vendor details)
* Be properly oriented (right-side up)
* Have good contrast between text and background
* Be free of heavy markings or annotations that obscure text

## CSV Integration

For organizations using CSV-based integration, see the [CSV](csv.md) section for file format specifications and SFTP setup instructions.

{% hint style="warning" %}
When uploading CSV files to the SFTP server, ensure that the file naming conventions follow the specified pattern to ensure proper processing. Files should be named according to the format: `<file_type>_<date>_<sequence>.csv`, for example: `invoices_20230501_001.csv`
{% endhint %}

## Getting Started

To get started with Autonomous AP:

1. Request API credentials from your AppZen account manager
2. Configure your master data synchronization (vendors, chart of accounts, etc.)
3. Set up your preferred integration method (API or CSV)
4. Begin submitting invoices for processing

{% hint style="warning" %}
All AP configurations should be tested in a sandbox environment before deploying to production. This ensures proper data mapping and workflow configurations.
{% endhint %}

For further assistance, contact support@appzen.com.
