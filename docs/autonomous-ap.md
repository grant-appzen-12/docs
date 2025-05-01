# Autonomous AP

{% hint style="info" %}
AppZen Autonomous AP delivers autonomous processing for all invoices sent to your organization, increasing the speed and accuracy of processing while lowering costs.
{% endhint %}

## Introduction

Autonomous AP automates the processing of non-digital invoices (PDF and standard images) and posts processed information back to the customer's ERP systems. It is an AI-first application that understands invoice content, context, and meaning, enforces company spend policies, performs 3-way PO matching, predicts GL and cost centers, audits and verifies vendor information, prepares each invoice for workflow approval, and posts processed invoices in the ERP system.

## Key Features

* **Intelligent invoice capture** with 99.5%+ accuracy
* **Autonomous 2 and 3-way matching** against purchase orders
* **AI-powered GL coding** and approver routing
* **Fraud and compliance detection** before payment
* **Seamless ERP integration** through APIs and CSV files

## Integration Options

| Integration Method | Description | Best For |
| --- | --- | --- |
| API Integration | Real-time data exchange with your ERP system | Organizations requiring immediate invoice processing and status updates |
| CSV Integration | File-based data exchange through SFTP | Organizations with legacy systems or limited API capabilities |
| Email Integration | Email-based invoice submission | Organizations seeking simplicity or with low invoice volumes |

## Authentication

Autonomous AP APIs use API key-based authentication. For detailed authentication instructions, see the [Authentication](/__authentication-__.md) section.

## API Endpoints

Autonomous AP provides APIs for:

* Invoice submission
* Master data synchronization
* Processing status retrieval
* Payment information updates

For organizations using CSV-based integration, see the [CSV](csv.md) section for file format specifications and SFTP setup instructions.

## Document Requirements

{% hint style="info" %}
For optimal processing results, invoice documents should:
{% endhint %}

* Be in PDF, PNG, or JPG format
* Have a minimum resolution of 300 DPI
* Contain clear, readable text (not handwritten)
* Include essential invoice information (date, amount, vendor details)

## Getting Started

To get started with Autonomous AP:

1. Request API credentials from your AppZen account manager
2. Configure your master data synchronization (vendors, chart of accounts, etc.)
3. Set up your preferred integration method (API or CSV)
4. Begin submitting invoices for processing

{% hint style="warning" %}
All AP configurations should be tested in a sandbox environment before deploying to production. This ensures proper data mapping and workflow configurations.
{% endhint %}

For further assistance, contact support@appzen.com.
