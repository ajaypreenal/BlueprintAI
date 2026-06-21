'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/Badge';
import { CheckCircle2, Zap } from 'lucide-react';

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

  useEffect(() => {
    if (!sessionId) {
      setTimeout(() => router.push('/dashboard'), 1500);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}`);
        const data = await res.json();
        
        if (data.status === 'completed') {
          clearInterval(interval);
          setProgress(100);
          setCompletedStages(stages.map(() => true));
          setTimeout(() => router.push(`/dashboard?session_id=${sessionId}`), 1000);
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

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="max-w-2xl mx-auto py-12">
          <Card className="p-12 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mb-8">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
                <Zap className="text-secondary" size={48} />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold mb-2">Analyzing Your Idea</h2>
            <p className="text-slate-400 mb-8">Our AI is working hard to evaluate your startup idea...</p>

            <div className="mb-8">
              <ProgressBar value={progress} animated />
              <p className="text-sm text-slate-400 mt-3">{Math.round(progress)}% Complete</p>
            </div>

            {/* Processing Stages */}
            <div className="space-y-3 mb-8">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700"
                >
                  {completedStages[index] ? (
                    <CheckCircle2 className="text-success flex-shrink-0" size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex-shrink-0" />
                  )}
                  <span className="flex-1 text-left">{stage.title}</span>
                  <span className="text-2xl">{stage.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* Activity Feed */}
            <Card glass className="p-6 text-left">
              <h4 className="font-semibold mb-4 text-slate-300">Current Activity</h4>
              <motion.p key={activityIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-slate-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {activities[Math.min(activityIndex, activities.length - 1)]}
              </motion.p>
            </Card>

            <p className="text-sm text-slate-500 mt-8">Estimated completion time: 2-3 minutes</p>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-slate-400">Loading...</div></DashboardLayout>}>
      <ProcessingContent />
    </Suspense>
  );
}
