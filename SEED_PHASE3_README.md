# Phase 3 Database Seeding - Colleges & Scholarships

This document provides instructions for seeding the Phase 3 data which includes **Colleges** and **Scholarships** into the database.

## Overview

The `seed-phase3.ts` script populates the database with:

- **55+ Colleges** across various categories
- **20+ Scholarships** with eligibility and amount details

### College Categories

| Category | Examples |
|----------|----------|
| Engineering & Tech | IIT Bombay, IIT Delhi, BITS Pilani, NIT Trichy |
| Healthcare & Medicine | AIIMS Delhi, CMC Vellore, JIPMER |
| Business & Management | IIM Indore (IPM), SRCC, NMIMS Mumbai |
| Defense & Govt | NDA Pune, IMA Dehradun, Air Force Academy |
| Law & Governance | NLSIU Bangalore, NALSAR Hyderabad, NLU Delhi |
| Aviation & Transport | IGRUA, NFTI, Indian Aviation Academy |
| Design & Arts | NID Ahmedabad, NIFT Delhi, IDC IIT Bombay |
| Science & Research | IISc Bangalore, IISER Pune, BHU |
| Agriculture | IARI, PAU Ludhiana, GB Pant University |
| Vocational & Others | IHM Pusa, IHM Mumbai, WGSHA Manipal |
| Education | RIE Mysore, DU (CIE) |
| Railways | Gati Shakti University, IRIMEE |

### Scholarship Providers

- Government: INSPIRE, KVPY, PMSSS, Central Sector Scheme
- PSUs: ONGC, NTPC, Indian Oil, LIC
- Private: Tata Trust, Aditya Birla, Reliance Foundation, HDFC

---

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** packages installed:
   ```bash
   npm install
   ```
3. **Base database seeded** (run `npm run seed` first if not already done)

---

## Seeding Instructions

### Option 1: Using npm script (Recommended)

```bash
npm run seed:phase3
```

### Option 2: Direct execution with ts-node

```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" lib/seed-phase3.ts
```

### Option 3: Run from project root

```powershell
# PowerShell
ts-node --compiler-options '{\"module\":\"CommonJS\"}' lib/seed-phase3.ts
```

---

## Expected Output

```
🌱 Seeding Phase 3 data (Colleges & Scholarships)...
✅ Seeded 55 colleges and 20 scholarships
```

---

## Database Schema

### Colleges Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique identifier |
| name | TEXT | College name |
| location | TEXT | City/Location |
| rating | REAL | Rating (0-5) |
| fees_range | TEXT | Annual fees range |
| placement_avg | TEXT | Average placement package |
| website | TEXT | Official website URL |
| image | TEXT | Image path |
| career_category | TEXT | Associated career category |
| admission_process | TEXT | Admission requirements |

### Scholarships Table

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique identifier |
| name | TEXT | Scholarship name |
| provider | TEXT | Organization providing the scholarship |
| amount | TEXT | Scholarship amount |
| eligibility | TEXT | Eligibility criteria |
| deadline | TEXT | Application deadline |
| category | TEXT | Target category |

---

## Troubleshooting

### Error: "Cannot find module './db'"

Ensure you're running the command from the project root directory:
```bash
cd c:\Users\prana\Videos\career-finder
npm run seed:phase3
```

### Error: "ts-node is not recognized"

Install ts-node globally or use npx:
```bash
npm install -g ts-node
# or
npx ts-node ...
```

### Error: Module/Syntax errors

Make sure to include the compiler options:
```bash
npm run seed:phase3
```

The npm script already includes the required `--compiler-options` flag.

---

## Complete Seeding Workflow

To seed all data from scratch:

```bash
# 1. Install dependencies
npm install

# 2. Seed base data (careers, quiz questions)
npm run seed

# 3. Seed Phase 3 data (colleges, scholarships)
npm run seed:phase3

# 4. (Optional) Seed roadmaps
npm run seed:roadmaps
```

---

## Verification

After seeding, you can verify the data by:

1. **Check database directly** using the check-db script
2. **Start the dev server** and visit `/colleges` or `/scholarships`:
   ```bash
   npm run dev
   ```

---

## Data Customization

To add more colleges or scholarships, edit the arrays in `lib/seed-phase3.ts`:

```typescript
const colleges: Partial<College>[] = [
  // Add new college here
  { 
    name: 'Your College', 
    location: 'City', 
    rating: 4.5, 
    fees_range: '₹X.XL', 
    placement_avg: '₹X LPA', 
    career_category: 'Category',
    admission_process: 'Process',
    website: 'https://...',
    image: '/path.webp'
  },
  // ... existing colleges
]
```

Then re-run:
```bash
npm run seed:phase3
```
