'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Zap, ArrowRight } from 'lucide-react';

const sampleIdeas = [
  'AI-powered fitness coaching app for remote workers',
  'SaaS platform for freelance project management',
  'Mobile app for sustainable fashion discovery',
  'B2B tool for supply chain optimization',
  'AI tutor for personalized learning',
];

export default function AnalyzePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idea: '',
    targetAudience: '',
    industry: '',
    geography: '',
    revenueModel: '',
    teamSize: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.session_id) {
        router.push(`/processing?session_id=${data.session_id}`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setFormData({ ...formData, idea: sample });
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Zap className="text-secondary" size={32} />
              Analyze Your Startup Idea
            </h1>
            <p className="text-slate-400">Tell us about your idea and we&apos;ll provide comprehensive AI-powered analysis</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Your Startup Idea *</label>
                    <TextArea
                      placeholder="Describe your startup idea in detail. Example: AI-powered fitness coaching app for remote workers..."
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Target Audience *</label>
                      <Input placeholder="e.g., Remote office workers, ages 25-40" value={formData.targetAudience} onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })} required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Industry *</label>
                      <select value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary transition-all" required>
                        <option value="">Select an industry</option>
                        <option value="HealthTech">Health & Fitness</option>
                        <option value="SaaS">SaaS</option>
                        <option value="EdTech">EdTech</option>
                        <option value="FinTech">FinTech</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Geography *</label>
                      <Input placeholder="e.g., US, India, Global" value={formData.geography} onChange={(e) => setFormData({ ...formData, geography: e.target.value })} required />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Revenue Model *</label>
                      <select value={formData.revenueModel} onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-primary transition-all" required>
                        <option value="">Select revenue model</option>
                        <option value="SaaS">SaaS (Subscription)</option>
                        <option value="Marketplace">Marketplace</option>
                        <option value="B2B">B2B Services</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Team Size</label>
                    <Input placeholder="e.g., Solo user, 2 users" value={formData.teamSize} onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })} />
                  </div>

                  <Button type="submit" className="w-full" isLoading={loading}>
                    Analyze Idea <ArrowRight className="ml-2" size={20} />
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-8">
                <h3 className="font-semibold mb-4">Sample Ideas</h3>
                <p className="text-sm text-slate-400 mb-4">Click any to get started:</p>
                <div className="space-y-2">
                  {sampleIdeas.map((idea, index) => (
                    <button key={index} onClick={() => handleSampleClick(idea)} className="w-full text-left p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-primary transition-all text-sm">
                      <p className="line-clamp-2">{idea}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
