# CSV

## Introduction

{% hint style="info" %}
CSV (comma-separated values) files provide a simple, lightweight way to transfer data between different systems, especially when API integration isn't available.
{% endhint %}

A CSV file is a plain text file that stores comma-delimited data in a tabular format. The abbreviation CSV stands for "comma-separated values." CSV files have several advantages:

* **Easy to read**: Unlike some other data storage formats, CSV files are easily readable by humans, as they store information in plain text.
* **Lightweight**: These files have a small footprint. The only additional space they take up is the header row and the commas between each data field.

ERPs often need to move large amounts of data (such as catalogs, orders, or historical data) from one system to another for processing. The issue is that how one system structures and accepts data might be different from the destination system.

{% hint style="info" %}
Many organizations rely on integration that uses CSV files to export and import text files of their data between systems. CSVs are a universal file type that many systems support, and they are comparatively easier to manage.
{% endhint %}

### Advantages of CSV Integration

1. **Keep and Connect Systems without APIs**
   * Not all software systems have available APIs for integration. This is often the case for older "legacy" software.
   * Integrating with these systems must be done without using APIs, meaning your best option might be file-based integration.
   * Most systems at least accept CSV via a manual import process, no matter the age of the software. Some offer the ability to automate the CSV import by pointing to an SFTP server.

2. **Non-proprietary**
   * CSV files are non-proprietary to any specific software vendor.
   * Creating and sharing a CSV is a generic way to handle data. This makes them easy to interact with and share among people and systems.
   * You can create CSVs by leveraging Excel or other spreadsheet software and most people are comfortable handling them this way.

3. **Easier to Create Files**
   * Since CSVs are plain-text files, it is easier for a web developer or other members of your team to create, view, and validate the data as a spreadsheet.
   * All you need is a header row at the top and subsequent rows of data. You will be able to manipulate the data to organize it as you need.
   * It is then easy to share this data across different systems.

## CSV Integration

AppZen's System Integration Framework provides the ability to integrate AppZen with supported ERP systems. Using the Integration Framework makes it easy to configure, schedule, and view integration jobs and their statuses.

AppZen supports Master Data ingestion for Autonomous AP and Employee Sync using the CSV route.

Steps to set up:

1. Select System Integrations from the Integrations dropdown
2. Click on the Add New Integration Source and setup the Integration Source
3. Choose Appzen - SFTP as the source and provide a name
4. Go to Scheduling, and choose the integration source defined above
5. You can view the integration status on the Integrations Job Status page

## CSV - SFTP Integration for Master Data and Employee Sync

{% hint style="info" %}
The CSV - SFTP Integration type enables manual transfer of data in CSV format from your ERP system to AppZen. The data must follow the specific CSV format (template) for each record type.
{% endhint %}

The data to be ingested in the AppZen system must be as per the CSV format (template) set for a specific record type. Templates for these record types can be downloaded from the Autonomous AP Scheduling tab of the 'System Integrations' screen.

The process of syncing employees, including their organizational hierarchy, in AppZen can be facilitated wherein users can provide the list of employees in a CSV file via SFTP. The Employee details can also be uploaded through the System Admin screen.

## CSV Templates

{% hint style="info" %}
You can upload the following Master Data details into the system through a predefined CSV format from the Integrations Job Status page.
{% endhint %}

| Template Type | Description |
| --- | --- |
| Payment Terms | Terms and conditions regarding the settlement of any invoice that the supplier dictates. |
| Chart of Accounts (COA) | A list of all the general ledger accounts that an organization uses to allocate its expenses. |
| Entity | The organization in whose name the invoice is issued, i.e., an organization that has purchased goods and services from the supplier. |
| Supplier | Any organization that supplies goods or/and services and issues invoice to the buyer. |
| Purchase Order | An official document stating the items, their quantity, and the intended purchase price. A unique alphanumeric id that identifies such a document is the purchase order number. |

{% hint style="note" %}
**Note:** There is a specific template for customers whose ERP is Ariba - please choose accordingly while downloading. For all other ERP systems, choose the AppZen template.
{% endhint %}

For performing Employee Hierarchy Sync alongside uploading all the details of Employee, choose the Employee option and download the relevant CSV template.

## Manage Failed Records

The list of failed records that could not be ingested in the AppZen system can be downloaded from the Integration Job Status screen. This file is under the Failed Item Count column and is also in the ‘.csv’ format. Along with all the record data, it contains the reason for the failure of the record. The new file in the SFTP server post resolving the errors can be uploaded. Those records are fetched into AppZen the next time the scheduled job runs.
