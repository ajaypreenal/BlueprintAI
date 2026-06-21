'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { startSession } from '@/lib/fetchSession';
import { Zap, ArrowRight, Rocket, GraduationCap, Palette, Repeat2, Award } from 'lucide-react';

const userTypes = [
  { value: 'founder', label: 'Founder', icon: Rocket, description: 'Building a startup or new venture' },
  { value: 'student', label: 'Student', icon: GraduationCap, description: 'Working on a school or personal project' },
  { value: 'creator', label: 'Creator', icon: Palette, description: 'Building an audience, product, or content business' },
  { value: 'career_switcher', label: 'Career Switcher', icon: Repeat2, description: 'Exploring a new direction or field' },
  { value: 'grad', label: 'Recent Grad', icon: Award, description: 'Figuring out your next step' },
] as const;

const sampleIdeas = [
  'AI-powered fitness coaching app for remote workers',
  'A capstone project analyzing local transit data for my CS degree',
  'A newsletter and course business for indie game developers',
  'Transitioning from marketing into data analytics — portfolio project idea',
  'Mobile app for sustainable fashion discovery',
];

export default function AnalyzePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idea: '',
    userType: 'founder' as string,
    geography: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await startSession(formData.idea, formData.userType, formData.geography || 'global');
      if (data.session_id) {
        router.push(`/processing?session_id=${data.session_id}`);
      } else {
        throw new Error('No session was created. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong starting the analysis.');
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
            <h1 className="font-serif text-3xl font-semibold mb-2 flex items-center gap-3 text-ink">
              <Zap className="text-primary" size={32} />
              Analyze Your Idea
            </h1>
            <p className="text-muted">Tell us about your idea and we&apos;ll provide a comprehensive AI-powered analysis</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-ink">Which of these best describes you? *</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {userTypes.map((type) => {
                        const Icon = type.icon;
                        const selected = formData.userType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, userType: type.value })}
                            className={cn(
                              'text-left p-3 rounded-lg border transition-all flex items-start gap-3',
                              selected
                                ? 'bg-primary/10 border-primary'
                                : 'bg-paper border-border-soft hover:border-muted'
                            )}
                          >
                            <Icon size={20} className={selected ? 'text-primary' : 'text-muted'} />
                            <div>
                              <p className="font-medium text-sm text-ink">{type.label}</p>
                              <p className="text-xs text-muted">{type.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-ink">Your Idea *</label>
                    <TextArea
                      placeholder="Describe your idea, project, or goal in detail. Example: AI-powered fitness coaching app for remote workers..."
                      value={formData.idea}
                      onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink">Geography</label>
                    <Input placeholder="e.g., US, India, Global" value={formData.geography} onChange={(e) => setFormData({ ...formData, geography: e.target.value })} />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" isLoading={loading}>
                    Analyze Idea <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={20} />
                  </Button>
                </form>
              </Card>
            </div>

            <div>
              <Card className="p-6 sticky top-8">
                <h3 className="font-semibold mb-4 text-ink">Sample Ideas</h3>
                <p className="text-sm text-muted mb-4">Click any to get started:</p>
                <div className="space-y-2">
                  {sampleIdeas.map((idea, index) => (
                    <button key={index} onClick={() => handleSampleClick(idea)} className="w-full text-left p-3 rounded-lg bg-paper hover:bg-border-soft/40 border border-border-soft hover:border-primary transition-all text-sm text-ink">
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
