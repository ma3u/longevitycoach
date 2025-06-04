# Database Architecture

## Technology Stack
- **Primary Database**: Supabase (PostgreSQL 14+)
- **Time-series Extension**: TimescaleDB
- **Search**: PostgreSQL Full-Text Search with pg_trgm
- **Version**: PostgreSQL 14+

## Schema Design

### Core Tables

#### `patients`
- `id` UUID (Primary Key)
- `created_at` TIMESTAMPTZ
- `updated_at` TIMESTAMPTZ
- `external_id` TEXT (for HIPAA compliance)
- `demographics` JSONB
- `consents` JSONB (GDPR compliance)
- `settings` JSONB

#### `blood_tests`
- `id` UUID (Primary Key)
- `patient_id` UUID (Foreign Key)
- `tested_at` TIMESTAMPTZ
- `laboratory_id` UUID
- `report_url` TEXT
- `status` ENUM('pending', 'processed', 'analyzed')
- `metadata` JSONB

#### `biomarkers` (Timescale Hypertable)
- `id` UUID (Primary Key)
- `blood_test_id` UUID (Foreign Key)
- `patient_id` UUID (Foreign Key, Partition Key)
- `loinc_code` TEXT
- `value` NUMERIC
- `unit` TEXT
- `reference_range` JSONB
- `timestamp` TIMESTAMPTZ (Time Partitioning)
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
