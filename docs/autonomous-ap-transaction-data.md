# Transaction Data APIs

## Overview

The Transaction Data APIs allow you to submit invoices for processing, check the status of invoice processing, retrieve extracted invoice data, and get audit results.

## Generate Upload URL API

Before submitting invoice documents, you need to generate a secure upload URL.

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/generate-upload-url
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/generate-upload-url" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key"
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Upload URL generated successfully",
  "data": {
    "upload_url": "https://appzen-storage.s3.amazonaws.com/invoices/upload?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...",
    "upload_id": "inv_upload_1234567890",
    "expires_in": 300
  }
}
```

## Invoice Submission API

### Overview

The Invoice Submission API allows you to submit an invoice document for processing.

**Request URI**
```
PUT https://api.appzen.com/ap/v1/invoices
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| Content-Type | String | application/json | Yes |

**Request Body Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| document_url | String | The URL of the invoice document (from the Generate Upload URL API) | Yes |
| external_id | String | Your system's invoice identifier | Yes |
| supplier_id | String | The supplier ID in your system | No |
| po_number | String | The purchase order number for matching | No |
| metadata | Object | Additional invoice metadata | No |

**Sample Request**

```bash
curl -X PUT "https://api.appzen.com/ap/v1/invoices" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "document_url": "https://appzen-storage.s3.amazonaws.com/invoices/upload?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...",
    "external_id": "INV12345",
    "supplier_id": "S001",
    "po_number": "PO-2023-0456",
    "metadata": {
      "department": "IT",
      "requestor": "john.doe@company.com"
    }
  }'
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Invoice submitted successfully",
  "data": {
    "invoice_id": "azp_inv_1234567890",
    "external_id": "INV12345",
    "processing_status": "submitted",
    "submitted_at": "2023-05-01T14:30:00Z"
  }
}
```

## Invoice Status API

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

**Sample Response**

```json
{
  "invoice_id": "azp_inv_1234567890",
  "external_id": "INV12345",
  "status": "processing",
  "progress": 60,
  "estimated_completion_time": "2023-05-01T14:35:00Z",
  "current_stage": "data_extraction",
  "submitted_at": "2023-05-01T14:30:00Z"
}
```

## Invoice Data API

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

## Invoice Audit Results API

The Invoice Audit Results API allows you to retrieve audit analysis results for processed invoices.

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/invoice/audit-results
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Query Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| uuid | String | The invoice UUID | Yes |
| supplier-id | String | The supplier ID | No |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/invoice/audit-results?uuid=testUUID&supplier-id=11" \
  -H "accept: application/json" \
  -H "x-api-key: R7wsFxxxx" \
  -H "customer-id: 1004xxxx" \
  -H "customer-key: 15d1xxxx"
```

**Sample Response**

```json
[
  {
    "audit_results": {
      "uuid": "08edd8d9-cc1c-45e1-8bbb-29ffb7e3a404",
      "invoice-number": "MHEIN00051739",
      "invoice-id": "77887788",
      "supplier-id": "7082403",
      "rules": [
        {
          "rule_code": "duplicate_invoice_amount",
          "risk_message": "No duplicate detected",
          "risk_results": {
            "risk_level": "LOW"
          }
        }
      ],
      "risk_level": "LOW",
      "status": "Approved"
    }
  }
]
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful |
| 404 | Resource not found |
| 401 | Unauthorized - invalid credentials |
| 500 | Server error |

## Invoice Update API

### Update Invoice Data

**Request URI**
```
PATCH https://api.appzen.com/ap/v1/invoices/{invoice_id}
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| Content-Type | String | application/json | Yes |

**Path Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| invoice_id | String | The AppZen-assigned invoice ID | Yes |

**Request Body Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| vendor | Object | Updated vendor information | No |
| invoice_details | Object | Updated invoice details | No |
| line_items | Array | Updated line items | No |
| gl_coding | Object | Updated GL coding information | No |

**Sample Request**

```bash
curl -X PATCH "https://api.appzen.com/ap/v1/invoices/azp_inv_1234567890" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_details": {
      "invoice_number": "INV-2023-05-0001-CORRECTED",
      "due_date": "2023-05-20"
    },
    "gl_coding": {
      "default_gl_code": "6510",
      "default_cost_center": "CC002"
    }
  }'
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Invoice updated successfully",
  "data": {
    "invoice_id": "azp_inv_1234567890",
    "external_id": "INV12345",
    "updated_at": "2023-05-01T15:30:00Z"
  }
}
```
