'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Target, TrendingUp, Zap, Lightbulb, Map } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
    title: 'VC Style Evaluation',
    description: 'Get investor-grade analysis on unit economics',
  },
  {
    icon: Zap,
    title: 'MVP Feasibility Check',
    description: 'Determine what you can build in 3-6 months',
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
  { num: 1, title: 'Enter Idea', description: 'Share your startup concept' },
  { num: 2, title: 'AI Research', description: 'Deep market analysis' },
  { num: 3, title: 'Risk Scoring', description: 'Comprehensive evaluation' },
  { num: 4, title: 'Roadmap Generation', description: 'Action plan created' },
  { num: 5, title: 'Validation Checklist', description: 'Next steps defined' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-dark overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-bg-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FounderLens
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl animate-pulse-slow" />
        </div>

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
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Validate Your Startup Idea
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Before You Build
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            AI-powered risk analysis, roadmap generation, and validation planning in under 10 minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/analyze">
              <Button size="lg" className="w-full sm:w-auto">
                Analyze My Idea <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </motion.div>

          {/* Floating Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 relative"
          >
            <div className="rounded-xl border border-slate-700 bg-card-dark/50 backdrop-blur-md p-8 shadow-2xl shadow-primary/20">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-800 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-2 bg-slate-800 rounded animate-pulse" style={{ width: `${80 - i * 20}%` }} />
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
            <h3 className="text-4xl font-bold mb-4">Comprehensive Startup Analysis</h3>
            <p className="text-lg text-slate-400">Everything you need to validate and launch</p>
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
                  <Card hoverable glass className="p-6 h-full">
                    <Icon size={32} className="text-secondary mb-4" />
                    <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                    <p className="text-slate-400">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold mb-4">How It Works</h3>
            <p className="text-lg text-slate-400">Simple 5-step process</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary hidden md:block -z-10" />

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
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    {step.num}
                  </div>
                </div>
                <h4 className="font-semibold text-center mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 text-center">{step.description}</p>
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
          <h3 className="text-4xl font-bold mb-4">Start Your User Journey</h3>
          <p className="text-xl text-slate-300 mb-8">
            Hundreds of users have validated their ideas using FounderLens. Get your personalized analysis in under 10 minutes.
          </p>
          <Link href="/analyze">
            <Button size="lg">Begin Analysis <ArrowRight className="ml-2" size={20} /></Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">FounderLens</h4>
              <p className="text-slate-400 text-sm">AI-powered startup validation platform</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Analyze Idea</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">© 2024 FounderLens. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
