'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Target, TrendingUp, Zap, Lightbulb, Map, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/lib/AuthContext';

const features = [
  {
    icon: Search,
    title: 'Competition Analysis',
    description: 'Discover direct competitors and market positioning gaps',
  },
  {
    icon: Target,
    title: 'Market Demand Validation',
    description: 'Validate if customers actually want your solution',
  },
  {
    icon: TrendingUp,
    title: 'Reality-Check Scoring',
    description: 'A no-nonsense evaluation of viability and risk',
  },
  {
    icon: Zap,
    title: 'Build Feasibility Check',
    description: 'Determine what you can realistically build first',
  },
  {
    icon: Lightbulb,
    title: 'Pivot Suggestions',
    description: 'Get AI-powered pivot ideas if risks are too high',
  },
  {
    icon: Map,
    title: 'Validation Experiments',
    description: 'Step-by-step plan to validate your assumptions',
  },
];

const steps = [
  { num: 1, title: 'Enter Idea', description: 'Share your idea, project, or goal' },
  { num: 2, title: 'AI Research', description: 'Deep market analysis' },
  { num: 3, title: 'Risk Scoring', description: 'Comprehensive evaluation' },
  { num: 4, title: 'Roadmap Generation', description: 'Action plan created' },
  { num: 5, title: 'Validation Checklist', description: 'Next steps defined' },
];

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-soft bg-paper/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-semibold text-primary">
            BlueprintAI
          </h1>
          <div className="flex items-center gap-4">
            {!loading && user ? (
              <>
                {user.picture && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.picture} alt={user.name || 'Account'} className="w-8 h-8 rounded-full border border-border-soft" />
                )}
                <span className="text-sm text-ink hidden sm:inline">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-2">
                  <LogOut size={16} /> Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-serif text-5xl md:text-7xl font-semibold mb-6 leading-tight text-ink"
          >
            From Idea to Action Plan
            <br />
            <span className="text-primary">
              Before You Build
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-muted mb-8 max-w-2xl mx-auto"
          >
            For founders, students, creators, and career-switchers — AI-powered risk analysis, roadmap generation, and validation planning in under 10 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/analyze">
              <Button size="lg" className="w-full sm:w-auto">
                Analyze My Idea <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={20} />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 relative"
          >
            <div className="rounded-lg border border-border-soft bg-card-dark p-8">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-border-soft/40 rounded-lg" />
                ))}
              </div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-2 bg-border-soft/40 rounded" style={{ width: `${80 - i * 20}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="font-serif text-4xl font-semibold mb-4 text-ink">Comprehensive Idea Analysis</h3>
            <p className="text-lg text-muted">Everything you need to validate and take your next step</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card hoverable className="p-6 h-full">
                    <Icon size={28} className="text-primary mb-4" />
                    <h4 className="text-xl font-semibold mb-2 text-ink">{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 border-t border-border-soft">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="font-serif text-4xl font-semibold mb-4 text-ink">How It Works</h3>
            <p className="text-lg text-muted">Simple 5-step process</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-border-soft hidden md:block -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary bg-paper flex items-center justify-center text-primary font-serif font-semibold text-xl">
                    {step.num}
                  </div>
                </div>
                <h4 className="font-semibold text-center mb-2 text-ink">{step.title}</h4>
                <p className="text-sm text-muted text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="font-serif text-4xl font-semibold mb-4 text-ink">Start Your Journey</h3>
          <p className="text-xl text-muted mb-8">
            Founders, students, creators, and career-switchers have validated their ideas using BlueprintAI. Get your personalized analysis in under 10 minutes.
          </p>
          <Link href="/analyze">
            <Button size="lg">Begin Analysis <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={20} /></Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-soft py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif font-semibold mb-4 text-ink">BlueprintAI</h4>
              <p className="text-muted text-sm">AI-powered idea validation and roadmap platform</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-ink">Product</h5>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-ink transition">Analyze Idea</a></li>
                <li><a href="#" className="hover:text-ink transition">Features</a></li>
                <li><a href="#" className="hover:text-ink transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-ink">Company</h5>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-ink transition">About</a></li>
                <li><a href="#" className="hover:text-ink transition">Blog</a></li>
                <li><a href="#" className="hover:text-ink transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-ink">Legal</h5>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-ink transition">Privacy</a></li>
                <li><a href="#" className="hover:text-ink transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-soft pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted text-sm">© 2024 BlueprintAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted hover:text-ink transition">Twitter</a>
              <a href="#" className="text-muted hover:text-ink transition">LinkedIn</a>
              <a href="#" className="text-muted hover:text-ink transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
