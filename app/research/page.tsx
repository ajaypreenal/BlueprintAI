'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { researchFindings } from '@/lib/mockData';
import { Search, TrendingUp, Zap } from 'lucide-react';

export default function ResearchPage() {
  const competitionItems = researchFindings.competition.map((finding, i) => ({
    title: finding.title,
    content: (
      <div>
        <p className="mb-3">{finding.content}</p>
        <div className="flex gap-2 flex-wrap">
          {finding.evidence.map((ev, i) => (
            <Badge key={i} variant="info">
              {ev}
            </Badge>
          ))}
        </div>
      </div>
    ),
    defaultOpen: i === 0,
  }));

  const marketItems = researchFindings.market.map((finding, i) => ({
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

  const vcItems = researchFindings.vc.map((finding, i) => ({
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
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Search className="text-secondary" size={36} />
            Research Evidence
          </h1>
          <p className="text-slate-400">Detailed findings from our AI analysis</p>
        </div>

        {/* Competition Findings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="p-6 mb-4 bg-gradient-to-r from-danger/10 to-danger/5 border-danger/20">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="text-danger flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold">Competition Analysis</h3>
                <p className="text-sm text-slate-400">3 direct competitors identified</p>
              </div>
            </div>
            <Accordion items={competitionItems} />
          </Card>
        </motion.div>

        {/* Market Demand Findings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <Card className="p-6 mb-4 bg-gradient-to-r from-success/10 to-success/5 border-success/20">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="text-success flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold">Market Demand Validation</h3>
                <p className="text-sm text-slate-400">Strong demand signals detected</p>
              </div>
            </div>
            <Accordion items={marketItems} />
          </Card>
        </motion.div>

        {/* VC Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <Card className="p-6 mb-4 bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="text-secondary flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold">VC Evaluation</h3>
                <p className="text-sm text-slate-400">Investment perspective analysis</p>
              </div>
            </div>
            <Accordion items={vcItems} />
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
