# Career Path Finder - Folder Structure

```
career-finder/
├── app/
│   ├── globals.css              # Global styles, dark theme, glassmorphism effects
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main page with filtering logic and career grid
│
├── components/
│   ├── ui/                      # Shadcn/UI components
│   │   ├── accordion.tsx        # Accordion component for collapsible sections
│   │   ├── badge.tsx            # Badge component for tags
│   │   ├── button.tsx           # Button component with variants
│   │   ├── card.tsx             # Card component
│   │   ├── checkbox.tsx         # Checkbox component
│   │   ├── dialog.tsx           # Modal/Dialog component
│   │   ├── input.tsx            # Input component
│   │   └── slider.tsx           # Range slider component
│   │
│   ├── CareerCard.tsx           # Interactive career card with animations
│   ├── CareerDetail.tsx         # Detailed career modal with roadmap
│   ├── Filters.tsx              # Advanced filtering sidebar
│   ├── Hero.tsx                 # Hero section with search and particles
│   └── Timeline.tsx             # Career roadmap visualization
│
├── data/
│   └── careers.json             # Sample career data (CSV/JSON format)
│
├── lib/
│   └── utils.ts                 # Utility functions (cn, formatCurrency)
│
├── types/
│   └── career.ts                # TypeScript type definitions
│
├── .gitignore                   # Git ignore file
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Key Components

### Main Components

1. **Hero.tsx** - Hero section with:
   - Large centered typography "Discover Your Future"
   - Animated particle background
   - Quick search input field

2. **CareerCard.tsx** - Interactive career cards with:
   - Framer Motion hover animations
   - Glow effects
   - Stream badges (color-coded)
   - "View Roadmap" button on hover

3. **Filters.tsx** - Advanced filtering with:
   - Multi-select stream filters (Science, Commerce, Arts)
   - Range slider for minimum salary
   - Remote-friendly toggle
   - Responsive mobile/desktop layout

4. **Timeline.tsx** - Visual roadmap showing:
   - Entry → Mid → Senior progression
   - Vertical timeline with connecting lines
   - Salary information for each level
   - Animated appearance

5. **CareerDetail.tsx** - Detailed career view with:
   - Stats grid (salaries, age limits, criteria)
   - Roadmap timeline visualization
   - Accordions for colleges and exams
   - Skills display

### UI Components (Shadcn/UI Style)

All UI components are built using Radix UI primitives and follow Shadcn/UI patterns:
- Accessible
- Customizable via Tailwind
- Dark mode optimized
- Fully typed with TypeScript

## Data Flow

1. **Data Source**: `data/careers.json` contains all career information
2. **Type Safety**: `types/career.ts` defines TypeScript interfaces
3. **Filtering**: `app/page.tsx` handles all filter logic
4. **Display**: Components receive filtered data and render accordingly

## Styling

- **Theme**: Dark mode by default
- **Effects**: Glassmorphism with backdrop-blur
- **Animations**: Framer Motion for smooth transitions
- **Colors**: Cyberpunk/futuristic gradient palette
- **Typography**: Inter font (via Next.js)
