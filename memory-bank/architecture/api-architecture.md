---
title: "API Architecture"
description: "Comprehensive documentation of the Longevity Coach API architecture"
created: 2025-06-02
updated: 2025-06-11
authors: 
  - name: Longevity Coach Team
    email: dev@longevitycoach.app
status: active
related: 
  - /architecture/database-architecture.md
tags: 
  - api
  - fhir
  - healthcare
  - rest
---

# API Architecture

## Table of Contents
- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Core Endpoints](#core-endpoints)
- [FHIR Resources](#fhir-resources)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Versioning](#versioning)
- [Best Practices](#best-practices)
- [Testing](#testing)

## Overview

The Longevity Coach API is built following RESTful principles and implements the FHIR R4 standard with custom extensions for longevity optimization. The API provides secure access to health data, user management, and analytics features.

### Key Features
- **FHIR R4 Compliance**: Full support for FHIR resources with custom extensions
- **OAuth 2.0 with PKCE**: Secure authentication for web and mobile clients
- **Real-time Updates**: WebSocket support for live data synchronization
- **Bulk Operations**: Efficient batch processing of resources
- **Audit Logging**: Comprehensive audit trail for all data access

## Base URL

All API endpoints are relative to the base URL:

```
https://api.longevitycoach.app/v1
```

## Authentication

### OAuth 2.0 with PKCE (Proof Key for Code Exchange)

```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code={authorization_code}&
redirect_uri={registered_redirect_uri}&
code_verifier={code_verifier}&
client_id={client_id}
```

### SMART on FHIR Scopes

| Scope | Description |
|-------|-------------|
| `patient/*.read` | Read access to all patient data |
| `patient/*.write` | Write access to patient data |
| `user/*.read` | Read user profile information |
| `launch/patient` | Contextual launch for EHR integration |
| `offline_access` | Request refresh tokens for long-lived access |

### Authentication Flow

1. **Authorization Request**
   - Client initiates OAuth flow with PKCE
   - User authenticates and grants permissions
   - Authorization code is returned

2. **Token Exchange**
   - Client exchanges code for access/refresh tokens
   - PKCE verifier validates the request
   - Tokens are issued with appropriate scopes

3. **API Access**
   - Include access token in `Authorization` header
   - Refresh tokens can be used to obtain new access tokens

## Core Endpoints

### Patients

#### Get Patient by ID

```http
GET /patients/{id}
Authorization: Bearer {access_token}
Accept: application/fhir+json
```

**Parameters**
- `id`: The logical ID of the resource

**Response**
```json
{
  "resourceType": "Patient",
  "id": "example",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2025-06-11T12:00:00Z"
  },
  "extension": [
    {
      "url": "http://longevitycoach.app/fhir/StructureDefinition/longevity-score",
      "valueDecimal": 82.5
    }
  ],
  "identifier": [
    {
      "system": "https://longevitycoach.app/patient",
      "value": "12345"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1980-01-01"
}
```

#### Search Patients

```http
GET /patients?name=smith&birthdate=gt1980-01-01
Authorization: Bearer {access_token}
```

## FHIR Resources

### Supported Resources

| Resource | Description | Operations |
|----------|-------------|------------|
| Patient | Individual receiving care | CRUD + search |
| Observation | Clinical measurements | CRUD + search |
| Condition | Health conditions | CRUD + search |
| Goal | Health goals | CRUD + search |
| Questionnaire | Assessment forms | CRUD + search |
| QuestionnaireResponse | Form responses | CRUD + search |

### Custom Extensions

1. **Longevity Score**
   - URL: `http://longevitycoach.app/fhir/StructureDefinition/longevity-score`
   - Type: `decimal`
   - Description: Calculated longevity score (0-100)

2. **Biomarker Trend**
   - URL: `http://longevitycoach.app/fhir/StructureDefinition/biomarker-trend`
   - Type: `CodeableConcept`
   - Description: Trend direction (improving, stable, declining)

## Error Handling

### Error Response Format

```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "processing",
      "details": {
        "text": "Patient not found"
      },
      "diagnostics": "The patient with ID 12345 could not be found"
    }
  ]
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|------------|------------|-------------|
| 400 | `invalid-request` | Invalid request syntax |
| 401 | `unauthorized` | Authentication required |
| 403 | `forbidden` | Insufficient permissions |
| 404 | `not-found` | Resource not found |
| 429 | `too-many-requests` | Rate limit exceeded |
| 500 | `internal-error` | Server error |

## Rate Limiting

- **Anonymous**: 60 requests/minute
- **Authenticated**: 600 requests/minute
- **Bulk Operations**: 10 requests/minute

## Versioning

API versioning follows semantic versioning (e.g., v1.0.0):

- **Major**: Breaking changes
- **Minor**: Backward-compatible features
- **Patch**: Backward-compatible bug fixes

## Best Practices

### Request Headers

```http
Accept: application/fhir+json; fhirVersion=4.0
Accept-Charset: utf-8
Prefer: return=representation
If-None-Match: W/"1"
```

### Response Headers

```http
ETag: W/"1"
Last-Modified: Wed, 11 Jun 2025 12:00:00 GMT
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 599
X-RateLimit-Reset: 1623416400
```

### Performance Considerations

1. **Filtering**
   - Use `_summary=true` for lightweight responses
   - Filter fields with `_elements=id,name,birthDate`
   - Paginate results with `_count` and `_getpagesoffset`

2. **Caching**
   - Implement ETag and Last-Modified headers
   - Cache responses when appropriate
   - Use conditional requests to reduce bandwidth

## Testing

### Test Environment
- **Base URL**: `https://api-sandbox.longevitycoach.app/v1`
- **Test Client ID**: `test-client`
- **Test User**: `testuser@longevitycoach.app`

### Test Data

```json
{
  "resourceType": "Patient",
  "name": [{"family": "Test", "given": ["User"]}],
  "birthDate": "1990-01-01",
  "gender": "unknown"
}
```

### Automated Testing

1. **Unit Tests**: Test individual API endpoints
2. **Integration Tests**: Test end-to-end flows
3. **Performance Tests**: Verify response times under load
4. **Security Tests**: Validate authentication and authorization

## Documentation Generation

API documentation is generated using [OpenAPI 3.0](https://swagger.io/specification/) and is available at:

```
https://api.longevitycoach.app/v1/api-docs
```

## Support

For API support, please contact:
- **Email**: api-support@longevitycoach.app
- **Slack**: #api-support
- **Documentation**: https://docs.longevitycoach.app/api

---
Last Updated: June 11, 2025

### Blood Tests
```http
POST /blood-tests
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "testedAt": "2025-06-02T10:00:00Z",
  "laboratoryId": "lab-123",
  "reportFile": <binary>
}
```

### Biomarkers
```http
GET /patients/{id}/biomarkers?code=6690-2&start=2025-01-01&end=2025-12-31
Authorization: Bearer {token}
Accept: application/fhir+json
```

## FHIR Resource Mappings

### Observation Resource
```json
{
  "resourceType": "Observation",
  "id": "example",
  "status": "final",
  "category": [{
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/observation-category",
      "code": "laboratory"
    }]
  }],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "6690-2",
      "display": "Leukocytes [#/volume] in Blood by Automated count"
    }]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2025-06-02T10:00:00Z",
  "valueQuantity": {
    "value": 6.3,
    "unit": "10*3/uL",
    "system": "http://unitsofmeasure.org",
    "code": "10*3/uL"
  },
  "referenceRange": [{
    "low": {
      "value": 4.5,
      "unit": "10*3/uL"
    },
    "high": {
      "value": 11.0,
      "unit": "10*3/uL"
    },
    "type": {
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/referencerange-meaning",
        "code": "normal"
      }]
    }
  }]
}
```

## Rate Limiting
- 1000 requests per 15 minutes per token
- 10000 requests per 15 minutes per IP

## Error Responses

### 400 Bad Request
```json
{
  "resourceType": "OperationOutcome",
  "issue": [{
    "severity": "error",
    "code": "invalid",
    "details": {
      "text": "Invalid date format. Expected ISO 8601 format (YYYY-MM-DD)"
    },
    "expression": ["Observation.effectiveDateTime"]
  }]
}
```

### 401 Unauthorized
```json
{
  "error": "invalid_token",
  "error_description": "The access token expired"
}
```

## Webhooks

### Events
- `blood_test.received` - New lab result received
- `blood_test.processed` - Lab result processed and available
- `biomarker.alert` - Critical biomarker value detected

### Payload Example
```json
{
  "event": "blood_test.processed",
  "data": {
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "bloodTestId": "550e8400-e29b-41d4-a716-446655440000",
    "testedAt": "2025-06-02T10:00:00Z"
  },
  "timestamp": "2025-06-02T10:05:23Z"
}
```

## Versioning
- API version in URL path (`/v1/...`)
- Media type versioning with `Accept` header
- Deprecation policy: 6 months notice for breaking changes

## Monitoring
- Request/response logging (PII redacted)
- Performance metrics (p95 latency < 200ms)
- Error tracking and alerting
