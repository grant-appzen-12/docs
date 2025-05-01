# API Reference

## Overview

This page provides a comprehensive reference for the Expense Audit APIs. AppZen APIs are organized around REST as follows:
* The API accepts form-encoded request bodies.
* It returns JSON-encoded responses.
* It uses standard HTTP response codes and verbs.

## Request and Response Structure

### Request Structure

Below is the Request Structure for AppZen:

**Request URI**:
The requests to AppZen APIs must be sent to the base URL:
```
https://api.appzen.com
```

For a particular call, append the base URL with the name of the resource. Some endpoints may contain Path Parameters.

Example:
```
https://api.appzen.com/expense-ingestion/reports/{{external_report_id}}/images/upload-url
```

**Request Method**:
AppZen APIs use the standard HTTP Verbs/Methods. Select the suitable method: GET, POST, PUT, or DELETE based on the action to be performed.

**Request Headers**:
AppZen APIs use headers for authentication. AppZen supports OAuth1.0 and OAuth 2.0. based authentication.

**Request Body**:
The request body supports JSON payloads.

### Response Structure

Below is the Response Structure for AppZen:

**Response Headers**:
The Standard HTTP response headers are returned.

**Response Body**:
The response body is in JSON format returning the success or failure information.

**Pagination**:
At times there might be many audit results returned on fetching them. To handle this, the expense APIs support pagination per the JSON API specification for pagination.

**Response Codes**:
The endpoints in the AppZen APIs, return standard HTTP status codes for successful or unsuccessful operations. The following table describes the common response codes:

| Response Code | Description |
| --- | --- |
| 2xx | The request is successful. |
| 4xx, 5xx | The request failed. |

## Rate Limit

{% hint style="info" %}
The Rate Limit helps guard against instability and attacks. You can make 10,000 API requests per month, which is the default. You can increase this limit by contacting the AppZen Support team. Your request will be unsuccessful once you have consumed the available quota.
{% endhint %}

## List of APIs

Based on their functionality, the Expense APIs are categorized as follows:

### Authentication APIs

| API | Description |
| --- | --- |
| [Token Generation](/__token-generation__.md) | Generates an access token to AppZen's API gateway for authentication and validation. |

### Expense Report Ingestion APIs

| API | Description |
| --- | --- |
| Generate the URL to Upload Attachment | To Generate the URL for uploading the expense report. |
| Upload Attachment using the URL | To Upload the attachment using the URL generated on calling the Generate the URL to Upload the Attachment. |
| Submit Expense Report | To Submit the expense report. |

### Expense Audit Results APIs

| API | Description |
| --- | --- |
| Fetch Audit Results for a Single Expense Report | To Fetch the Audit Results for a Single Expense Report. |
| Fetch Audit Results for Expense Reports in Bulk | To Fetch the Audit Results in bulk. |

## Expense Report Ingestion API

### Overview

The Expense Report Ingestion API is used to submit an expense report for auditing. The process involves three steps:
1. Generate a URL to upload attachments (receipts, invoices, etc.)
2. Upload the attachments using the generated URL
3. Submit the expense report data

### Generate the URL to Upload Attachment

To generate the URL for uploading the expense report attachments.

**Request URI**
```
GET https://api.appzen.com/expense-ingestion/reports/{{external_report_id}}/images/upload-url
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| Authorization | String | The valid token to authorize the request. | Yes |

**Path Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| external_report_id | String | The External report id. | Yes |

**Sample Request**

```bash
curl -L -X GET 'https://api.appzen.com/expense-ingestion/reports/TestAPIReport/images/upload-url' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJrxxxx' \
-H 'Cookie: JSESSIONID=B663D6B89CB2D7A4BE1A91D80A2D0599'
```

**Sample Response - Success**

```json
{
    "Url": "https://appzenstg.s3.amazonaws.com/customer1/expenses/expenseline/receipt-images/TestAPIReport_7a7aa4c3-77fd-41c6-a9dc-ff99ef58ef9a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230102T091517Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAIFITGMK5HJM2UHUA%2F20230102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9fcced7f39a8cd26c94f5d76f1fc3d2bb6e74f2e57fa2cf3a8c48b6fbc9ac65d"
}
```

**Sample Response - Failure**

```json
{
    "timestamp": "2023-01-02T09:29:42.823+00:00",
    "status": 401,
    "error": "Unauthorized",
    "message": "Invalid unsecured/JWS/JWE header: Invalid JSON: Unexpected token Èšï¿½Y\bï¿½ï¿½ï¿½ï¿½Ù"ï¿½[ZÐï¿½Õ›\fï¿½]ï¿½Ó˜\\Nï¿½ï¿½ï¿½ï¿½Nï¿½ï¿½ï¿½Z at position 41.",
    "path": "/expense-ingestion/reports/TestAPIReport/images/upload-url"
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 500 | The request failed. |

### Upload Attachment using the URL

To Upload the attachment. You will need to use the URL generated on calling the Generate the URL to Upload the Attachment.

**Request URI**
```
PUT /{{upload_URL}}
```

**Body Parameters**

| Description | Type | Required |
| --- | --- | --- |
| Select the path of the image/pdf to be uploaded | binary | Yes |

**Sample Request**

```bash
curl -L -X PUT '{{upload_URL}}' \
--upload-file '/path/to/your/local/file.png'
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 500 | The request failed. |

### Submit Expense Report

To Submit the expense report.

**Request URI**
```
PUT https://api.appzen.com/expense-ingestion/reports/{{external_report_id}}
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| Authorization | String | The valid token to authorize the request. | Yes |

**Path Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| external_report_id | String | The External report id. | Yes |

**Body Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| reportNumber | String | This is the root element to hold the details of a report being ingested. Values should be as a String | Yes |
| amount | String | Total amount. | Yes |
| report_name | String | Report Name - User inputted name. | Yes |
| curr | String | The currency used. | Yes |
| date | String | Report submission date. | Yes |
| last_updated_at | String | Last updated date of the report. | Yes |
| createdAt | String | Date of creation of the expense report. | Yes |
| status | String | Status of the report. The valid values can be: AppZen-Review and AppZen-Reviewed. | Yes |
| userName | String | The creator of the report. | Yes |
| userid | String | The unique id assigned to the creator of the expense report. | Yes |
| emailAddress | String | Email address of the creator of the expense report. | Yes |
| countryCode | String | User's country code in ISO3166 format. | Yes |
| customerId | String | A unique id for a customer. | Yes |
| orgId | String | An organization is a way of segregation of expenses. | No |
| reportLevelImage | String | Receipt Image at report level. | No |
| reportLevelImageArray | [String] | List of images at report level. | No |
| country | String | User's organization country code in ISO3 format. | Yes |

**Sample Request**

```bash
curl -L -X PUT 'https://api.appzen.com/expense-ingestion/reports/TestAPIReport' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJrxxxx' \
-H 'Cookie: JSESSIONID=B663D6B89CB2D7A4BE1A91D80A2D0599' \
--data-raw '{
    "expense_report": {
        "date": "2022-12-26T01:06:27",
        "country": "US",
        "amount": "1200.0",
        "report_name": "TestAPIReport",
        "last_updated_at": "2020-12-26T01:23:57.014Z",
        "elines": [
            {
                "id": "5563277",
                "date": "2022-12-26T01:06:27",
                "expType": "Test Category",
                "amount": "1200.0",
                "curCode": "USD",
                "desc": "LUNCH FOR CLIENT",
                "attendee1Name": "Test, Attendee1",
                "attendee1Email": "attende1@appzen.com",
                "attendee2Name": "Test, Attendee2",
                "attendee2Email": "attende2@appzen.com"
            }
        ],
        "userName": "API Doc Test",
        "userid": "Apidoctest@appzen.com",
        "createdAt": "2022-12-26T14:06:27",
        "emailAddress": "Apidoctest@appzen.com",
        "countryCode": "US",
        "customerId": "100439",
        "curr": "USD",
        "desc": "Test Report Ingested via API Auto",
        "status": "AppZen-Review"
    }
}'
```

**Sample Response - Success**

```json
{
    "Status": "Success",
    "msg": "Successfully processed submitted report"
}
```

**Sample Response - Failure**

```json
{
    "Status": "Failure",
    "msg": "Failure: Missing or invalid date value. Date should be in \"yyyy-MM-dd'T'HH:mm:ss\" format."
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 500 | The request failed. |
