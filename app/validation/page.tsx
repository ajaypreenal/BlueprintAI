'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { mockAssumptions } from '@/lib/mockData';
import { calculateCompletionStats } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ValidationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [assumptions, setAssumptions] = useState<any[]>(mockAssumptions);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.assumptions && data.assumptions.length > 0) {
            const parsed = data.assumptions.map((a: any, i: number) => ({
              id: `asm-${i}`,
              assumption: a.claim,
              duration: a.time_required,
              experiment: a.validation_method,
              completed: false,
              notes: ''
            }));
            setAssumptions(parsed);
          }
        })
        .catch(console.error);
    }
  }, [sessionId]);

  const stats = calculateCompletionStats(assumptions);

  const toggleAssumption = (id: string) => {
    setAssumptions(
      assumptions.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const AssumptionCard = ({ assumption, index }: { assumption: typeof assumptions[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={`p-6 cursor-pointer transition-all ${
          assumption.completed
            ? 'bg-success/10 border-success/20'
            : 'hover:border-slate-500'
        }`}
        onClick={() => toggleAssumption(assumption.id)}
      >
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleAssumption(assumption.id);
            }}
            className="flex-shrink-0 mt-1"
          >
            {assumption.completed ? (
              <CheckCircle2 className="text-success" size={24} />
            ) : (
              <Circle className="text-slate-500 hover:text-slate-400" size={24} />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4
                className={`font-semibold ${
                  assumption.completed ? 'line-through text-slate-500' : ''
                }`}
              >
                {assumption.assumption}
              </h4>
              <Badge variant={assumption.completed ? 'success' : 'warning'}>
                {assumption.duration}
              </Badge>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Validation Experiment</p>
                <p className="text-sm text-slate-300">{assumption.experiment}</p>
              </div>

              {assumption.notes && (
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Notes</p>
                  <p className="text-sm text-slate-300">{assumption.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Assumption Validation</h1>
          <p className="text-slate-400">Your prioritized list of assumptions to validate before scaling</p>
        </div>

        {/* Progress Summary */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-2">Total Assumptions</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-2">Validated</p>
              <p className="text-3xl font-bold text-success">{stats.completed}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-2">Remaining</p>
              <p className="text-3xl font-bold text-warning">
                {stats.total - stats.completed}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar value={stats.completed} max={stats.total || 1} showLabel={true} />
          </div>
        </Card>

        {/* Assumption Cards */}
        <div className="space-y-4">
          {assumptions.map((assumption, index) => (
            <AssumptionCard
              key={assumption.id}
              assumption={assumption}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {stats.percentage === 100 && stats.total > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-4 rounded-full bg-success/20 mb-4">
              <CheckCircle2 className="text-success" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">All Assumptions Validated!</h3>
            <p className="text-slate-400 mb-6">
              You&apos;re ready to build and scale with confidence.
            </p>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default function ValidationPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-slate-400">Loading Assumptions...</div></DashboardLayout>}>
      <ValidationContent />
    </Suspense>
  );
}
