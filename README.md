# FounderLens - AI-Powered Startup Idea Validator

A modern, production-ready SaaS web application built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, and Recharts.

## Features

✅ **Complete Landing Page** - Hero section with animations, features, how-it-works, and CTA
✅ **Authentication** - Login and registration pages with modern UI
✅ **Idea Submission** - Submit startup ideas with detailed form fields
✅ **AI Processing Animation** - Beautiful loading page with animated progress
✅ **Risk Analysis Dashboard** - Comprehensive analysis with charts and metrics
✅ **Research Evidence** - Detailed competitive and market findings
✅ **Pivot Suggestions** - AI-recommended pivots with risk comparison
✅ **Personalized Roadmap** - 90-day action plan with milestones
✅ **Assumption Validation** - Interactive validation checklist
✅ **Session History** - Search and filter past analyses
✅ **Settings** - User profile and preferences management
✅ **PDF Export** - Generate downloadable reports
✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Dark Mode Default** - Premium dark aesthetic throughout
✅ **Smooth Animations** - Framer Motion animations on all pages
✅ **Charts & Visualizations** - Recharts for data visualization

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Components:** Custom UI components (Button, Card, Input, etc.)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide Icons
- **State Management:** React Hooks
- **Type Safety:** Full TypeScript support

## Project Structure

```
founderlens/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── dashboard/           # Risk analysis dashboard
│   ├── analyze/             # Idea submission
│   ├── processing/          # AI processing animation
│   ├── research/            # Research findings
│   ├── pivot/               # Pivot suggestions
│   ├── roadmap/             # Personalized roadmap
│   ├── validation/          # Assumption validation
│   ├── history/             # Session history
│   ├── export/              # PDF export
│   └── settings/            # Settings page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── charts/              # Chart components
├── lib/
│   ├── mockData.ts          # Mock API data
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   cd founderlens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
npm start
```

## Key Components

### UI Components
- `Button` - Flexible button with variants (primary, secondary, outline, danger)
- `Card` - Reusable card with optional glass effect
- `Input` & `TextArea` - Styled form inputs
- `Badge` - Status and info badges
- `ProgressBar` - Animated progress bars
- `Accordion` - Expandable content sections
- `RiskScoreCard` - Risk score visualization

### Layout Components
- `DashboardLayout` - Main layout with sidebar navigation
- `Sidebar` - Sticky sidebar with responsive mobile menu

### Chart Components
- `RiskComparisonChart` - Before/after risk comparison
- `RiskDistributionChart` - Pie chart for risk breakdown
- `ScoreTrendChart` - Line chart for score trends
- `FeatureComparisonChart` - Bar chart for features

## Design System

### Colors
- **Primary:** #4F46E5 (Indigo)
- **Secondary:** #06B6D4 (Cyan)
- **Success:** #22C55E (Green)
- **Warning:** #F59E0B (Amber)
- **Danger:** #EF4444 (Red)
- **Background:** #0F172A (Navy)
- **Card:** #1E293B (Dark Blue)

### Typography
- Font: Geist (system font)
- Strong visual hierarchy
- Responsive sizing across breakpoints

### Spacing
- Consistent padding and margins
- Responsive spacing system via Tailwind

## Mock Data

The application uses mock data for demonstration:
- `mockSessionHistory` - Previous analyses
- `mockRoadmapMilestones` - 90-day roadmap items
- `mockAssumptions` - Validation assumptions
- `competitorData` - Competitive landscape
- `researchFindings` - Competition, market, and VC findings

Replace with real API calls as needed.

## Customization

### Adding New Pages
1. Create a new directory under `app/`
2. Add a `page.tsx` file
3. Wrap with `<DashboardLayout>` for dashboard pages
4. Update sidebar navigation in `components/layout/Sidebar.tsx`

### Updating Colors
Edit `tailwind.config.ts` to change the color system globally.

### Modifying Animations
Adjust Framer Motion settings in individual components or create animation presets in `lib/animations.ts`.

## Performance Optimizations

- ✅ Server-side rendering with Next.js
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS-in-JS with Tailwind
- ✅ Lazy loading for charts
- ✅ Optimized animations

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Focus states on interactive elements

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Docker support ready
- Environment variables configurable
- API routes prepared for backend integration

## Future Enhancements

- [ ] Real API integration
- [ ] User authentication with NextAuth.js
- [ ] Database integration (Prisma + PostgreSQL)
- [ ] PDF generation with html2pdf
- [ ] Email notifications
- [ ] Real-time chat with AI
- [ ] Team collaboration features
- [ ] Payment processing (Stripe)

## License

MIT - Feel free to use for your startup!

## Support

For questions or issues, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Recharts: https://recharts.org/

---

**Built with ❤️ for founders. Ready to validate your idea!**
