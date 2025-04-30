# __Token Generation__

To generate an access token to AppZen's API gateway for authentication and validation you need to use this token to access AppZen resources. The token is valid for 60 minutes and AppZen allows the regeneration of the token.

In case of expiration:

1. You need to refresh the token to regain access.
2. The scope gained will be the same as the original grant

## Request URI 

POST  https://api.appzen.com/api/v3/oauth2/token

## Body Parameters

__Name__

__Type__

__Description__

__Required__

client\_id

String

The unique client Id assigned.

Yes

client\_secret

String

The unique password assigned.

Yes

scope

String

The scope assigned. 

The scope can be:

expense.report.read expense.report.write

Yes

## Sample Request



curl \-L \-X POST 'https://api.appzen.com/enft/api/v3/oauth2/token' \\

\-H 'Content\-Type: application/x\-www\-form\-urlencoded' \\

\-\-data\-urlencode 'client\_id=0oa6xxxx' \\

\-\-data\-urlencode 'client\_secret=wfiWxxxx' \\

\-\-data\-urlencode 'scope=expense.report.read expense.report.write'

## Sample Response

Success



\{

    "token\_type": "Bearer",

    "expires\_in": 3600,

    "access\_token": "eyJrxxxx",

    "scope": "expense.report.read expense.report.write"

\}

Failure

The request fails if you do not provide the scope.



\{

    "msg": "Internal Server Error: 400 Bad Request: \\"\{\\"error\\":\\"invalid\_scope\\",\\"error\_description\\":\\"The authorization server resource does not have any configured default scopes, 'scope' must be provided.\\"\}\\"",

    "httpStatus": "INTERNAL\_SERVER\_ERROR",

    "statusCode": 500

\}



