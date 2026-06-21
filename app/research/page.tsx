'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { researchFindings } from '@/lib/mockData';
import { fetchSession } from '@/lib/fetchSession';
import { Search, TrendingUp, Zap } from 'lucide-react';

function confidenceBadgeVariant(val: string) {
  if (val === 'High') return 'success';
  if (val === 'Medium') return 'warning';
  if (val === 'Low') return 'danger';
  return 'neutral';
}

function ResearchContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId)
        .then((resData) => {
          if (resData.status !== 'error') setData(resData);
        })
        .catch(console.error);
    }
  }, [sessionId]);

  const competitors: string[] = data?.competitors || [];
  const painPoints: string[] = data?.pain_points || [];
  const explainability = data?.score_explainability || {};
  const evidenceConfidence = data?.evidence_confidence || {};
  const geoBias = data?.geographic_bias || {};

  const hasRealData = competitors.length > 0 || painPoints.length > 0;

  const competitionItems = hasRealData
    ? competitors.map((c, i) => ({
        title: c,
        content: (
          <div>
            <p className="text-sm text-muted">Identified via live web search.</p>
          </div>
        ),
        defaultOpen: i === 0,
      }))
    : researchFindings.competition.map((finding, i) => ({
        title: finding.title,
        content: (
          <div>
            <p className="mb-3">{finding.content}</p>
            <div className="flex gap-2 flex-wrap">
              {finding.evidence.map((ev, j) => (
                <Badge key={j} variant="info">
                  {ev}
                </Badge>
              ))}
            </div>
          </div>
        ),
        defaultOpen: i === 0,
      }));

  const marketItems = hasRealData
    ? painPoints.map((p, i) => ({
        title: `Pain Point ${i + 1}`,
        content: (
          <div>
            <p className="text-sm text-ink">{p}</p>
          </div>
        ),
        defaultOpen: i === 0,
      }))
    : researchFindings.market.map((finding, i) => ({
        title: finding.title,
        content: (
          <div>
            <p className="mb-3">{finding.content}</p>
            <div className="flex gap-2 flex-wrap">
              {finding.evidence.map((ev, j) => (
                <Badge key={j} variant="success">
                  {ev}
                </Badge>
              ))}
            </div>
          </div>
        ),
        defaultOpen: i === 0,
      }));

  const explainabilityEntries = Object.entries(explainability);
  const vcItems = explainabilityEntries.length > 0
    ? explainabilityEntries.map(([dimension, detail]: [string, any]) => ({
        title: `${dimension.replace(/_/g, ' ')} — ${detail?.score}/10`,
        content: (
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant={confidenceBadgeVariant(detail?.evidence_confidence)}>
                Confidence: {detail?.evidence_confidence}
              </Badge>
            </div>
            <p className="text-sm text-muted mb-2">{detail?.geographic_bias}</p>
            {Array.isArray(detail?.driven_by) && (
              <ul className="space-y-1">
                {detail.driven_by.map((src: string, j: number) => (
                  <li key={j} className="text-xs text-muted">{src}</li>
                ))}
              </ul>
            )}
          </div>
        ),
        defaultOpen: false,
      }))
    : researchFindings.vc.map((finding, i) => ({
        title: finding.title,
        content: (
          <div>
            <p className="mb-3">{finding.content}</p>
            <div className="flex gap-2 flex-wrap">
              {finding.evidence.map((ev, j) => (
                <Badge key={j} variant="info">
                  {ev}
                </Badge>
              ))}
            </div>
          </div>
        ),
        defaultOpen: i === 0,
      }));

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <Search className="text-primary" size={36} />
            Research Evidence
          </h1>
          <p className="text-muted">
            {hasRealData ? 'Live findings from web search for your idea' : 'Detailed findings from our AI analysis'}
          </p>
        </div>

        {/* Competition Findings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="text-primary flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-ink">Competition Analysis</h3>
                <p className="text-sm text-muted">{competitionItems.length} competitors identified</p>
              </div>
              {evidenceConfidence.competitors && (
                <Badge variant={confidenceBadgeVariant(evidenceConfidence.competitors)}>
                  Confidence: {evidenceConfidence.competitors}
                </Badge>
              )}
            </div>
            <Accordion items={competitionItems} />
            {geoBias.competitors && (
              <p className="text-xs text-muted mt-3">{geoBias.competitors}</p>
            )}
          </Card>
        </motion.div>

        {/* Market Demand Findings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <Card className="p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="text-primary flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-ink">Market Demand Validation</h3>
                <p className="text-sm text-muted">{marketItems.length} pain points / demand signals found</p>
              </div>
              {evidenceConfidence.pain_points && (
                <Badge variant={confidenceBadgeVariant(evidenceConfidence.pain_points)}>
                  Confidence: {evidenceConfidence.pain_points}
                </Badge>
              )}
            </div>
            <Accordion items={marketItems} />
            {geoBias.pain_points && (
              <p className="text-xs text-muted mt-3">{geoBias.pain_points}</p>
            )}
          </Card>
        </motion.div>

        {/* Score Explainability */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <Card className="p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="text-primary flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-ink">VC Evaluation</h3>
                <p className="text-sm text-muted">
                  {explainabilityEntries.length > 0 ? 'Score breakdown and the evidence behind each' : 'Investment perspective analysis'}
                </p>
              </div>
            </div>
            <Accordion items={vcItems} />
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-muted">Loading Research...</div></DashboardLayout>}>
      <ResearchContent />
    </Suspense>
  );
}
