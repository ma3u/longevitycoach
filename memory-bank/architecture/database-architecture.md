---
title: "Database Architecture"
description: "Comprehensive documentation of the Longevity Coach database architecture"
created: 2025-06-02
updated: 2025-06-11
authors: 
  - name: Longevity Coach Team
    email: dev@longevitycoach.app
status: active
related: 
  - /architecture/api-architecture.md
tags: 
  - database
  - postgresql
  - timescaledb
  - architecture
---

# Database Architecture

## Table of Contents
- [Technology Stack](#technology-stack)
- [Schema Design](#schema-design)
- [Performance Considerations](#performance-considerations)
- [Backup & Recovery](#backup--recovery)
- [Security](#security)
- [Monitoring](#monitoring)
- [Migrations](#migrations)
- [Best Practices](#best-practices)

## Technology Stack

### Primary Database
- **Database**: PostgreSQL 14+ (via Supabase)
- **Purpose**: Transactional and analytical workloads
- **Extensions**:
  - `timescaledb`: Time-series data handling
  - `pg_trgm`: Advanced text search
  - `pgcrypto`: Encryption functions
  - `uuid-ossp`: UUID generation
  - `postgis`: Geospatial data support

### Time-series Data
- **Extension**: TimescaleDB
- **Partitioning**: Time-based and patient-based partitioning
- **Retention Policy**: 10 years for patient data, configurable per data type

### Search Capabilities
- PostgreSQL Full-Text Search with `pg_trgm`
- Vector similarity search for recommendations
- Custom ranking functions for relevance

## Schema Design

### Core Tables

#### `patients`
Stores patient demographic and consent information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| external_id | TEXT | External reference ID (HIPAA compliant) |
| demographics | JSONB | Patient demographics (name, DOB, etc.) |
| consents | JSONB | Consent management (GDPR compliance) |
| settings | JSONB | User preferences and settings |

**Indexes**:
- Primary key on `id`
- Unique index on `external_id`
- GIN index on `demographics`

#### `blood_tests`
Tracks blood test orders and results.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| patient_id | UUID | Reference to patients.id |
| tested_at | TIMESTAMPTZ | When the test was performed |
| laboratory_id | UUID | Reference to laboratories table |
| report_url | TEXT | Link to full report |
| status | ENUM | Test status (pending/processed/analyzed) |
| metadata | JSONB | Additional test metadata |

**Indexes**:
- Primary key on `id`
- Foreign key index on `patient_id`
| Index on `tested_at` for time-based queries |
| GIN index on `metadata` |

#### `biomarkers` (Timescale Hypertable)
Stores time-series biomarker data with efficient time-based queries.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| blood_test_id | UUID | Reference to blood_tests.id |
| patient_id | UUID | Reference to patients.id (Partition Key) |
| loinc_code | TEXT | LOINC code for the biomarker |
| value | NUMERIC | Measured value |
| unit | TEXT | Measurement unit |
| reference_range | JSONB | Normal range values |
| timestamp | TIMESTAMPTZ | Time of measurement (Time Partitioning) |

**Indexes**:
- Primary key on `id`
| Composite index on `(patient_id, loinc_code, timestamp DESC)` |
| Time-based index on `timestamp` |
| Foreign key indexes on `patient_id` and `blood_test_id` |

### Supporting Tables

#### `laboratories`
Information about testing laboratories.

#### `reference_ranges`
Standard reference ranges for biomarkers.

#### `audit_logs`
Audit trail for all data modifications.

## Performance Considerations

### Indexing Strategy
- **B-tree** for equality and range queries
- **GIN** for JSONB columns and full-text search
- **BRIN** for large time-series data
- **Partial indexes** for filtered queries

### Query Optimization
- Materialized views for common aggregations
- Query plan analysis for slow queries
- Connection pooling for better resource utilization

### Partitioning
- Time-based partitioning for time-series data
- List partitioning by patient_id for data isolation
- Automated partition management with retention policies

## Backup & Recovery

### Backup Strategy
- **Daily full backups** with PITR (Point-in-Time Recovery)
- **WAL archiving** for continuous backup
- **Off-site storage** with encryption

### Recovery Objectives
- **RPO (Recovery Point Objective)**: 5 minutes
- **RTO (Recovery Time Objective)**: 15 minutes

## Security

### Data Encryption
- **At rest**: AES-256 encryption
- **In transit**: TLS 1.3
- **Field-level encryption** for sensitive data

### Access Control
- Row-level security (RLS) policies
- Role-based access control (RBAC)
- Principle of least privilege

### Audit Trail
- All data modifications logged
- Sensitive operations require MFA
- Regular security reviews

## Monitoring

### Metrics Collection
- Query performance
- Resource utilization
- Replication lag

### Alerting
- Performance degradation
- Failed queries
- Security events

## Migrations

### Version Control
- All schema changes in migration files
- Backward compatibility maintained
- Zero-downtime deployments

### Tools
- Flyway for migration management
- Schema diff tools for review
- Automated testing of migrations

## Best Practices

### Naming Conventions
- snake_case for tables and columns
- Prefixes for related tables (e.g., `auth_users`)
- Consistent naming across foreign keys

### Data Types
- Appropriate data types for all columns
- Domain types for validation
- Enums for fixed value sets

### Documentation
- Column-level comments
- Schema documentation in source control
- Data dictionary

## Related Documents
- [API Architecture](../api-architecture.md)
- [Deployment Guide](../../deployment/guide.md)
- [Security Policy](../../security/policy.md)

---
Last Updated: June 11, 2025
- `tags` TEXT[]

### Performance Optimizations

#### Indexing Strategy
```sql
-- Time-series optimization
CREATE INDEX idx_biomarkers_patient_time ON biomarkers(patient_id, timestamp DESC);

-- Common query patterns
CREATE INDEX idx_biomarkers_loinc ON biomarkers(loinc_code) INCLUDE (value, timestamp);
CREATE INDEX idx_biomarkers_patient_loinc ON biomarkers(patient_id, loinc_code, timestamp DESC);

-- Full-text search
CREATE INDEX idx_patients_search ON patients USING GIN(
    to_tsvector('english', 
        COALESCE(demographics->>'firstName', '') || ' ' ||
        COALESCE(demographics->>'lastName', '') || ' ' ||
        COALESCE(demographics->>'email', '')
    )
);
```

#### Partitioning
```sql
-- Convert to hypertable for time-series data
SELECT create_hypertable(
    'biomarkers',
    'timestamp',
    partitioning_column => 'patient_id',
    number_partitions => 16,
    chunk_time_interval => INTERVAL '1 month',
    if_not_exists => TRUE
);
```

## Security Implementation

### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE biomarkers ENABLE ROW LEVEL SECURITY;

-- Patient data access policies
CREATE POLICY patient_own_data ON patients
    FOR ALL
    USING (auth.uid() = id);

CREATE POLICY patient_own_blood_tests ON blood_tests
    FOR ALL
    USING (EXISTS (
        SELECT 1 FROM patients 
        WHERE patients.id = blood_tests.patient_id 
        AND auth.uid() = patients.id
    ));
```

### Data Retention
```sql
-- Automated data retention policies
SELECT add_retention_policy('biomarkers', INTERVAL '10 years');

-- Compression for older data
ALTER TABLE biomarkers SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'patient_id, loinc_code'
);

-- Compress data older than 30 days
SELECT add_compression_policy('biomarkers', INTERVAL '30 days');
```

## Backup Strategy

### Continuous Archiving
```yaml
# postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'wal-g wal-push %p'
archive_timeout = 3600
```

### Point-in-Time Recovery
```bash
# Base backup
wal-g backup-push $PGDATA

# Restore command
wal-g backup-fetch $PGDATA LATEST
```

## Monitoring

### Key Metrics
- Query performance
- Replication lag
- Cache hit ratio
- Dead tuples
- Locks

### Alert Thresholds
- CPU > 80% for 5 minutes
- Replication lag > 5s
- Cache hit ratio < 90%
- Dead tuples > 1000/vacuum threshold
