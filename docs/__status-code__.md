# Status Code

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
