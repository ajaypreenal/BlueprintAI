'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { RiskComparisonChart } from '@/components/charts/RiskCharts';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';

const pivotData = [
  { name: 'Original', oldScore: 72, newScore: 72 },
  { name: 'Pivot', oldScore: 72, newScore: 45 },
];

export default function PivotPage() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Lightbulb className="text-secondary" size={36} />
            Pivot Suggestions
          </h1>
          <p className="text-slate-400">AI-recommended strategic pivots to reduce risk</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Original Idea */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8 border-danger/20 bg-gradient-to-br from-danger/5 to-transparent">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-danger/20 flex items-center justify-center">
                  <span className="text-2xl"></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Original Idea</h3>
                  <Badge variant="danger" className="mt-2">
                    72/100 Risk
                  </Badge>
                </div>
              </div>
              <p className="text-slate-300 mb-6">AI-powered fitness coaching app for remote workers with real-time form correction and personalized workout plans.</p>
              <div className="space-y-2">
                <p className="text-sm text-slate-400">
                  <strong>Market Size:</strong> $2.5B globally
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Competitors:</strong> 15+ well-funded players
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Time to MVP:</strong> 6-8 months
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Suggested Pivot */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-8 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="text-success" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Suggested Pivot</h3>
                  <Badge variant="success" className="mt-2">
                    45/100 Risk
                  </Badge>
                </div>
              </div>
              <p className="text-slate-300 mb-6">B2B SaaS: AI-powered form analysis tool for corporate wellness programs and personal trainers. White-label solution.</p>
              <div className="space-y-2">
                <p className="text-sm text-slate-400">
                  <strong>Market Size:</strong> $500M+ (less crowded)
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Competitors:</strong> 3-4 direct players
                </p>
                <p className="text-sm text-slate-400">
                  <strong>Time to MVP:</strong> 3-4 months
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Why This Pivot */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Why This Pivot?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 text-success font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Less Competitive Market</h4>
                  <p className="text-slate-400">B2B fitness SaaS has 3-4x fewer competitors than B2C consumer apps</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 text-success font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Higher ACV & Better Unit Economics</h4>
                  <p className="text-slate-400">B2B pricing $200-500/month vs B2C $10-20/month, significantly better margins</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 text-success font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Faster MVP to Revenue</h4>
                  <p className="text-slate-400">Launch MVP in 3-4 months instead of 6-8, faster path to profitability</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 text-success font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Better Market Fit</h4>
                  <p className="text-slate-400">Personal trainers and gyms have clear pain points and willingness to pay</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Risk Comparison Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6">Risk Comparison: Before vs After</h3>
            <RiskComparisonChart data={pivotData} />
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
          <Button className="flex-1">
            Accept Pivot & Continue <ArrowRight className="ml-2" size={20} />
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button variant="secondary" className="w-full">
              Keep Original Idea
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
