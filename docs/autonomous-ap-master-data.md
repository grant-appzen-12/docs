# Master Data APIs

## Overview

Master Data APIs allow you to manage reference data such as payment terms, chart of accounts, suppliers, purchase orders, and other master data required for invoice processing.

## Payment Terms API

The Payment Terms API allows you to create, retrieve, and manage payment term configurations for your vendors.

### Get Payment Terms

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/payment-terms
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/payment-terms" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key"
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Successfully retrieved payment terms",
  "data": [
    {
      "id": "PT001",
      "name": "Net 30",
      "description": "Payment due within 30 days",
      "days": 30,
      "discount_percentage": 0,
      "discount_days": 0
    },
    {
      "id": "PT002",
      "name": "2/10 Net 30",
      "description": "2% discount if paid within 10 days, otherwise due in 30 days",
      "days": 30,
      "discount_percentage": 2,
      "discount_days": 10
    }
  ]
}
```

## Chart of Accounts API

The Chart of Accounts API allows you to manage GL accounts and cost centers for invoice coding.

### Get Chart of Accounts

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/chart-of-accounts
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Query Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| page | Integer | Page number for pagination | No |
| size | Integer | Number of items per page | No |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/chart-of-accounts?page=1&size=10" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key"
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Successfully retrieved chart of accounts",
  "data": {
    "items": [
      {
        "id": "6505",
        "name": "Office Supplies",
        "description": "Expenses for office supplies",
        "account_type": "Expense",
        "active": true
      },
      {
        "id": "6510",
        "name": "Office Equipment",
        "description": "Expenses for office equipment",
        "account_type": "Expense",
        "active": true
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 48,
      "items_per_page": 10
    }
  }
}
```

## Suppliers API

The Suppliers API allows you to manage vendor information for invoice processing.

### Get Suppliers

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/suppliers
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Query Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| name | String | Filter by supplier name | No |
| tax_id | String | Filter by tax ID | No |
| page | Integer | Page number for pagination | No |
| size | Integer | Number of items per page | No |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/suppliers?name=Acme&page=1&size=10" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key"
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Successfully retrieved suppliers",
  "data": {
    "items": [
      {
        "id": "S001",
        "name": "Acme Office Supplies",
        "tax_id": "123456789",
        "address": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "postal_code": "12345",
          "country": "US"
        },
        "payment_terms": "Net 30",
        "status": "active"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_items": 25,
      "items_per_page": 10
    }
  }
}
```

### Create Supplier

**Request URI**
```
POST https://api.appzen.com/dictionary-data-services/suppliers
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |
| Content-Type | String | application/json | Yes |

**Request Body Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| name | String | Supplier name | Yes |
| tax_id | String | Tax identification number | Yes |
| address | Object | Address information | Yes |
| payment_terms | String | Payment terms ID | No |
| status | String | Supplier status (active/inactive) | No |

**Sample Request**

```bash
curl -X POST "https://api.appzen.com/dictionary-data-services/suppliers" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Supplier Inc",
    "tax_id": "555666777",
    "address": {
      "street": "789 Vendor Lane",
      "city": "Suppliertown",
      "state": "NY",
      "postal_code": "10001",
      "country": "US"
    },
    "payment_terms": "PT001",
    "status": "active"
  }'
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Supplier successfully created",
  "data": {
    "id": "S123",
    "name": "New Supplier Inc",
    "tax_id": "555666777",
    "address": {
      "street": "789 Vendor Lane",
      "city": "Suppliertown",
      "state": "NY",
      "postal_code": "10001",
      "country": "US"
    },
    "payment_terms": "PT001",
    "status": "active",
    "created_at": "2023-05-01T14:30:00Z"
  }
}
```

## Purchase Orders API

The Purchase Orders API allows you to manage purchase orders for invoice matching.

### Get Purchase Orders

**Request URI**
```
GET https://api.appzen.com/dictionary-data-services/purchase-orders
```

**Header Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| customer-id | String | The unique customer ID assigned by AppZen | Yes |
| x-api-key | String | The API key provided by AppZen | Yes |
| customer-key | String | The customer key provided by AppZen | Yes |

**Query Parameters**

| Name | Type | Description | Required |
| --- | --- | --- | --- |
| po_number | String | Filter by PO number | No |
| supplier_id | String | Filter by supplier ID | No |
| status | String | Filter by status (open/closed) | No |
| page | Integer | Page number for pagination | No |
| size | Integer | Number of items per page | No |

**Sample Request**

```bash
curl -X GET "https://api.appzen.com/dictionary-data-services/purchase-orders?supplier_id=S001&status=open" \
  -H "customer-id: your_customer_id" \
  -H "x-api-key: your_api_key" \
  -H "customer-key: your_customer_key"
```

**Sample Response**

```json
{
  "status": "success",
  "message": "Successfully retrieved purchase orders",
  "data": {
    "items": [
      {
        "po_number": "PO-2023-0456",
        "supplier_id": "S001",
        "issue_date": "2023-04-01",
        "total_amount": 2500.00,
        "currency": "USD",
        "status": "open",
        "lines": [
          {
            "line_number": 1,
            "description": "Office Desk - Standard",
            "quantity": 5,
            "unit_price": 450.00,
            "total": 2250.00,
            "unit_of_measure": "EA",
            "gl_code": "6510"
          },
          {
            "line_number": 2,
            "description": "Shipping",
            "quantity": 1,
            "unit_price": 250.00,
            "total": 250.00,
            "unit_of_measure": "EA",
            "gl_code": "6530"
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 1,
      "items_per_page": 10
    }
  }
}
```

## CSV Integration for Master Data

For bulk loading of master data, you can also use CSV files uploaded via SFTP. See the [CSV](csv.md) section for file format specifications.

{% hint style="info" %}
When using the API to manage master data, changes are applied in real-time. However, when using CSV imports, there may be a short processing delay before the data becomes available.
{% endhint %}
