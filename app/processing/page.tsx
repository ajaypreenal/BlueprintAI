'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Badge';
import { fetchSession } from '@/lib/fetchSession';
import { CheckCircle2, Zap, AlertTriangle } from 'lucide-react';

const MAX_WAIT_MS = 90000;

const stages = [
  { id: 1, title: 'Intent Extraction', icon: '', completed: false },
  { id: 2, title: 'Competition Research', icon: '', completed: false },
  { id: 3, title: 'Market Demand Analysis', icon: '', completed: false },
  { id: 4, title: 'VC Evaluation', icon: '', completed: false },
  { id: 5, title: 'Execution Risk Assessment', icon: '', completed: false },
  { id: 6, title: 'Roadmap Generation', icon: '', completed: false },
];

const activities = [
  'Searching for competitors in market...',
  'Analyzing market trends and demand signals...',
  'Evaluating financial metrics and unit economics...',
  'Assessing team and execution risks...',
  'Generating personalized roadmap...',
];

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<boolean[]>(
    stages.map(() => false)
  );
  const [activityIndex, setActivityIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setTimeout(() => router.push('/dashboard'), 1500);
      return;
    }

    const startedAt = Date.now();

    const interval = setInterval(async () => {
      if (Date.now() - startedAt > MAX_WAIT_MS) {
        clearInterval(interval);
        setError('This is taking longer than expected. The analysis may have failed or the backend may be unreachable.');
        return;
      }

      try {
        const data = await fetchSession(sessionId);

        if (data.status === 'completed') {
          clearInterval(interval);
          setProgress(100);
          setCompletedStages(stages.map(() => true));
          setTimeout(() => router.push(`/dashboard?session_id=${sessionId}`), 1000);
        } else if (data.status === 'error') {
          clearInterval(interval);
          setError(data.error || 'The analysis pipeline failed unexpectedly.');
        } else {
          setProgress((prev) => {
            const newProgress = Math.min(prev + Math.random() * 15, 90);
            const stageIndex = Math.floor((newProgress / 100) * stages.length);

            setCurrentStage(stageIndex);
            setCompletedStages((prevStage) => prevStage.map((_, i) => i < stageIndex));
            setActivityIndex(Math.floor((newProgress / 100) * activities.length));

            return newProgress;
          });
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [sessionId, router]);

  if (error) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="max-w-2xl mx-auto py-12">
            <Card className="p-12 text-center border-danger/30">
              <div className="inline-block p-4 rounded-full bg-danger/20 mb-6">
                <AlertTriangle className="text-danger" size={48} />
              </div>
              <h2 className="font-serif text-3xl font-semibold mb-2 text-ink">Analysis Failed</h2>
              <p className="text-muted mb-8">{error}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => router.push('/analyze')}>Try Again</Button>
                <Button variant="secondary" onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="max-w-2xl mx-auto py-12">
          <Card className="p-12 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mb-8">
              <div className="inline-block p-4 rounded-full border-2 border-primary">
                <Zap className="text-primary" size={48} />
              </div>
            </motion.div>

            <h2 className="font-serif text-3xl font-semibold mb-2 text-ink">Analyzing Your Idea</h2>
            <p className="text-muted mb-8">Our AI is working hard to evaluate your idea...</p>

            <div className="mb-8">
              <ProgressBar value={progress} animated />
              <p className="text-sm text-muted mt-3">{Math.round(progress)}% Complete</p>
            </div>

            {/* Processing Stages */}
            <div className="space-y-3 mb-8">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-paper border border-border-soft"
                >
                  {completedStages[index] ? (
                    <CheckCircle2 className="text-success flex-shrink-0" size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-border-soft flex-shrink-0" />
                  )}
                  <span className="flex-1 text-left text-ink">{stage.title}</span>
                  <span className="text-2xl">{stage.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* Activity Feed */}
            <Card className="p-6 text-left">
              <h4 className="font-semibold mb-4 text-ink">Current Activity</h4>
              <motion.p key={activityIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-muted flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                {activities[Math.min(activityIndex, activities.length - 1)]}
              </motion.p>
            </Card>

            <p className="text-sm text-muted mt-8">Estimated completion time: 2-3 minutes</p>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-muted">Loading...</div></DashboardLayout>}>
      <ProcessingContent />
    </Suspense>
  );
}
