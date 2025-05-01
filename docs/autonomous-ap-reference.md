# API Reference

## Overview

This page provides an understanding of how the Autonomous AP APIs behave. AppZen APIs are organized around REST as follows:
* The API accepts form-encoded request bodies
* It returns JSON-encoded responses
* It uses standard HTTP response codes and verbs

## Request and Response Structure

### Request Structure

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

### Response Structure

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

## Authentication

Autonomous AP APIs use API key-based authentication. For detailed authentication instructions, see the [Authentication](/__authentication-__.md) section.

{% hint style="info" %}
Authentication for Autonomous AP APIs is done based on the following fields provided by the AppZen Support team:
1. **customer_id**: You will be provided with a unique value for this field.
2. **x-api-key**: You will be provided with a unique value for this field.
3. **customer-key**: You will be provided with a unique value for this field.
{% endhint %}

## API Categories

Based on their functionality, the Autonomous AP APIs are categorized as follows:

### Master Data APIs

| API | Description |
| --- | --- |
| Payment Terms | APIs to manage payment terms for vendor invoices |
| Chart of Accounts | APIs to manage GL account codes and cost centers |
| Entities | APIs to manage organizational entities |
| Suppliers | APIs to manage supplier/vendor information |
| Purchase Orders | APIs to manage purchase order data for matching |
| Unit of Measure | APIs to manage standardized units of measure |
| VAT | APIs to manage Value Added Tax configurations |

### Transaction Data APIs

| API | Description |
| --- | --- |
| Submit Invoice | Upload an invoice document for processing |
| Get Processing Status | Check the current status of an invoice in the processing pipeline |
| Retrieve Invoice Data | Get the extracted data for a processed invoice |
| Audit Results | Retrieve audit analysis results for processed invoices |
| Update Invoice | Update or correct information for an existing invoice |

## Rate Limits

The Autonomous AP APIs have a rate limit of 20 requests per second for each data type. If you exceed this limit, you will receive a 429 Too Many Requests response.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API call. In addition to the HTTP status code, the response body will contain a JSON object with additional information.

**Example Error Response:**

```json
{
  "status": "error",
  "error_code": "INVALID_PARAMETER",
  "message": "The parameter 'supplier_id' is required",
  "request_id": "req_123456789"
}
```

## Versioning

The API version is specified in the URL path. For example, `/v1/invoices` indicates version 1 of the Invoices API. When major changes are made to the API, a new version will be released and the old version will continue to be supported for a period of time.

## Support

For API support, contact support@appzen.com or refer to the [Getting Started](autonomous-ap-getting-started.md) guide for more information.
