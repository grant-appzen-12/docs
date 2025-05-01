# Token Generation

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

```json
{
    "msg": "Internal Server Error: 400 Bad Request: \"{\"error\":\"invalid_scope\",\"error_description\":\"The authorization server resource does not have any configured default scopes, 'scope' must be provided.\"}\"",
    "httpStatus": "INTERNAL_SERVER_ERROR",
    "statusCode": 500
}
