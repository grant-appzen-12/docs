# __Authentication __

This section explains the authentication available in both EA and AAP.

## Authentication in EA

AppZen’s external APIs support API key\-based authentication \(OAuth1.0\). To provide additional security, AppZen supports OAuth 2.0. 

## OAuth 1.0 Authentication

OAuth \("Open Authorization"\) provides clients with "secure delegated access" to server resources.

In this case, AppZen uses an API key mechanism to validate calls to the API \(OAuth 1.0\). It also uses the customer\_id and API key combination to allow access to the public APIs.

Authentication for these APIs is done based on the following fields the AppZen Support team provides.

1. customer\_id: You will be provided with a unique value for this field.
2. x\-api\-key: You will be provided with a unique value for this field. The exact value is used by all the customers belonging to a particular integration.
3. Customer\-key: You will be provided with unique value in this field.

## OAuth 2.0 Authentication

For Expense Audit external APIs, the authentication type we used until now was API key\-based authentication. Now, we have extended our support to OAuth 2.0 Authentication to access these below\-mentioned APIs:

- Ingestion API
- Expense Audit Results API
- Audit Action API

OAuth 2.0 is the industry standard authentication process. We are upgrading to OAuth 2.0 as it adds an additional layer of security, it is time limited, and the OAuth2.0 token includes specific API in scope instead of all.

In this case, all requests to AppZen APIs are authenticated using OAuth 2.0 access token.

## OAuth2.0 Self\-serve

The Self\-service credential generation now supports OAuth 2.0 for AppZen products. The introduction of OAuth 2.0 is for users opting for direct API based integration for their deployments, and for existing users with API Key based authorization. A new UI will be visible under the integration dropdown with the name ‘API Credentials’ from where API credentials can be generated without raising a support ticket. Currently, AppZen enables users with a System Admin Role to generate and regenerate these credentials.

## Request for OAuth 2.0 token  
You need to generate an access token to AppZen's API gateway for authentication and validation. For this, refer to Token Generation  

You need to send subsequent requests with the Authorization HTTP header value as Bearer <oauth2\-access\-token>.

API credentials are unique to each customer and must be configured before making API calls. AppZen's external APIs support API key\-based authentication \(OAuth1.0\). For additional security, AppZen also supports OAuth 2.0.

AppZen has a self\-serve feature for OAuth 2.0 authentication, where users can set up the OAuth 2.0 with AppZen.

## FAQs on OAuth 2.0

What is OAuth 2.0 and how does it work?

The OAuth 2.0 authorization framework is a protocol that allows a user to grant a third\-party website or application access to the user's protected resources without necessarily revealing their long\-term credentials or even their identity. AppZen thereby uses advanced authentication methods when users interact with its systems.

Why is OAuth 2.0 secure?

OAuth 2.0 is a secure, open data\-sharing standard that should be built into every app. This authentication and authorization standard protects user data by providing access to the data without revealing the user's identity or credentials.

What is OAuth 2.0 in REST API?

AppZen's API is built around REST. In OAuth 2.0, the following three parties are involved:

- The user possesses data accessed through the API and wants to allow the application to access it.
- The application is to access the data through the API on the user's behalf.
- The API controls and enables access to the user's data.

Now, let us configure the steps to enable self\-serve UI in the AppZen system. Navigate to the left menu and select Integration > API Credentials.  
  
In this section, understand how to configure OAuth 2.0 through a self\-service portal. The feature is currently only supported for Expense Audits, and future releases will also include Autonomous AP.  


NOTE: OAuth 2.0 is for new customers who opt for API\-based integration.

Even for existing customers who use API key\-based authentication, it is available.

Since OAuth 2.0 is an industry\-standard protocol for authentication, AppZen ensures all across availability.

 

As the API Credentials page opens, it displays a list of all the existing credentials set.

Image: API Credentials page view.

Select \+ Add New Credentials. The Add New Credentials page opens. Here, the admin needs to fill out the required details. Follow the steps mentioned below.

Image: The Add New Credential page opens.

1. Enter the Connection Name.  
It should be unique/not configured previously.
2. View the Authorization Type:  
This is pre\-filled as OAuth 2.0.
3. Select from the two options under Scope: Choose either expense.report.read and/or expense. report. write
4. Grant Type will populate Client Credentials by default.
5. Select ‘Generate’ to generate the following credentials.
	- Base URL: This is generated based on the customer environment type.
	- Client ID: This gets generated automatically.
	- Client Secret: This gets generated automatically. The Client Secret disappears once the user moves away from the panel. Click on Regenerate to get the client's secret ID.
6. For Testing, select Copy as cURL. The URL, ClientID, and selected scopes are included.  
Import this URL request to testing platforms like Postman, and paste the saved client secret to get a response token.

NOTE:

-  The bearer token expires in 60 minutes, and you need to refresh to regain access, and the scope is limited to the original grant.
-  Currently, the generation of API credentials directly from the UI is available for Expense Audit only.

## Authentication in AP

AppZen’s external APIs support API key\-based authentication \(OAuth1.0\).

OAuth \("Open Authorization"\) provides clients a "secure delegated access" to server resources. It uses the customer\_id and API key combination to allow access to the public APIs.

Authentication for these APIs is done based on the following fields provided by the AppZen Support team:

1. customer\_id: You will be provided with a unique value for this field.
2. x\-api\-key: You will be provided with a unique value for this field. 
3. customer\-key: You will be provided with a unique value for this field.

