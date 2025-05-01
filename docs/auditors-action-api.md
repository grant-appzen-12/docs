# Auditor's Action API

## Overview

The Auditor's Action API allows auditors to take action on expense reports that have been flagged for review. This API supports operations to approve, reject, or request additional information for expense reports.

## API Integration

### Manual Audit Process Flow

1. Expense reports are ingested using the [Expense Report Ingestion API](expense-audit-reference.md)
2. AppZen audits the reports and assigns risk scores
3. Auditors review the flagged expense reports
4. Auditors take action using this API to approve, reject, or request additional information
5. The action is recorded and the expense status is updated

## API Details

### Update Expense Report Status

To update the status of an expense report after auditor review.

**Request URI**
```
POST https://api.appzen.com/expense-auditor-action/v1/update-status
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| Authorization | String | The valid token to authorize the request. | Yes |

**Body Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| external_report_id | String | The external report ID. | Yes |
| action | String | The action performed by the auditor. Valid values: APPROVE, REJECT, REQUEST_INFO | Yes |
| comment | String | The comment provided by the auditor. | No |
| auditor_email | String | The email of the auditor who took the action. | Yes |

**Sample Request**

```bash
curl -L -X POST 'https://api.appzen.com/expense-auditor-action/v1/update-status' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJrxxxx' \
--data-raw '{
    "external_report_id": "EXPENSE-123456",
    "action": "APPROVE",
    "comment": "All receipts verified and expenses are within policy",
    "auditor_email": "auditor@company.com"
}'
```

**Sample Response - Success**

```json
{
    "status": "success",
    "message": "Status updated successfully",
    "data": {
        "external_report_id": "EXPENSE-123456",
        "action": "APPROVE",
        "timestamp": "2023-01-02T15:45:22.123Z"
    }
}
```

**Sample Response - Failure**

```json
{
    "status": "error",
    "message": "Invalid report ID or unauthorized action",
    "error_code": "INVALID_REPORT"
}
```

**Response Codes**

| Response Code | Description |
| --- | --- |
| 200 | The request is successful. |
| 400 | Bad request - invalid parameters. |
| 401 | Unauthorized - invalid authentication. |
| 404 | Report not found. |
| 500 | The request failed. |

## Auditor's Decision Logging

All auditor actions are logged for compliance and auditing purposes. Each action includes:

- Timestamp of the action
- Auditor who performed the action
- Type of action taken
- Comments provided
- Report and expense details affected

## Best Practices

1. **Provide Clear Comments**: Always include clear, specific comments when taking action on an expense report.
2. **Consistency in Actions**: Establish consistent criteria for approvals, rejections, and information requests.
3. **Authentication**: Ensure proper authentication credentials are used for each API call.
4. **Error Handling**: Implement robust error handling to manage API responses effectively.
5. **Audit Trail**: Maintain a comprehensive audit trail of all actions taken.

{% hint style="info" %}
For questions on specific auditor actions or policy implementation, contact support@appzen.com.
{% endhint %}
