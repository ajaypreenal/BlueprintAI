'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Badge, ProgressBar } from '@/components/ui/Badge';
import { mockRoadmapMilestones } from '@/lib/mockData';
import { calculateCompletionStats } from '@/lib/utils';
import { fetchSession } from '@/lib/fetchSession';
import { Map, CheckCircle2, AlertCircle } from 'lucide-react';
import type { RoadmapMilestone } from '@/types';

function RoadmapCard({
  milestone,
  index,
  totalCount,
}: {
  milestone: RoadmapMilestone;
  index: number;
  totalCount: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
            milestone.completed ? 'bg-success/20 text-success' : 'bg-border-soft text-muted'
          }`}
        >
          {milestone.completed ? <CheckCircle2 size={24} /> : <span>{index + 1}</span>}
        </div>
        {index < totalCount - 1 && (
          <div className="w-px h-12 bg-border-soft my-2" />
        )}
      </div>
      <Card className={`flex-1 p-4 ${milestone.completed ? 'bg-success/10 border-success/20' : ''}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold flex items-center gap-2 text-ink">
              {milestone.title}
              {milestone.priority === 'high' && <Badge variant="danger">High Priority</Badge>}
            </h4>
            <p className="text-sm text-muted mt-1">{milestone.description}</p>
          </div>
          {milestone.completed && <CheckCircle2 className="text-success flex-shrink-0" size={24} />}
        </div>
      </Card>
    </motion.div>
  );
}

function MilestoneGroup({
  title,
  icon,
  milestones,
  week,
  expandedWeek,
  setExpandedWeek,
}: {
  title: string;
  icon: string;
  milestones: RoadmapMilestone[];
  week: number;
  expandedWeek: number | null;
  setExpandedWeek: (week: number | null) => void;
}) {
  const stats = calculateCompletionStats(milestones);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <Card className="p-6 mb-6">
        <button
          onClick={() => setExpandedWeek(expandedWeek === week ? null : week)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">{icon}</div>
            <div className="text-left">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-ink">
                {title}
                <Badge variant={stats.percentage === 100 ? 'success' : 'info'}>{stats.percentage}%</Badge>
              </h3>
              <p className="text-sm text-muted">
                {stats.completed} of {stats.total} completed
              </p>
            </div>
          </div>
        </button>

        {expandedWeek !== week && (
          <div className="mt-4 pt-4 border-t border-border-soft">
            <ProgressBar value={stats.completed} max={stats.total} showLabel={true} />
          </div>
        )}
      </Card>

      {expandedWeek === week && (
        <div className="space-y-4 ml-4 border-l-2 border-primary/30 pl-4">
          {milestones.map((milestone, index) => (
            <RoadmapCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              totalCount={milestones.length}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function RoadmapContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(mockRoadmapMilestones);
  const [headline, setHeadline] = useState<string>('Your step-by-step action plan to validate and launch');
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [topAssumptions, setTopAssumptions] = useState<any[]>([]);
  const [basedOnPivot, setBasedOnPivot] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId)
        .then(data => {
          if (data.roadmap) {
            setHeadline(data.roadmap.headline);
            setDisclaimer(data.roadmap.disclaimer || '');
            setTopAssumptions(data.roadmap.top_assumptions || []);
            setBasedOnPivot(!!data.roadmap.based_on_pivot);
            const parsed: RoadmapMilestone[] = [];
            if (data.roadmap.week_1_action) {
              parsed.push({
                id: 'w1', title: 'Immediate Action', description: data.roadmap.week_1_action, week: 1, completed: false, priority: 'high'
              });
            }
            try {
              const parseJSONSafe = (val: any) => typeof val === 'string' ? JSON.parse(val) : val;
              const m30 = parseJSONSafe(data.roadmap.milestones_30_day);
              const m60 = parseJSONSafe(data.roadmap.milestones_60_day);
              const m90 = parseJSONSafe(data.roadmap.milestones_90_day);
              
              (m30 || []).forEach((m: string, i: number) => {
                parsed.push({ id: `m30-${i}`, title: `Day 30 Objective ${i+1}`, description: m, week: 4, completed: false, priority: 'medium' });
              });
              (m60 || []).forEach((m: string, i: number) => {
                parsed.push({ id: `m60-${i}`, title: `Day 60 Objective ${i+1}`, description: m, week: 8, completed: false, priority: 'medium' });
              });
              (m90 || []).forEach((m: string, i: number) => {
                parsed.push({ id: `m90-${i}`, title: `Day 90 Target ${i+1}`, description: m, week: 12, completed: false, priority: 'low' });
              });
              
              if (parsed.length > 0) setMilestones(parsed);
            } catch (e) {
              console.error('Error parsing roadmap json', e);
            }
          }
        })
        .catch(console.error);
    }
  }, [sessionId]);

  const week1Tasks = milestones.filter((m) => m.week === 1);
  const month30 = milestones.filter((m) => m.week === 4);
  const month60 = milestones.filter((m) => m.week === 8);
  const month90 = milestones.filter((m) => m.week === 12);

  const allStats = calculateCompletionStats(milestones);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <Map className="text-primary" size={36} />
            Personalized Roadmap
          </h1>
          <p className="text-muted">{headline}</p>
          {basedOnPivot && (
            <Badge variant="info" className="mt-2">Based on the suggested pivot, not the original idea</Badge>
          )}
        </div>

        {/* Overall Progress */}
        <Card className="p-8 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-ink">Overall Progress</h3>
            <ProgressBar value={allStats.completed} max={allStats.total || 1} />
            <p className="text-sm text-muted mt-3">
              {allStats.completed} of {allStats.total} tasks completed ({allStats.percentage}%)
            </p>
          </div>
        </Card>

        {week1Tasks.length > 0 && (
          <MilestoneGroup
            title="Week 1: Foundation"
            icon=""
            milestones={week1Tasks}
            week={1}
            expandedWeek={expandedWeek}
            setExpandedWeek={setExpandedWeek}
          />
        )}

        {month30.length > 0 && (
          <MilestoneGroup
            title="30-Day Milestone"
            icon=""
            milestones={month30}
            week={4}
            expandedWeek={expandedWeek}
            setExpandedWeek={setExpandedWeek}
          />
        )}

        {month60.length > 0 && (
          <MilestoneGroup
            title="60-Day Milestone"
            icon=""
            milestones={month60}
            week={8}
            expandedWeek={expandedWeek}
            setExpandedWeek={setExpandedWeek}
          />
        )}

        {month90.length > 0 && (
          <MilestoneGroup
            title="90-Day Target"
            icon=""
            milestones={month90}
            week={12}
            expandedWeek={expandedWeek}
            setExpandedWeek={setExpandedWeek}
          />
        )}

        {/* Top Assumptions to Validate */}
        {topAssumptions.length > 0 && (
          <Card className="p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-ink">Top Assumptions to Validate First</h3>
            <ul className="space-y-3">
              {topAssumptions.map((a: any, i: number) => (
                <li key={i} className="text-sm">
                  <span className="font-medium text-ink">{a.assumption}</span>
                  {a.experiment && <p className="text-muted mt-1">{a.experiment}</p>}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Tips Card */}
        <Card className="p-8 mb-8">
          <div className="flex gap-4">
            <AlertCircle className="text-primary flex-shrink-0" size={24} />
            <div>
              <h4 className="font-semibold mb-2 text-ink">Pro Tips</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Review and update this roadmap weekly with your learnings</li>
                <li>• Share with other users and advisors for accountability</li>
                <li>• Focus on customer interviews and validation over building</li>
                <li>• Iterate quickly based on feedback</li>
              </ul>
            </div>
          </div>
        </Card>

        {disclaimer && (
          <p className="text-center text-sm text-muted italic">{disclaimer}</p>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<DashboardLayout><div className="p-12 text-center text-muted">Loading Roadmap...</div></DashboardLayout>}>
      <RoadmapContent />
    </Suspense>
  );
}
