# Expense Audit

{% hint style="info" %}
AppZen Expense Audit integrates with a customer's expense management system to perform a real-time audit of every line item in their expense reports. It can cross-reference expense reports with receipts and thousands of online sources and extracts key information from a receipt to catch duplicates, out-of-policy spend, incorrect amounts, suspicious merchants or attendees, and excessive spend.
{% endhint %}

## Introduction

This page assists you in making AppZen API calls quickly and easily. This page provides an understanding of the AppZen Rest API Integration.

### AppZen Rest API Integration Flow

1. **Authentication**: The journey begins with authentication.
2. **Expense Report Ingestion**: This is followed by the ingestion of expense reports from your system into the AppZen system.
3. **Expense Audit Results**: The AppZen system audits the expense reports and assigns them a risk score. The score may be - Low, Medium, or High.
4. **Auditor's Action**: 
   * The expense reports needing an auditor's attention move further in the system for reimbursement.
   * The auditor can then take action on these reports according to the company's T&E policies.

## API Reference Overview

This page provides an understanding of how the APIs behave. AppZen APIs are organized around REST as follows:
* The API accepts form-encoded request bodies.
* It returns JSON-encoded responses.
* It uses standard HTTP response codes and verbs.

### Request and Response Structure

#### Request Structure

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

#### Response Structure

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

### Rate Limit

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
| Upload Report Details | To Upload the expense report details for ingestion. Call this API after all the required attachments are uploaded into the system. |

### Expense Audit Results APIs

| API | Description |
| --- | --- |
| Fetch Audit Results for a Single Expense Report | To Fetch the Audit Results for a Single Expense Report. |
| Fetch Audit Results for Expense Reports in Bulk | To Fetch the Audit Results in bulk. |

## Expense Report Ingestion API

### Overview

For the ingestion of the expense reports from your system into the AppZen system, you need to proceed with the following steps:

1. First Generate the URL to Upload the Attachment.
2. Next Upload Attachment using the URL.
3. Finally, Upload Report Details using API to Ingest the Report.

For calling the APIs, you will need the access token.

### Generate the URL to Upload the Attachment

Generates the URL for uploading the expense report. The report can be a PDF file or an image. For calling the API, you will need the access token.

This generates a pre-signed URL for uploading the attachment to the AppZen environment.

{% hint style="info" %}
Note the `file_id` field from the response. In the AppZen system, this is the Key/Name of your attachment. You will need this field while uploading a report.
{% endhint %}

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
-H 'Cookie: JSESSIONID=706102609C71A1DF432013174363574B' \
--data-raw ''
```

**Sample Response - Success**

```json
{
    "Status": "Success",
    "msg": "Successfully generated URL for uploading image",
    "image_upload_url_details": {
        "url": "https://appzen-images.s3.amazonaws.com/100439/b229c99f-e4xxx-4a07-9f77-8e9ee1fb513a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221226T062738Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIASWXSxxxxEDEM%2F20221226%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=086axxxb78b44e4exxxx8efe8f7413f754debfd87b77167aa7f2",
        "file_id": "b229c99f-e451-4a07-9f77-8e9ee1fb513a"
    },
    "external_report_id": "TestAPIReport5"
}
```

**Sample Response - Failure**

```json
{
    "timestamp": 1672037794859,
    "status": 401,
    "error": "Unauthorized",
    "message": "Signed JWT rejected: Invalid signature",
    "path": "/reports/TestAPIReport/images/upload-url"
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
-H 'Content-Type: image/png' \
--data-binary '{path_of_the_image}';
```

**Sample Response - Success**

```
Status Code: 200 [with empty response]
```

### Upload Report Details

To Upload the expense report details for ingestion. Call this API after all the required attachments are uploaded into the system. You need to specify the external_report_id. For calling the API, you will need the access token.

{% hint style="info" %}
The `file_id` field which you got as part of the response when you called Generate the URL to Upload Attachment needs to be passed in the request body. Submit this as the value for the `elimageid []` parameter.
{% endhint %}

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
| userName | String | This field should be populated with 'last name, first name' | Yes |
| userid | String | This field needs to be populated with the value of employee id. | Yes |
| emailAddress | String | User's email id. | Yes |
| externalOrgId | String | This field is required when a new organization needs to be created by AppZen system. | No |
| externalOrgName | String | This field is required when a new organization needs to be created by AppZen system. | No |
| external_template_id | String | This field is required when a new template needs to be created by AppZen system. Either send template_id and template_name or external_template_id and external_template_name | No |
| external_template_name | String | This field is required when a new template needs to be created by AppZen system. | No |
| template_name | String | A valid template_name provided by AppZen needs to be passed against this field. | No |
| templateId | String | A valid template_id provided by AppZen needs to be passed against this field. In case a valid template_id is not available, it needs to be skipped and valid template details need to be passed instead. | No |
| orgId | String | An organization is a way of segregation of expenses. | No |
| reportLevelImage | String | Receipt Image at report level. | No |
| reportLevelImageArray | [String] | List of images at report level. | No |
| country | String | User's organization country code in ISO3 format. | Yes |
| countryCode | String | User's organization country code in ISO2 format. | No |
| curr | String | Organization currency/reimbursement currency ISO3. | Yes |
| date | String | Submission date of expense report. | Yes |
| desc | String | Description of the expense report. | No |
| status | String | Status of report in source expense system. workflow status in source system. | Yes |
| elines | Object | This is the root element to hold the information on the expense lines. | Yes |

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
                "el_type": "Hotel Room Charges 001 New",
                "el_curr": "USD",
                "missing_receipt": "N",
                "expense_line_iId": 1,
                "elItemizedFlag": "false",
                "eldetails": [],
                "elamount": "1200.00",
                "elpaidamount": "1200.00",
                "elpurpose": "Expense Link Description",
                "eldate": "2020-12-01T14:23:57.014",
                "eline_id": "1",
                "elpaidcurr": "USD",
                "elconvrate": "0.145507246376813",
                "elinetype": "CREDIT",
                "elpersonalflag": "N",
                "elcostcenter": "605",
                "elvatflag": "false",
                "elimageid": [
                    "f06657f4-9edf-4429-88cf-f3e918c8dd43"
                ]
            }
        ],
        "external_template_id": "external_template_name_trial_44",
        "template_id": "20016792",
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
    "msg": "Following fields are mandatory: matching customerId."
}
```

## Auditor's Action API

### Overview

Whenever the auditor takes any action on your expense report, the Audit Action API pushes out this information to your system. This event and the associated data will be sent as shown below:

* AppZen posts the auditor's action to your system.
* AppZen tries to send the webhook up to three times.

The following audit workflow events are supported:
* Automatic Approved
* Automatic Reject
* Manual Approved
* Manual Reject

### Webhook Details

The webhook details are as follows:

* Before any report-related actions, the webhook sends out test events to verify the connection. This ensures reduced communication errors during live workflows.
* Only on receiving a response with HTTP Status Code 200 is the communication considered successful.

AppZen supports multiple Authentication mechanisms:

#### 1. API Key-based Authentication

In this case, the webhook configuration is as follows:

```json
{
    "customerId" : xx32,
    "appzenProduct" : "EXPENSE",
    "externalPlatform" : "WEBHOOK",
    "baseUrl" : "<ExternalSystemURL>",
    "authnType" : "ApiKey",
    "authnConfigName" : "identifierName",
    "credentialsJson" : {
        "x-api-key" : "providedAPIKey"
    }
}
```

#### 2. OAuth 2.0 Support

In this case, the webhook configuration is as follows:

```json
{
    "customerId" : xx32,
    "appzenProduct" : "EXPENSE",
    "externalPlatform" : "WEBHOOK",
    "baseUrl" : "<ExternalSystemURL>",
    "authnType" : "OAuth2.0",
    "authnConfigName" : "identifierName",
    "credentialsJson" : {
        "client_id" : "id",
        "client_secret" : "secret",
        "scopes" : "<optional>",
        "token_url" : "<URL which needs to be called for getting the token>",
        "token" : {
            "<store actual Client Auth Token to be used for API calls>"
        }
    }
}
```

### Sample Webhook Payload

```json
{
    "report_Id" : "XYZ",
    "audit_status" : "MANUAL_AUDIT_APPROVED",
    "auditor_comments" : "{comments}",
    "actioned_by" : "{auditor_email}",
    "event" : "report_status_change"
}
```

## Expense Audit Results API

### Overview

For fetching the audit results of the expense reports till date, use this set of APIs. You may:

* Fetch Audit Results for a Single Expense Report
* Fetch Audit Results for Expense Reports in Bulk

For calling the APIs, you will need the access token.

### Fetch Audit Results for a Single Expense Report

To Fetch the Audit Results for a Single Expense Report. For calling the API, you will need the access token.

**Request URI**
```
GET https://api.appzen.com/expense-audit-results/v2/reports/{{external-report-id}}
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
curl -L -X GET 'https://api.appzen.com/expense-audit-results/v2/reports/APISampleReport1' \
-H 'Authorization: Bearer eyJrxxxx' \
-H 'Cookie: JSESSIONID=7D4120C01A02DBDC70E6785E4044B141'
```

**Sample Response - Success**

```json
{
    "customer_id": 100439,
    "external_report_id": "APISampleReport1",
    "current_risk_level": "HIGH",
    "original_risk_level": "HIGH",
    "computed_risk_level": "HIGH",
    "audit_result_created_at": "2022-12-27 04:01:38.950",
    "header_level_risk_details": [
        {
            "rule_name": "Report Unauthorized Expenses",
            "current_risk_level": "LOW",
            "original_risk_level": "LOW",
            "computed_risk_level": "LOW",
            "risk_message": "No unauthorized items were detected in report.",
            "parameters": null
        },
        {
            "rule_name": "Daily meal limit check",
            "current_risk_level": "LOW",
            "original_risk_level": "LOW",
            "computed_risk_level": "LOW",
            "risk_message": "Meal expenses are within threshold",
            "parameters": null
        }
    ],
    "line_level_results": [
        {
            "external_exp_line_id": "352549433",
            "line_level_risk_details": [
                {
                    "rule_name": "Expense Age",
                    "current_risk_level": "MEDIUM",
                    "original_risk_level": "MEDIUM",
                    "computed_risk_level": "MEDIUM",
                    "risk_message": "The transaction date exceeds the expense age threshold but has low confidence.",
                    "parameters": null
                },
                {
                    "rule_name": "Weekend Expense",
                    "current_risk_level": "LOW",
                    "original_risk_level": "LOW",
                    "computed_risk_level": "LOW",
                    "risk_message": "This expense is incurred during weekend days but the expense type is not applicable to apply this rule.",
                    "parameters": null
                },
                {
                    "rule_name": "Amount Verification",
                    "current_risk_level": "HIGH",
                    "original_risk_level": "HIGH",
                    "computed_risk_level": "HIGH",
                    "risk_message": "Amount for this line is above threshold of 20",
                    "parameters": null
                }
            ]
        }
    ]
}
```

**Sample Response - Failure**

```json
{
    "timestamp": "2023-01-02T10:23:00.843+00:00",
    "status": 401,
    "error": "Unauthorized",
    "message":"Invalid unsecured/JWS/JWE header: Invalid JSON: Unexpected token Èšï¿½Y\bï¿½ï¿½ï¿½ï¿½Ù"ï¿½[ZÐï¿½Õ›\fï¿½]ï¿½Ó˜\\Nï¿½ï¿½ï¿½ï¿½Nï¿½ï¿½ï¿½Z at position 41.",
    "path": "/v2/exp-audit-results/reports/APISampleReport1"
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 500 | The request failed. |
