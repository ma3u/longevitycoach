# Windsurf Planning Rules

## Overview

These rules govern how planning capabilities are integrated with Windsurf to ensure consistent context management and prevent context loss.

## Core Rules

### 1. Context Management

- @context_refresh_frequency = 4h - Update context every 4 hours
- @max_active_context_items = 10 - Maximum active items per planning cycle
- @context_retention_period = 90d - Retain context for 90 days
- @auto_archive_after = 30d - Archive inactive items after 30 days

### 2. Planning Cycles

- @strategic_planning = quarterly - Align with business objectives
- @release_planning = monthly - Coordinate feature releases
- @sprint_planning = bi-weekly - Manage development iterations
- @daily_planning = 1d - Track daily progress and blockers

### 3. Update Constraints

- @min_review_cycle = 24h - Minimum time for review cycles
- @max_planning_horizon = 90d - Maximum planning window
- @max_concurrent_initiatives = 5 - Limit work in progress

## Integration Rules

### 1. Memory Bank Integration

- @sync_with_memory_bank = true - Enable memory bank synchronization
- @auto_document_decisions = true - Automatically log planning decisions
- @track_context_changes = true - Monitor context evolution

### 2. Automation Rules

- @auto_reminders = true - Enable planning reminders
- @auto_context_updates = true - Automatic context updates
- @scheduled_cleanup = weekly - Regular cleanup of old context

### 3. Monitoring Rules

- @track_planning_accuracy = true - Monitor planning effectiveness
- @alert_on_context_gaps = true - Notify on potential context loss
- @report_metrics = true - Generate planning metrics

## GitHub API GraphQL CLI Integration

### 1. Querying Project Data

```bash
# Get project ID and fields
graphql -f query='
  query {
    organization(login: "longevitycoach") {
      projectV2(number: 1) {
        id
        fields(first: 20) {
          nodes {
            ... on ProjectV2Field {
              id
              name
            }
            ... on ProjectV2SingleSelectField {
              id
              name
              options {
                id
                name
              }
            }
          }
        }
      }
    }
  }'

# Get project items
graphql -f query='
  query {
    organization(login: "longevitycoach") {
      projectV2(number: 1) {
        items(first: 20) {
          nodes {
            id
            content {
              ... on Issue {
                number
                title
              }
            }
          }
        }
      }
    }
  }'
```

### 2. Updating Project Fields

```bash
# Update a field value (e.g., Size, Status)
graphql -f query='
  mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: "PVT_..."
        itemId: "PVTI_..."
        fieldId: "PVTSSF_..."
        value: { 
          singleSelectOptionId: "..."
        }
      }
    ) {
      projectV2Item {
        id
      }
    }
  }'
```

## Implementation Guidelines

### 1. Context Updates
1. Update context at least every 4 hours
2. Include relevant code, decisions, and discussions
3. Link to related artifacts
4. Tag with appropriate categories

### 2. Planning Sessions
1. Start with context review
2. Document all decisions
3. Update relevant artifacts
4. Set next review date

### 3. Quality Checks
1. Verify context completeness
2. Check for outdated information
3. Validate cross-references
4. Ensure proper categorization

## Best Practices

### 1. For Developers
- Update context with each commit
- Link code to planning artifacts
- Document assumptions and decisions

### 2. For Planners
- Review context before planning
- Update plans based on new information
- Communicate changes to the team

### 3. For Reviewers
- Verify context accuracy
- Check for missing information
- Ensure proper documentation

## Compliance

### 1. Monitoring
- Track planning metrics
- Monitor context quality
- Report on compliance

### 2. Improvements
- Regular process reviews
- Update rules as needed
- Incorporate team feedback

## Version Control

### 1. Changes
- Document all rule changes
- Include rationale
- Update affected artifacts

### 2. History
- Maintain change log
- Track versions
- Archive old versions
