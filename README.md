# Andre Granadeiro's Portfolio

A modern, AI-powered portfolio website built with Next.js, React, TypeScript, and Groq AI.

## 🚀 Features

- **Clean, Modern Design**: Dark theme with geometric backgrounds and smooth animations
- **AI Chat Agent**: Powered by Groq API for intelligent navigation and Q&A about your background
- **Fully Responsive**: Mobile-first design works seamlessly on all devices
- **Performance Optimized**: 98.4kB First Load JS with optimized images and code splitting
- **Full-Stack Architecture**: Next.js with TypeScript, Tailwind CSS, and server-side API routes
- **SEO Ready**: Dynamic meta tags, Open Graph, structured data

## 📋 Portfolio Sections

- **Home**: Hero section with animated background and quick stats
- **About**: Your story, journey, and key achievements
- **Experience**: Work history with achievements and tech stack
- **Projects**: Portfolio projects organized by category (AI/ML, Finance, Web, Sports)
- **Bookshelf**: Reading list and learning resources (template ready)
- **Contact**: Contact form with quote of the day feature
- **Chat Agent**: AI assistant for intelligent navigation and Q&A (Groq-powered)

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion & GSAP (animations)
- Chakra UI providers

### Backend & AI
- Node.js
- Groq SDK (LLaMA 3.1 / Mixtral models)
- REST API endpoints

### Development
- ESLint & Prettier
- Git with conventional commits
- Optimized Next.js configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Groq API key (free tier available at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your GROQ_API_KEY to .env.local
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
andre-portfolio/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── experience/page.tsx   # Experience page
│   ├── projects/page.tsx     # Projects page
│   ├── bookshelf/page.tsx    # Bookshelf page
│   ├── contact/page.tsx      # Contact page
│   ├── api/
│   │   └── chat/route.ts    # Groq chat API endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navigation.tsx        # Navigation bar
│   ├── Shared/               # Reusable components
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── Badge.tsx
│   └── Cards/                # Card components (for future use)
├── data/
│   ├── experience.ts         # Work experience data
│   ├── projects.ts           # Portfolio projects
│   ├── skills.ts             # Skills & tech stack
│   ├── about.ts              # About page content
│   └── quotes.ts             # Quotes database
├── lib/
│   ├── groq.ts              # Groq API integration
│   ├── navigation.ts        # Portal structure for agent
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Customization

### Update Your Content

All content is stored in the `data/` directory as TypeScript files:

- **Experience**: Edit `data/experience.ts` to add/update work history
- **Projects**: Edit `data/projects.ts` to showcase your portfolio projects
- **Skills**: Edit `data/skills.ts` to list your technical skills
- **About**: Edit `data/about.ts` to customize your bio and story
- **Quotes**: Edit `data/quotes.ts` to add personal quotes

### Styling

- Customize colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles with Tailwind classes

### AI Agent Configuration

The AI agent is configured in `lib/groq.ts`. To customize:

1. Update the system prompt (around line 10-60)
2. Add/remove navigation sections in `lib/navigation.ts`
3. Modify intent handling in `lib/groq.ts`

## 🔑 Environment Variables

Required for running the AI chat agent:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get a free Groq API key from [console.groq.com](https://console.groq.com)

## 📊 Performance Metrics

Target Core Web Vitals:
- **LCP**: < 1.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle Size**: < 200KB gzipped

Current: 98.4kB First Load JS ✅

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - GROQ_API_KEY
```

### Other Hosting Options
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Docker

## 📝 Adding Features

### Chat Agent Component

To add the floating chat agent, create `components/ChatAgent.tsx`:

```typescript
"use client";

export const ChatAgent = () => {
  // Floating chat widget implementation
  // Uses /api/chat endpoint
  // Shows AI responses with intent-based navigation
};
```

### Custom Animations

Use Framer Motion or GSAP with utilities in `lib/utils.ts`:

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🐛 Troubleshooting

### Chat API Returns 503

Check that `GROQ_API_KEY` is set in `.env.local`

### Styles Not Applying

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Build Fails

Ensure TypeScript types are correct:
```bash
npm run type-check
```

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Groq API Docs](https://console.groq.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

This is your personal portfolio. Modify as needed!

## 📄 License

Personal Use. © 2026 Andre Granadeiro

## 🙋 Support

For issues or questions, refer to the documentation or check the implementation in the source code.

---

Built with ❤️ using Next.js and Groq AI | Made with Claude Code
