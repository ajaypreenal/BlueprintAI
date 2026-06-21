'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fetchSession } from '@/lib/fetchSession';
import { CheckCircle2, ArrowRight, Lightbulb, ThumbsUp } from 'lucide-react';

function PivotContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [data, setData] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId)
        .then((resData) => {
          if (resData.status !== 'error') setData(resData);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [sessionId]);

  const pivot = data?.pivot || {};
  const hasPivot = pivot && Object.keys(pivot).length > 0 && !!pivot.pivot_idea;
  const scorecard = data?.scorecard || {};

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <Lightbulb className="text-primary" size={36} />
            Pivot Suggestions
          </h1>
          <p className="text-muted">AI-recommended strategic pivots to reduce risk</p>
        </div>

        {!loaded && (
          <Card className="p-12 text-center text-muted">Loading...</Card>
        )}

        {loaded && !sessionId && (
          <Card className="p-8 text-center text-muted">
            No analysis session found. Run an analysis first to see pivot suggestions for your idea.
          </Card>
        )}

        {loaded && sessionId && !hasPivot && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-12 text-center">
              <div className="inline-block p-4 rounded-full bg-success/20 mb-4">
                <ThumbsUp className="text-success" size={48} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2 text-ink">No Pivot Recommended</h3>
              <p className="text-muted max-w-xl mx-auto">
                Your idea&apos;s average risk score didn&apos;t cross the threshold that triggers a pivot suggestion.
                {scorecard.overall_score !== undefined && (
                  <> Current overall risk: <strong>{scorecard.overall_score}/10</strong>.</>
                )}
              </p>
            </Card>
          </motion.div>
        )}

        {loaded && hasPivot && (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Original Idea */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card className="p-8 h-full">
                  <div className="flex items-start gap-3 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">Original Idea</h3>
                      {scorecard.overall_score !== undefined && (
                        <Badge variant="danger" className="mt-2">
                          {scorecard.overall_score}/10 Risk · {scorecard.verdict}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-ink mb-6">{data?.idea_cleaned?.cleaned_idea || data?.original_data?.idea}</p>
                  {scorecard.top_risk && (
                    <p className="text-sm text-muted">
                      <strong>Top Risk:</strong> {scorecard.top_risk}
                    </p>
                  )}
                </Card>
              </motion.div>

              {/* Suggested Pivot */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-8 h-full">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="text-success" size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">Suggested Pivot</h3>
                    </div>
                  </div>
                  <p className="text-ink mb-6">{pivot.pivot_idea}</p>
                  {pivot.new_target_user && (
                    <p className="text-sm text-muted">
                      <strong>New Target User:</strong> {pivot.new_target_user}
                    </p>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Why This Pivot */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
              <Card className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-ink">Why This Pivot?</h3>
                <p className="text-ink">{pivot.why_better}</p>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
              <Link href={`/roadmap${sessionId ? `?session_id=${sessionId}` : ''}`} className="flex-1">
                <Button className="w-full">
                  View Pivot Roadmap <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={20} />
                </Button>
              </Link>
              <Link href={`/dashboard${sessionId ? `?session_id=${sessionId}` : ''}`} className="flex-1">
                <Button variant="secondary" className="w-full">
                  Keep Original Idea
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default function PivotPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-muted">Loading Pivot Suggestions...</div></DashboardLayout>}>
      <PivotContent />
    </Suspense>
  );
}
