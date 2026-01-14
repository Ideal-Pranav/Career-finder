# Career Path Finder

A premium, modern career exploration platform with **50+ careers** across 12 categories, advanced filtering, and light/dark theme support. Built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ New Features

### 🎯 Comprehensive Career Data

- **50+ careers** from 12 major categories
- Detailed information: salary ranges, eligibility, exams, colleges
- Real-world data from Indian career landscape

### 🎨 Theme System

- **Light/Dark mode** toggle with smooth transitions
- Theme preference persists across sessions
- Optimized glassmorphism for both themes

### 🔍 Enhanced Filtering

- **5 powerful filter sections**: Categories, Streams, Salary, Age, Exams
- Collapsible filter panel with active count
- Mobile-responsive filter drawer
- Real-time results

### 💫 Premium UI/UX

- Animated header with theme toggle
- Enhanced career cards with category badges
- Smooth hover animations and glow effects
- Fully responsive design

## 🚀 Quick Start

### Installation

```bash
cd career-finder
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 📊 Career Categories

- **Engineering & Tech** (7 careers): Software, Mechanical, Civil, ECE, Aerospace, Marine, Biotech
- **Medical & Healthcare** (8 careers): MBBS, BDS, Nursing, Pharmacy, Physiotherapy, Veterinary, MLT, Nutrition
- **Finance & Commerce** (5 careers): CA, CS, Investment Banking, Actuarial Science, Management
- **Defense & Govt** (6 careers): Army, Navy, Air Force, Paramilitary, IAS/IPS, Banking
- **Law & Humanities** (4 careers): Law, Journalism, Psychology, Hotel Management
- **Aviation & Transport** (3 careers): Commercial Pilot, Cabin Crew, ATC
- **Design & Arts** (4 careers): Fashion, Interior, Graphic/UX, Fine Arts
- **Science & Research** (3 careers): Data Science/AI, Forensic Science, Archaeology
- **Agriculture** (2 careers): Agriculture Science, Forestry/IFS
- **Vocational & Others** (4 careers): Digital Marketing, Event Management, Sound Engineering, Fitness
- **Education** (2 careers): School Teaching, Professor
- **Railways** (1 career): Railway Engineer

## 🎯 Key Features

### Advanced Filtering

- **Category Filter**: Multi-select from 12 career categories
- **Stream Filter**: Science (PCM/PCB), Commerce, Arts, Any Stream
- **Salary Range**: ₹2.5L - ₹1.5Cr dual-range slider
- **Age Eligibility**: Min/Max age filtering
- **Exam Filter**: JEE, NEET, CAT, CLAT, NDA, UPSC, GATE, and more

### Theme Customization

- Toggle between light and dark modes
- Smooth color transitions
- Persistent theme preference
- Optimized for both modes

### Search & Discovery

- Real-time searchacross career names, descriptions, skills, and categories
- Combine search with advanced filters
- Smart suggestions

### Career Details

- Complete salary progression (Entry → Senior)
- Educational requirements (12th criteria)
- Top colleges and universities
- Popular entrance exams
- Required skills
- Age eligibility
- Role progression

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **State Management**: React Hooks
- **Data Storage**: JSON (ready for database migration)

## 📁 Project Structure

```
career-finder/
├── app/
│   ├── globals.css          # Theme-aware global styles
│   ├── layout.tsx           # Root layout with ThemeProvider
│   └── page.tsx             # Main page with enhanced filtering
├── components/
│   ├── ui/                  # Shadcn/UI components
│   ├── Header.tsx           # Premium header with theme toggle
│   ├── Hero.tsx             # Hero section
│   ├── Filters.tsx          # Enhanced filtering system
│   ├── CareerCard.tsx       # Interactive career cards
│   ├── CareerDetail.tsx     # Detailed career modal
│   ├── Timeline.tsx         # Career roadmap visualization
│   ├── theme-provider.tsx   # Theme context
│   └── theme-toggle.tsx     # Theme toggle button
├── data/
│   └── careers.json         # 50+ careers dataset
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── career.ts            # TypeScript type definitions
└── SCALABILITY.md          # Backend integration guide
```

## 🎨 Customization

### Adding Careers

Edit `data/careers.json`:

```json
{
  "id": "unique-id",
  "category": "Engineering & Tech",
  "career_option": "Career Name",
  "stream": "Science (PCM)",
  "description": "Career description",
  "skills_required": ["Skill 1", "Skill 2"],
  "entry_level_roles": "Entry Role",
  "mid_level_roles": "Mid Role",
  "senior_level_roles": "Senior Role",
  "salary_entry": 450000,
  "salary_senior": 4500000,
  "min_age": 17,
  "max_age": "No limit",
  "passing_criteria_12th": "75% in PCM",
  "top_colleges": ["College 1", "College 2"],
  "popular_exams": ["Exam 1", "Exam 2"]
}
```

### Theme Colors

Modify `app/globals.css`:

- Update CSS variables for custom colors
- Adjust glassmorphism effects
- Customize animations

### Styling

Configure `tailwind.config.ts`:

- Custom color palette
- Typography settings
- Animation timings

## 🔮 Future Enhancements

See [SCALABILITY.md](./SCALABILITY.md) for:

- Database integration (PostgreSQL/MongoDB)
- User authentication (NextAuth.js)
- Admin panel for career management
- API routes architecture
- Favorites and comparison features
- Deployment guidelines

## 📝 Data Structure

```typescript
interface Career {
  id: string;
  category: Category;
  career_option: string;
  stream: Stream;
  description: string;
  skills_required: string[];
  entry_level_roles: string;
  mid_level_roles: string;
  senior_level_roles: string;
  salary_entry: number;
  salary_senior: number | "Unlimited";
  min_age: number | "No limit";
  max_age: number | "No limit";
  passing_criteria_12th: string;
  top_colleges: string[];
  popular_exams: string[];
}
```

## 🎯 Usage Tips

1. **Exploring Careers**: Browse all 50+ careers or use search
2. **Filtering**: Combine multiple filters for precise results
3. **Theme**: Toggle light/dark mode in header
4. **Details**: Click "View Roadmap" on any career card
5. **Mobile**: Access filters via the Filters button

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- Career data compiled from authentic sources (IITs, NITs, AIIMS, government websites)
- UI inspiration from modern career platforms
- Built with open-source technologies

---

**Note**: This is a frontend-focused application currently using static JSON data. See [SCALABILITY.md](./SCALABILITY.md) for backend integration architecture when ready to scale.

**Version**: 2.0.0 (Enhanced with 50+ careers, theme system, and advanced filtering)
