# API Documentation

## Introduction

Our API documentation is an excellent resource if you're looking for an easy way to streamline your financial operations. You can quickly integrate our AppZen into your existing systems without any disruption. The instructions are easy to follow, allowing you to automate tasks such as expense management, invoice processing, and compliance checks. Our Public APIs are compatible with popular accounting and ERP systems like Coupa, SAP, Oracle, and NetSuite, so you don't have to worry about compatibility issues. Follow the step-by-step guide in the documentation, and you'll be up and running quickly! Feel free to contact support@appzen.com if you face any issues.

## Authentication

This section explains the authentication available in both EA and AAP.

#### Authentication in EA

AppZen’s external APIs support API key-based authentication (OAuth1.0). To provide additional security, AppZen supports OAuth 2.0.

#### OAuth 1.0 Authentication

OAuth ("Open Authorization") provides clients with "secure delegated access" to server resources.

In this case, AppZen uses an API key mechanism to validate calls to the API (OAuth 1.0). It also uses the customer\_id and API key combination to allow access to the public APIs.

Authentication for these APIs is done based on the following fields the AppZen Support team provides.

1. customer\_id: You will be provided with a unique value for this field.
2. x-api-key: You will be provided with a unique value for this field. The exact value is used by all the customers belonging to a particular integration.
3. Customer-key: You will be provided with unique value in this field.

#### OAuth 2.0 Authentication

For Expense Audit external APIs, the authentication type we used until now was API key-based authentication. Now, we have extended our support to OAuth 2.0 Authentication to access these below-mentioned APIs:

* Ingestion API
* Expense Audit Results API
* Audit Action API

OAuth 2.0 is the industry standard authentication process. We are upgrading to OAuth 2.0 as it adds an additional layer of security, it is time limited, and the OAuth2.0 token includes specific API in scope instead of all.

In this case, all requests to AppZen APIs are authenticated using OAuth 2.0 access token.

#### OAuth2.0 Self-serve

The Self-service credential generation now supports OAuth 2.0 for AppZen products. The introduction of OAuth 2.0 is for users opting for direct API based integration for their deployments, and for existing users with API Key based authorization. A new UI will be visible under the integration dropdown with the name ‘API Credentials’ from where API credentials can be generated without raising a support ticket. Currently, AppZen enables users with a System Admin Role to generate and regenerate these credentials.

{% hint style="info" %}
In this section, understand how to configure OAuth 2.0 through a self-service portal. The feature is currently only supported for Expense Audits, and future releases will also include Autonomous AP.

**NOTE: OAuth 2.0 is for new customers who opt for API-based integration.**

Even for existing customers who use API key-based authentication, it is available.

Since OAuth 2.0 is an industry-standard protocol for authentication, AppZen ensures all across availability.
{% endhint %}

#### Request for OAuth 2.0 token

You need to generate an access token to AppZen's API gateway for authentication and validation. For this, refer to Token Generation

You need to send subsequent requests with the Authorization HTTP header value as Bearer `<oauth2-access-token>`.

API credentials are unique to each customer and must be configured before making API calls. AppZen's external APIs support API key-based authentication (OAuth1.0). For additional security, AppZen also supports OAuth 2.0.

AppZen has a self-serve feature for OAuth 2.0 authentication, where users can set up the OAuth 2.0 with AppZen.

#### FAQs on OAuth 2.0

#### What is OAuth 2.0 and how does it work?

The OAuth 2.0 authorization framework is a protocol that allows a user to grant a third-party website or application access to the user's protected resources without necessarily revealing their long-term credentials or even their identity. AppZen thereby uses advanced authentication methods when users interact with its systems.

Why is OAuth 2.0 secure?

OAuth 2.0 is a secure, open data-sharing standard that should be built into every app. This authentication and authorization standard protects user data by providing access to the data without revealing the user's identity or credentials.

What is OAuth 2.0 in REST API?

AppZen's API is built around REST. In OAuth 2.0, the following three parties are involved:

* The user possesses data accessed through the API and wants to allow the application to access it.
* The application is to access the data through the API on the user's behalf.
* The API controls and enables access to the user's data.

Now, let us configure the steps to enable self-serve UI in the AppZen system. Navigate to the left menu and select Integration > API Credentials.

In this section, understand how to configure OAuth 2.0 through a self-service portal. The feature is currently only supported for Expense Audits, and future releases will also include Autonomous AP.

NOTE: OAuth 2.0 is for new customers who opt for API-based integration.

Even for existing customers who use API key-based authentication, it is available.

Since OAuth 2.0 is an industry-standard protocol for authentication, AppZen ensures all across availability.

As the API Credentials page opens, it displays a list of all the existing credentials set.

Image: API Credentials page view.

Select + Add New Credentials. The Add New Credentials page opens. Here, the admin needs to fill out the required details. Follow the steps mentioned below.

Image: The Add New Credential page opens.

1. Enter the Connection Name.\
   It should be unique/not configured previously.
2. View the Authorization Type:\
   This is pre-filled as OAuth 2.0.
3. Select from the two options under Scope: Choose either expense.report.read and/or expense.report.write
4. Grant Type will populate Client Credentials by default.
5. Select ‘Generate’ to generate the following credentials.
   * Base URL: This is generated based on the customer environment type.
   * Client ID: This gets generated automatically.
   * Client Secret: This gets generated automatically. The Client Secret disappears once the user moves away from the panel. Click on Regenerate to get the client's secret ID.
6. For Testing, select Copy as cURL. The URL, ClientID, and selected scopes are included.\
   Import this URL request to testing platforms like Postman, and paste the saved client secret to get a response token.

{% hint style="note" %}
* The bearer token expires in 60 minutes, and you need to refresh to regain access, and the scope is limited to the original grant.
* Currently, the generation of API credentials directly from the UI is available for Expense Audit only.
{% endhint %}

#### Authentication in AP

AppZen’s external APIs support API key-based authentication (OAuth1.0).

OAuth ("Open Authorization") provides clients a "secure delegated access" to server resources. It uses the customer\_id and API key combination to allow access to the public APIs.

Authentication for these APIs is done based on the following fields provided by the AppZen Support team:

1. customer\_id: You will be provided with a unique value for this field.
2. x-api-key: You will be provided with a unique value for this field.
3. customer-key: You will be provided with unique value for this field.

## Token Generation

{% hint style="info" %}
To access AppZen resources, you must generate an access token for authentication and validation. The token is valid for 60 minutes, after which it must be refreshed.
{% endhint %}

{% hint style="warning" %}
**Token Expiration:** The token is valid for 60 minutes only. After expiration, you will need to refresh the token to regain access. The refreshed token will have the same scope as the original grant.
{% endhint %}

### Request URI

```bash
POST https://api.appzen.com/api/v3/oauth2/token
```

### Body Parameters

{% hint style="info" %}
The following parameters are required when generating an access token:
{% endhint %}

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| client_id | String | The unique client Id assigned. | Yes |
| client_secret | String | The unique password assigned. | Yes |
| scope | String | The scope assigned.<br>The scope can be:<br>* expense.report.read<br>* expense.report.write | Yes |

### Sample Request

```bash
curl -L -X POST 'https://api.appzen.com/api/v3/oauth2/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=0oa6xxxx' \
--data-urlencode 'client_secret=wfiWxxxx' \
--data-urlencode 'scope=expense.report.read expense.report.write'
```

### Sample Response

#### Success

```json
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJrxxxx",
  "scope": "expense.report.read expense.report.write"
}
```

#### Failure

{% hint style="danger" %}
If you don't provide the required scope, you'll receive an error response as shown below.
{% endhint %}

```json
{
  "msg": "Internal Server Error: 400 Bad Request: \"{\"error\":\"invalid_scope\",\"error_description\":\"The authorization server resource does not have any configured default scopes, 'scope' must be provided.\"}\"",
  "httpStatus": "INTERNAL_SERVER_ERROR",
  "statusCode": 500
}
```

## Status Code

{% hint style="info" %}
The following status codes are returned by the API to indicate the result of your request.
{% endhint %}

| HTTP | Status | Code Summary |
| --- | --- | --- |
| 200 | OK | The request is successful |
| 201 | OK | The request is successful |
| 400 | Bad Request | The request failed due to a malformed request syntax. Check the requested URL, including the parameters. |
| 401 | Unauthorized | The request failed due to an authorization issue. For example, the Customer Key could be missing or invalid. |
| 402 | Request Failed | The parameters were valid but the request failed. |
| 403 | Forbidden | The API key doesn't have permissions to perform the request. |
| 404 | Not Found | The requested resource doesn't exist. Check the requested URL. |
| 429 | Too Many Requests | Too many requests hit the API too quickly/limit has been consumed. We recommend an exponential backoff of your requests. |
| 500, 502, 503, 504 | Server Errors | Something went wrong on AppZen's end. (These are rare.) |

## SSO

{% hint style="info" %}
Single Sign-On (SSO) allows your users to authenticate through your Identity Provider (IdP) when accessing AppZen.
{% endhint %}

### Introduction

{% hint style="info" %}
Before setting up SSO, please understand these key points:
* Only users marked as 'External' in the User module in System Admin will be able to log in using SSO.
* Claims-based authorization allows roles and organization access to be assigned to users using your IDP.
* On enabling Claims Based Authorization, role/org access will no longer be allowed in Appzen.
{% endhint %}

{% hint style="warning" %}
**Troubleshooting**: If users cannot see certain features as per their role - this could be due to the user not signing out of IDP. Ask the user to log in from an incognito window.
{% endhint %}

1. Click on 'Download Authorization Strings' to view the roles, organization (Expense Audit), and entities (Autonomous AP) expected by Appzen.
2. View documentation to preview sample assertion schema.

### Configuration

{% hint style="info" %}
AppZen only supports SP-based SSO. To enable SSO, you'll need to upload a metadata file from your IDP.
{% endhint %}

1. Upload a metadata file from your IDP in Appzen.
   * The file must have a .XML extension.
   * The following information must be present in the file:
     * IDP Issuer URI - can be found against the attribute entityID= in the meta-data file
     * IDP Single Sign-on URL - can be found against the Location= in the following tag: SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings: HTTP-Redirect" Location="
     * IDP Signature certificate: the certificate can be found in the metadata file from the following tag:ds: X509Certificate

2. Appzen will generate the following once the metadata file is uploaded:
   * Assertion consumer service (ACS) URL
   * Audience URI
   * Metadata file

3. Download the metadata file or use the URL/URI and configure it in your IDP.

### Testing

Once uploaded, test by clicking on 'Login with SSO' on this link using a user ID/email address to ensure SSO works.

### Debugging

{% hint style="info" %}
Follow these steps if you encounter issues with SSO authentication.
{% endhint %}

#### Access Issues

{% hint style="warning" %}
**If you are not able to access the Production Environment:**
{% endhint %}

1. Check if you are able to open the AppZen page.

2. If you are unable to open this page from within your VPN or network:
   * Check if you can access the page outside the VPN/network or from your mobile browser.
   * If you are able to access it outside the VPN/network but not from within, it means your internal IT team may be blocking the site. Reach out to your internal IT team and check if the AppZen site is being blocked.

#### Login Issues

{% hint style="warning" %}
**If you are able to open the page but unable to log in:**
{% endhint %}

Perform these steps in an incognito/private window (Firefox, Chrome, Edge):

1. If you do not get redirected to your IDP:
   * Check the network tab for any failing APIs.
   * If there is any API failing with a 401 or 400, right-click on the failing API and copy it as Curl.
   * Share logs with AppZen support.

2. If login fails with 400 OKTA Page:
   * Share the SAML tracer logs with AppZen support.

3. If you are getting an OKTA 400 error:
   * Ensure that the IDP URL is added correctly. It must be the same as that provided in the metadata file.

4. If issues persist, contact support@appzen.com.

### Sample Assertion Data

{% hint style="info" %}
Here's an example of the SSO assertion data structure with sample values.
{% endhint %}

| Attribute Name | Attribute Value |
| --- | --- |
| firstName | John |
| lastName | Doe |
| email | john.doe@company.com |
| permissionGroup | Auditor |
| permissionGroup | Functional Admin |
| permissionOrg | 102345 (org ID) |
| permissionOrg | 13245 (org ID) |
| permissionEntity | 32455556 (entity ID) |
| permissionEntity | 32455231 (entity ID) |

## CSV

### Introduction

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

#### Advantages of CSV Integration

1. **Keep and Connect Systems without APIs**
   * Not all software systems have available APIs for integration. This is often the case for older "legacy" software.
   * Integrating with these systems must be done without using APIs, meaning your best option might be file-based integration.
   * Most systems at least accept CSV via a manual import process, no matter the age of the software. Some offer the ability to automate the CSV import by pointing to an SFTP server.

2. **Non-proprietary**
   * CSV files are non-proprietary to any specific software vendor.
   * Creating and sharing a CSV is a generic way to handle data. This makes them easy to interact with and share among people and systems.
   * You can create CSVs by leveraging Excel or other spreadsheet software and most people are comfortable handling them this way.
   * Regardless of the specific software you're using, being able to import and export a CSV file is not unique to that software or brand.

3. **Easier to Create Files**
   * Since CSVs are plain-text files, it is easier for a web developer or other members of your team to create, view, and validate the data as a spreadsheet.
   * All you need is a header row at the top and subsequent rows of data. You will be able to manipulate the data to organize it as you need.
   * It is then easy to share this data across different systems.

### CSV Integration

{% hint style="info" %}
AppZen's System Integration Framework provides the ability to integrate AppZen with supported ERP systems. Using the Integration Framework makes it easy to configure, schedule, and view integration jobs and their statuses.
{% endhint %}

AppZen supports Master Data ingestion for Autonomous AP and Employee Sync using the CSV route.

{% hint style="info" %}
**Setup Instructions:**
1. Select System Integrations from the Integrations dropdown
2. Click on the Add New Integration Source and setup the Integration Source
3. Choose Appzen - SFTP as the source and provide a name
4. Go to Scheduling, and choose the integration source defined above
5. You can view the integration status on the Integrations Job Status page
{% endhint %}

### CSV - SFTP Integration for Master Data and Employee Sync

{% hint style="info" %}
The CSV - SFTP Integration type enables manual transfer of data in CSV format from your ERP system to AppZen. The data must follow the specific CSV format (template) for each record type.
{% endhint %}

The data to be ingested in the AppZen system must be as per the CSV format (template) set for a specific record type. Templates for these record types can be downloaded from the Autonomous AP Scheduling tab of the 'System Integrations' screen.

The process of syncing employees, including their organizational hierarchy, in AppZen can be facilitated wherein users can provide the list of employees in a CSV file via SFTP. The Employee details can also be uploaded through the System Admin screen.

### CSV Templates

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

### Manage Failed Records

The list of failed records that could not be ingested in the AppZen system can be downloaded from the Integration Job Status screen. This file is under the Failed Item Count column and is also in the ‘.csv’ format. Along with all the record data, it contains the reason for the failure of the record. The new file in the SFTP server post resolving the errors can be uploaded. Those records are fetched into AppZen the next time the scheduled job runs.
