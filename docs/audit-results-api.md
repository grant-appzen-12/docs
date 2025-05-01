# Audit Results API

## Overview

For fetching the audit results of the expense reports till date, use this set of APIs. You may:

* Fetch Audit Results for a Single Expense Report
* Fetch Audit Results for Expense Reports in Bulk

For calling the APIs, you will need the access token.

## API Details

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

### Fetch Audit Results for Expense Reports in Bulk

To fetch audit results for multiple expense reports at once.

**Request URI**
```
GET https://api.appzen.com/expense-audit-results/v2/reports
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| Authorization | String | The valid token to authorize the request. | Yes |

**Query Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| from_date | String | Start date for the date range (format: YYYY-MM-DD) | Yes |
| to_date | String | End date for the date range (format: YYYY-MM-DD) | Yes |
| page | Integer | Page number for pagination | No |
| size | Integer | Number of records per page | No |
| risk_level | String | Filter by risk level (LOW, MEDIUM, HIGH) | No |

**Sample Request**

```bash
curl -L -X GET 'https://api.appzen.com/expense-audit-results/v2/reports?from_date=2023-01-01&to_date=2023-05-01&risk_level=HIGH' \
-H 'Authorization: Bearer eyJrxxxx'
```

**Sample Response - Success**

```json
{
    "total_count": 25,
    "page": 1,
    "size": 10,
    "reports": [
        {
            "customer_id": 100439,
            "external_report_id": "APISampleReport1",
            "current_risk_level": "HIGH",
            "original_risk_level": "HIGH",
            "computed_risk_level": "HIGH",
            "audit_result_created_at": "2023-01-15 12:24:38.950"
        },
        {
            "customer_id": 100439,
            "external_report_id": "APISampleReport2",
            "current_risk_level": "HIGH",
            "original_risk_level": "HIGH",
            "computed_risk_level": "HIGH",
            "audit_result_created_at": "2023-01-18 09:12:15.322"
        }
    ]
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 400 | Bad Request - invalid parameters. |
| 401 | Unauthorized - invalid token. |
| 500 | The request failed. |

## Working with Audit Results

### Risk Levels

AppZen assigns risk levels to expense reports based on policy compliance:

| Risk Level | Description |
| --- | --- |
| LOW | The expense is compliant with policies and does not require auditor review |
| MEDIUM | The expense has potential policy violations that may need auditor review |
| HIGH | The expense has critical policy violations that require auditor review |

### Rule Types

AppZen evaluates expenses against various rule types:

1. **Expense Policy Rules**: Check if expenses comply with company policies
2. **Receipt Verification**: Verify receipt authenticity and match with expense amount
3. **Duplicate Detection**: Identify potential duplicate submissions
4. **VAT/Tax Rules**: Verify proper tax handling and recovery opportunities
5. **Fraud Detection**: Identify potential fraudulent activities

{% hint style="info" %}
For detailed information about specific rules and their configurations, contact your AppZen account manager.
{% endhint %}
