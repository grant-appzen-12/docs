# API Integration Flow

## Overview

This page explains the AppZen Rest API Integration flow for Expense Audit.

## Integration Flow

1. **Authentication**: The journey begins with authentication.
2. **Expense Report Ingestion**: This is followed by the ingestion of expense reports from your system into the AppZen system.
3. **Expense Audit Results**: The AppZen system audits the expense reports and assigns them a risk score. The score may be - Low, Medium, or High.
4. **Auditor's Action**: 
   * The expense reports needing an auditor's attention move further in the system for reimbursement.
   * The auditor can then take action on these reports according to the company's T&E policies.

## Integration Steps

### Step 1: Authentication

To authenticate with the AppZen API:
- Generate an OAuth token as described in the [Token Generation](/__token-generation__.md) section
- Include this token in the Authorization header of all API requests

### Step 2: Expense Report Ingestion

To ingest expense reports:
1. Generate a URL for uploading the expense report attachments
2. Upload the attachments using the generated URL
3. Submit the expense report data

### Step 3: Retrieve Audit Results

After the expense reports are processed:
1. Query the system for audit results
2. Process the risk scores and rule violations

### Step 4: Process Auditor Actions

Implement auditor actions in your system:
1. Receive webhooks when auditors make decisions
2. Update your expense system based on auditor actions

## Sample Integration Timeline

| Stage | Typical Duration | Notes |
| --- | --- | --- |
| Initial Setup | 1-2 weeks | Configure authentication and basic API endpoints |
| Test Integration | 1-2 weeks | Test end-to-end flow with sample data |
| Production Deployment | 1 week | Deploy to production and monitor initial results |
| Optimization | Ongoing | Fine-tune integration based on results and feedback |

{% hint style="info" %}
For detailed implementation guidance, refer to the [API Reference](expense-audit-reference.md) section.
{% endhint %}
