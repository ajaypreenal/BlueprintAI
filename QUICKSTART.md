# Quick Start Guide - FounderLens

Get up and running in 5 minutes!

## 1. Installation (2 minutes)

```bash
# Navigate to project directory
cd founderlens

# Install dependencies
npm install

# Start development server
npm run dev
```

## 2. Access the Application (1 minute)

Open your browser and navigate to:
```
http://localhost:3000
```

## 3. Explore the Features (2 minutes)

### Navigation Flow

**Public Pages** (No login required):
- Home: `http://localhost:3000` - Landing page with features and CTA
- Login: `http://localhost:3000/login` - Sign in page
- Register: `http://localhost:3000/register` - Create account

**Dashboard Pages** (Main application):
- Dashboard: `http://localhost:3000/dashboard` - Risk analysis main view
- Analyze: `http://localhost:3000/analyze` - Submit new startup idea
- Processing: `http://localhost:3000/processing` - AI analysis animation
- Research: `http://localhost:3000/research` - Research findings
- Pivot: `http://localhost:3000/pivot` - Pivot suggestions
- Roadmap: `http://localhost:3000/roadmap` - 90-day plan
- Validation: `http://localhost:3000/validation` - Assumption checklist
- History: `http://localhost:3000/history` - Past analyses
- Export: `http://localhost:3000/export` - PDF export
- Settings: `http://localhost:3000/settings` - Account settings

### Recommended Flow

1. **Start here**: Home page (`/`) - Understand the value proposition
2. **Submit idea**: Analyze page (`/analyze`) - Fill out the form with your idea
3. **Watch it process**: Processing page (`/processing`) - See the AI at work
4. **View results**: Dashboard (`/dashboard`) - See your risk analysis
5. **Explore deeper**: Research, Pivot, Roadmap, Validation pages
6. **Review history**: History page (`/history`) - See past analyses
7. **Download report**: Export page (`/export`) - Get PDF report

## 4. Customization

### Change Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  // ... etc
}
```

### Update Content
- Mock data: `lib/mockData.ts`
- Navigation: `components/layout/Sidebar.tsx`
- Company info: Update in footer on `app/page.tsx`

### Add API Integration
Replace mock data functions with real API calls in each page component.

## 5. Deployment

### Deploy to Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
Build first:
```bash
npm run build
npm start
```

Then deploy the `.next` folder to your hosting platform.

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
rm -rf .next
npm install
npm run dev
```

**Types not working?**
```bash
npm install --save-dev @types/react @types/node
```

## Key Files to Understand

1. **`app/layout.tsx`** - Root layout wrapper
2. **`components/layout/Sidebar.tsx`** - Main navigation
3. **`components/ui/Button.tsx`** - Reusable button component
4. **`lib/mockData.ts`** - All mock data for the app
5. **`tailwind.config.ts`** - Color and styling config
6. **`types/index.ts`** - TypeScript interfaces

## Next Steps

1. ✅ Get it running locally
2. 📝 Read the full README.md
3. 🎨 Customize colors and branding
4. 🔌 Connect to your backend API
5. 🚀 Deploy to production

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---

**Happy building! 🚀**
