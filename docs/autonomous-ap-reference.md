# API Reference

AppZen Autonomous AP APIs are organized around REST principles:
* Form-encoded request bodies
* JSON-encoded responses
* Standard HTTP response codes and verbs

## Request and Response Structure

### Request Structure

**Base URL**: `https://api.appzen.com/ap`

For a particular call, append the base URL with the resource name. Some endpoints contain Path Parameters.

Example:
```
https://api.appzen.com/ap/v1/invoices
```

**Method**: Use appropriate HTTP method (GET, POST, PUT, DELETE) based on the action.

**Headers**: All APIs require authentication headers. See [Authentication](/__authentication-__.md) for details.

**Body**: JSON payloads for request body when applicable.

### Response Structure

**Headers**: Standard HTTP response headers are returned.

**Body**: JSON format responses with success or failure information.

**Pagination**: Available for endpoints returning multiple results, following JSON API specification.

**Response Codes**:

| Response Code | Description |
| --- | --- |
| 2xx | The request is successful. |
| 4xx, 5xx | The request failed. |

## Authentication

{% hint style="info" %}
Authentication requires these fields from the AppZen Support team:
1. **customer_id**: Your unique customer identifier
2. **x-api-key**: Your API key
3. **customer-key**: Your customer-specific key
{% endhint %}

## API Categories

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

The Autonomous AP APIs have a rate limit of 20 requests per second for each data type.

## Error Handling

Responses include HTTP status codes and a JSON body with additional error details:

```json
{
  "status": "error",
  "error_code": "INVALID_PARAMETER",
  "message": "The parameter 'supplier_id' is required",
  "request_id": "req_123456789"
}
```

## Versioning

API version is specified in the URL path (e.g., `/v1/invoices`). New versions are released for major changes, with prior versions supported for a transition period.
