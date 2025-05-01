# Expense Audit

{% hint style="info" %}
Expense Audit delivers AI-powered expense report auditing to identify high-risk expenses and detect potential fraud or misuse.
{% endhint %}

## Introduction

The Expense Audit API allows you to automate the submission of expense reports for AI auditing and retrieve audit results. This enables seamless integration with your existing expense management systems.

## Key Features

* **Submit expense reports** for AI auditing via API
* **Retrieve audit results** for expense reports
* **Update audit actions** when reviewers take action on flagged expenses
* **OAuth 2.0 authentication** for secure API access

## API Endpoints

| Endpoint Category | Description |
| --- | --- |
| Ingestion API | Submit expense reports and associated data for auditing |
| Results API | Retrieve audit results for processed expense reports |
| Audit Action API | Submit reviewer actions for flagged expenses |

## Authentication

Expense Audit APIs use OAuth 2.0 for authentication. For detailed authentication instructions, see the [Authentication](/__authentication-__.md) section.

## Common Use Cases

{% hint style="info" %}
Here are some common integration scenarios for the Expense Audit API:
{% endhint %}

1. **Real-time Expense Auditing**
   * Submit expense reports as they are created in your system
   * Receive audit results before approval workflows
   * Flag high-risk expenses for manual review

2. **Batch Processing**
   * Submit multiple expense reports in a single API call
   * Process historical expense data for compliance analysis
   * Generate audit reports for accounting periods

3. **Post-Audit Actions**
   * Report reviewer decisions back to AppZen
   * Update machine learning models with human decisions
   * Track compliance metrics and audit effectiveness

## Getting Started

To get started with the Expense Audit API:

1. Request API credentials from your AppZen account manager
2. Generate an OAuth token using the [Token Generation](/__token-generation__.md) process
3. Begin submitting expense reports using the Ingestion API
4. Retrieve audit results using the Results API

{% hint style="warning" %}
All API requests must include proper authentication headers. Unauthenticated requests will be rejected with a 401 Unauthorized status code.
{% endhint %}

For further assistance, contact support@appzen.com.
