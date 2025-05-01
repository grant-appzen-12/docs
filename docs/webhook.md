# Webhook

## Overview

AppZen provides a webhook system that enables real-time notifications when specific events occur in the expense audit process. Webhooks allow your system to receive automatic updates rather than polling the AppZen API for changes.

## Webhook Integration

AppZen webhooks send HTTP POST requests to your designated endpoint with JSON payloads containing event data. This enables your system to react to events in real-time, such as when an expense report's status changes or when an auditor takes action.

## Webhook Configuration

AppZen supports multiple Authentication mechanisms for webhooks:

### 1. API Key-based Authentication

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
        "apikey" : "API-KEY-VALUE"
    }
}
```

### 2. Basic Authentication

For Basic Authentication, the webhook configuration is:

```json
{
    "customerId" : xx32,
    "appzenProduct" : "EXPENSE",
    "externalPlatform" : "WEBHOOK",
    "baseUrl" : "<ExternalSystemURL>",
    "authnType" : "Basic",
    "credentialsJson" : {
        "username" : "USERNAME",
        "password" : "PASSWORD"
    }
}
```

### 3. OAuth 2.0 Client Credential Grant Flow

For OAuth 2.0 Client Credential Grant Flow, the webhook configuration is:

```json
{
    "customerId" : xx32,
    "appzenProduct" : "EXPENSE",
    "externalPlatform" : "WEBHOOK",
    "baseUrl" : "<ExternalSystemURL>",
    "authnType" : "OAuth2ClientCredentials",
    "credentialsJson" : {
        "clientId" : "CLIENT-ID",
        "clientSecret" : "CLIENT-SECRET",
        "accessTokenUri" : "https://oauth.example.com/token"
    }
}
```

## Webhook Event Types

AppZen webhooks support the following event types:

1. **Report Status Change**: Triggered when an expense report's status changes
2. **Audit Completion**: Triggered when AppZen completes the audit of an expense report
3. **High Risk Detection**: Triggered when a high-risk item is detected during audit
4. **Auditor Action**: Triggered when an auditor takes action on a report

## Sample Webhook Payload

Below is a sample webhook payload for a report status change event:

```json
{
    "event_type": "report_status_change",
    "timestamp": "2023-05-01T14:22:33Z",
    "report_data": {
        "external_report_id": "EXPENSE-123456",
        "previous_status": "PENDING_REVIEW",
        "current_status": "APPROVED",
        "risk_level": "LOW",
        "auditor_comments" : "All receipts verified and expenses are within policy",
        "actioned_by" : "auditor@company.com"
    }
}
```

## Setting Up a Webhook Endpoint

To receive webhook notifications from AppZen:

1. Create an HTTPS endpoint on your server to receive webhook POST requests
2. Ensure your endpoint can process JSON payloads
3. Implement authentication as configured in the webhook setup
4. Contact AppZen support to register your webhook endpoint

## Best Practices

1. **Respond Quickly**: Your webhook endpoint should respond with a 200 OK status code as quickly as possible
2. **Implement Idempotency**: Process webhook events idempotently to handle potential duplicate deliveries
3. **Verify Signatures**: If available, verify webhook signatures to ensure authenticity
4. **Queue Processing**: Queue webhook events for processing to avoid blocking the response
5. **Error Handling**: Implement robust error handling to manage webhook processing failures

{% hint style="warning" %}
For security reasons, your webhook endpoint must use HTTPS. HTTP endpoints are not supported.
{% endhint %}

## Testing Webhooks

AppZen provides a webhook testing tool in the developer portal that allows you to:

1. Send test webhook events to your endpoint
2. View delivery status and responses
3. Troubleshoot webhook integration issues

For more information on webhook testing or to set up webhooks for your integration, contact support@appzen.com.
