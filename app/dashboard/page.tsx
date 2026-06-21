'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { RiskScoreCard } from '@/components/ui/RiskScoreCard';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { RiskDistributionChart, ScoreTrendChart, FeatureComparisonChart } from '@/components/charts/RiskCharts';
import Button from '@/components/ui/Button';
import { ArrowRight, Download, Share2, TrendingUp, ShieldCheck, Globe2, ListTree } from 'lucide-react';
import { riskBreakdownData, competitorData } from '@/lib/mockData';
import { fetchSession } from '@/lib/fetchSession';

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
      fetchSession(sessionId)
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
      filename: 'blueprintai-analysis.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const },
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BlueprintAI Risk Analysis',
          text: 'Check out my idea analysis on BlueprintAI!',
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
    { name: 'Willingness to Pay', value: data.risk_score.assumption * 10, fill: '#22C55E' },
  ] : riskBreakdownData;

  return (
    <DashboardLayout>
      <motion.div id="dashboard-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-semibold mb-2 text-ink">Risk Analysis Dashboard</h1>
            <p className="text-muted">AI-powered evaluation of your idea</p>
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
          <Card className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div>
                <h2 className="text-sm font-medium text-muted mb-2">Overall Risk Score</h2>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="flex items-end gap-2">
                  <span className="font-serif text-6xl font-semibold text-ink">{overallScore}</span>
                  <span className="text-2xl text-muted mb-2">/100</span>
                </motion.div>
              </div>

              <div>
                <Badge variant="warning" className="mb-3">
                  Moderate Risk
                </Badge>
                <p className="text-ink text-sm mb-4">Your idea has solid potential with manageable risks. Focus on validating market demand and execution capabilities.</p>
                <Link href={`/pivot${sessionId ? `?session_id=${sessionId}` : ''}`}>
                  <Button size="sm" variant="outline">
                    View Pivot Options <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="h-24 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                    <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray="282" strokeDashoffset={282 - (overallScore / 100) * 282} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-ink">{overallScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Risk Breakdown Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <RiskScoreCard score={data?.risk_score?.competition * 10 || 65} title="Competition" description="How crowded this space already is" trend="down" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <RiskScoreCard score={data?.risk_score?.market * 10 || 58} title="Market Demand" description="Evidence people actually want this" trend="up" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <RiskScoreCard score={data?.risk_score?.execution * 10 || 72} title="Execution Difficulty" description="How hard this is to build and ship" trend="stable" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <RiskScoreCard score={data?.risk_score?.assumption * 10 || 78} title="Willingness to Pay" description="Would people pay for this?" trend="down" />
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-ink">Risk Distribution</h3>
              <RiskDistributionChart data={dynamicRiskBreakdown} />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-ink">Score Trend</h3>
              <ScoreTrendChart data={trendData} />
            </Card>
          </motion.div>
        </div>

        {/* Competitor Comparison */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-ink">
              <TrendingUp size={20} className="text-primary" />
              Competitive Landscape
            </h3>
            <FeatureComparisonChart data={competitorData} />
          </Card>
        </motion.div>

        {/* Responsible AI Section */}
        {data && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-1 flex items-center gap-2 text-ink">
                <ShieldCheck size={20} className="text-primary" />
                Responsible AI Transparency
              </h3>
              <p className="text-sm text-muted mb-6">
                How confident is this analysis, and where might it be biased? Shown so you can judge how much to trust each score.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-ink mb-3 flex items-center gap-2">
                    <ShieldCheck size={16} /> Evidence Confidence
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(data.evidence_confidence || {}).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-muted capitalize">{key.replace(/_/g, ' ')}</span>
                        <Badge
                          variant={
                            val === 'High' ? 'success' : val === 'Medium' ? 'warning' : val === 'Low' ? 'danger' : 'neutral'
                          }
                        >
                          {String(val)}
                        </Badge>
                      </div>
                    ))}
                    {Object.keys(data.evidence_confidence || {}).length === 0 && (
                      <p className="text-sm text-muted">No confidence data available yet.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-ink mb-3 flex items-center gap-2">
                    <Globe2 size={16} /> Geographic Bias
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(data.geographic_bias || {}).map(([key, val]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted capitalize">{key.replace(/_/g, ' ')}: </span>
                        <span className="text-ink">{String(val)}</span>
                      </div>
                    ))}
                    {Object.keys(data.geographic_bias || {}).length === 0 && (
                      <p className="text-sm text-muted">No bias data available yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {Object.keys(data.score_explainability || {}).length > 0 && (
                <div className="pt-4 border-t border-border-soft">
                  <h4 className="text-sm font-medium text-ink mb-3 flex items-center gap-2">
                    <ListTree size={16} /> Score Explainability
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(data.score_explainability).map(([dimension, detail]: [string, any]) => (
                      <div key={dimension} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-ink capitalize">{dimension.replace(/_/g, ' ')}</span>
                          <Badge variant="info">{detail?.score}/10</Badge>
                        </div>
                        {Array.isArray(detail?.driven_by) && detail.driven_by.length > 0 && (
                          <ul className="text-xs text-muted ml-4 list-disc">
                            {detail.driven_by.slice(0, 3).map((src: string, i: number) => (
                              <li key={i} className="truncate">{src}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid md:grid-cols-3 gap-4">
          <Link href={`/research${sessionId ? `?session_id=${sessionId}` : ''}`}>
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
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-muted">Loading Dashboard...</div></DashboardLayout>}>
      <DashboardContent />
    </Suspense>
  );
}
