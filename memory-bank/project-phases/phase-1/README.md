---
title: "Readme"
description: "Project-phases > Phase-1 documentation"
created: 2025-06-02
updated: 2025-06-02
authors: 
status: draft
related: []
tags: 
---

# Phase 1: MVP Frontend Development with MCP Server Architecture

## Timeline: Weeks 1-4

## Objective
Create a modern TypeScript React frontend with five specialized MCP agents for comprehensive health guidance.

## Core Components

### Technology Stack
- **Framework**: React 18+ with TypeScript and Next.js 14
- **Build System**: Vite for development, Next.js for production
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **State Management**: Zustand
- **Hosting**: Vercel with GitHub CI/CD

### MCP Agents
1. **Blood Analysis Agent** (Port 8001)
   - Strunz/Osterhaus optimal biomarker range analysis
   - Time-series trend visualization
   - Anomaly detection

2. **Nutrition Agent** (Port 8002)
   - Personalized meal planning
   - Macronutrient optimization
   - Food-nutrient interaction analysis

3. **Movement Agent** (Port 8003)
   - Böckel joint mobility assessments
   - Exercise prescription
   - Movement pattern analysis

4. **Stress Management Agent** (Port 8004)
   - Breathing protocols
   - Nervous system optimization
   - Stress response tracking

5. **Supplement Agent** (Port 8005)
   - Strunz-based recommendations
   - Bioavailability optimization
   - Interaction checking

## Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Docker (for local MCP agents)

### Installation
```bash
# Clone repository
git clone [repository-url]
cd longevitycoach

# Install dependencies
npm install

# Start development servers
npm run dev:all  # Starts all MCP agents and frontend
```

### Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MCP_BLOOD_ANALYSIS_URL=http://localhost:8001
MCP_NUTRITION_URL=http://localhost:8002
MCP_MOVEMENT_URL=http://localhost:8003
MCP_STRESS_URL=http://localhost:8004
MCP_SUPPLEMENT_URL=http://localhost:8005
```

## Testing
Run the test suite:
```bash
npm test
```

## Deployment
Merging to main branch triggers Vercel deployment.

## Success Criteria
- [ ] All five MCP agents operational
- [ ] Basic frontend interface connected to all agents
- [ ] Authentication flow implemented
- [ ] Basic health data visualization
- [ ] CI/CD pipeline established
