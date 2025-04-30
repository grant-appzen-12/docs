# __SSO__

## Introduction

1. Only users marked as 'External' in the User module in System Admin will be able to log in using SSO.
2. Claims\-based authorization allows roles and organization access to be assigned to users using your IDP.
3. On enabling Claims Based Authorization, role/org access will no longer be allowed in Appzen.
	- In case of issues, try the following debugging steps.
	- Users are not able to see the certain feature as per their role \- this could be due to the user not signing out of IDP. Ask the user to log in from an incognito window.
4. Click on 'Download Authorization Strings' to view the roles, organization \(Expense Audit\), and entities \(Autonomous AP\) expected by Appzen.
5. View documentation to preview sample assertion schema.

## Configuration

1. Appzen only supports SP\-based SSO.
2. To enable SSO, upload a metadata file from your IDP in Appzen.
	1. The file must have a .XML extension.
	2. The following information must be present in the file:
		1. IDP Issuer URI \- can be found against the attribute entityID= in the meta\-data file
		2. IDP Single Sign\-on URL \- can be found against the Location= in the following tag: SingleSignOnService  
Binding="urn:oasis:names:tc:SAML:2.0:bindings: HTTP\-Redirect" Location="
		3. IDP Signature certificate: the certificate can be found in the metadata file from the following tag:ds: X509Certificate
3. Appzen will generate the following once the metadata file is uploaded.
	1. Assertion consumer service \(ACS\) URL
	2. Audience URI
	3. Metadata file
4. Download the metadata file or use the URL/URI and configure it in your IDP.

## Testing

Once uploaded, test by clicking on 'Login with SSO' on this link using a user ID/email address to ensure SSO works.

## Debugging

1. In case of issues, try the following debugging steps.

A. If you are not able to access the Production Environment.

i. Check if you are able to open the AppZen page.

ii. If you are unable to open this page from within your VPN or network, check if you can access the page outside the VPN/network or from your mobile browser.

iii. If you are able to access it outside the VPN/network but not from within, it means their internal IT team may be blocking the site. Reach out to your internal IT team and check if the AppZen site is being blocked.

B. If you are unable to login

i. If you are able to open the page from within the network and are unable to log in, follow the steps given below \(Perform below steps in an incognito/private window \(Firefox, Chrome, Edge\).

a. If you do not get redirected to your IDP \- check the network tab for any failing APIs. If there is any API failing with a 401 or 400, right\-click on the failing API and copy it as Curl. Share logs with Appzen support.

b. If login fails with 400 OKTA Page \- Share the SAML tracer logs with Appzen support.

C. If you are getting an OKTA 400 error, please ensure that the IDP URL is added correctly. It must be the same as that provided in the metadata file.

D. If issues persist, contact support@appzen.com.

## Sample Assertion Data

Attribute Name

Attribute Value

firstName

John

lastName

Doe

email

john.doe@company.com

permissionGroup

Auditor

permissionGroup

Functional Admin

permissionOrg

102345 \(org ID\)

permissionOrg

13245 \(org ID\)

permissionEntity

32455556 \(entity ID\)

permissionEntity

32455231 \(entity ID\)

 

