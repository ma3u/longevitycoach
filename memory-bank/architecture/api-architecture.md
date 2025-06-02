# API Architecture

## Overview
RESTful API design following FHIR R4 standards with healthcare-specific extensions for longevity optimization.

## Base URL
```
https://api.longevitycoach.app/v1
```

## Authentication

### OAuth 2.0 with PKCE
```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=...&
redirect_uri=...&
code_verifier=...&
client_id=...
```

### SMART on FHIR Scopes
- `patient/*.read` - Read access to patient data
- `patient/*.write` - Write access to patient data
- `user/*.read` - Read user profile
- `launch/patient` - Contextual launch

## Core Endpoints

### Patients
```http
GET /patients/{id}
Authorization: Bearer {token}
Accept: application/fhir+json
```

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
