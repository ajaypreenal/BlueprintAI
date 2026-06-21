'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { RiskScoreCard } from '@/components/ui/RiskScoreCard';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { RiskDistributionChart, ScoreTrendChart, FeatureComparisonChart } from '@/components/charts/RiskCharts';
import Button from '@/components/ui/Button';
import { ArrowRight, Download, Share2, TrendingUp } from 'lucide-react';
import { riskBreakdownData, competitorData } from '@/lib/mockData';

const trendData = [
  { month: 'Week 1', score: 68 },
  { month: 'Week 2', score: 70 },
  { month: 'Week 3', score: 72 },
];

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    if (sessionId) {
      fetch(`/api/session/${sessionId}`)
        .then(res => res.json())
        .then(resData => setData(resData))
        .catch(err => console.error(err));
    }
  }, [sessionId]);

  const handleExportPDF = async () => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin: 1,
      filename: 'founderlens-analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FounderLens Risk Analysis',
          text: 'Check out my startup idea analysis on FounderLens!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const overallScore = data?.risk_score ? Math.round(
    (data.risk_score.competition + data.risk_score.market + data.risk_score.execution + data.risk_score.assumption) / 4 * 10
  ) : 72;

  const dynamicRiskBreakdown = data?.risk_score ? [
    { name: 'Competition Risk', value: data.risk_score.competition * 10, fill: '#EF4444' },
    { name: 'Market Demand', value: data.risk_score.market * 10, fill: '#F59E0B' },
    { name: 'Execution Risk', value: data.risk_score.execution * 10, fill: '#06B6D4' },
    { name: 'Financial Risk', value: data.risk_score.assumption * 10, fill: '#22C55E' },
  ] : riskBreakdownData;

  return (
    <DashboardLayout>
      <motion.div id="dashboard-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Risk Analysis Dashboard</h1>
            <p className="text-slate-400">AI-powered evaluation of your startup idea</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={handleExportPDF}>
              <Download size={18} />
              Export PDF
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={handleShare}>
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </div>

        {/* Overall Risk Score */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div>
                <h2 className="text-sm font-medium text-slate-400 mb-2">Overall Risk Score</h2>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="flex items-end gap-2">
                  <span className="text-6xl font-bold text-white">{overallScore}</span>
                  <span className="text-2xl text-slate-400 mb-2">/100</span>
                </motion.div>
              </div>

              <div>
                <Badge variant="warning" className="mb-3">
                  Moderate Risk
                </Badge>
                <p className="text-slate-300 text-sm mb-4">Your idea has solid potential with manageable risks. Focus on validating market demand and execution capabilities.</p>
                <Link href="/pivot">
                  <Button size="sm" variant="outline">
                    View Pivot Options <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="h-24 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <motion.circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="282" strokeDashoffset={282 - (overallScore / 100) * 282} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{overallScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Risk Breakdown Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <RiskScoreCard score={data?.risk_score?.competition * 10 || 65} title="Competition Risk" description="Market saturation level" trend="down" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <RiskScoreCard score={data?.risk_score?.market * 10 || 58} title="Market Demand" description="Customer need validation" trend="up" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <RiskScoreCard score={data?.risk_score?.execution * 10 || 72} title="Execution Risk" description="Team capability assessment" trend="stable" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <RiskScoreCard score={data?.risk_score?.assumption * 10 || 78} title="VC Score" description="Investment attractiveness" trend="down" />
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Risk Distribution</h3>
              <RiskDistributionChart data={dynamicRiskBreakdown} />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Score Trend</h3>
              <ScoreTrendChart data={trendData} />
            </Card>
          </motion.div>
        </div>

        {/* Competitor Comparison */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-secondary" />
              Competitive Landscape
            </h3>
            <FeatureComparisonChart data={competitorData} />
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid md:grid-cols-3 gap-4">
          <Link href="/research">
            <Button className="w-full" variant="secondary">
               View Research
            </Button>
          </Link>
          <Link href={`/roadmap${sessionId ? `?session_id=${sessionId}` : ''}`}>
            <Button className="w-full" variant="secondary">
               See Roadmap
            </Button>
          </Link>
          <Link href={`/validation${sessionId ? `?session_id=${sessionId}` : ''}`}>
            <Button className="w-full" variant="secondary">
               Validation Plan
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-slate-400">Loading Dashboard...</div></DashboardLayout>}>
      <DashboardContent />
    </Suspense>
  );
}
