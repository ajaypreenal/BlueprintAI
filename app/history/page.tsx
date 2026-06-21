'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { mockSessionHistory } from '@/lib/mockData';
import { formatDate, getRiskColor } from '@/lib/utils';
import { History, Search, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const industries = ['All', 'Health & Fitness', 'Food Tech', 'Food Service', 'Gaming', 'Climate Tech'];
const statuses = ['All', 'completed', 'in-progress', 'draft'];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredHistory = mockSessionHistory.filter((item) => {
    const matchesSearch = item.ideaTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === 'All' || item.industry === selectedIndustry;
    const matchesStatus =
      selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const getRiskBadge = (score: number) => {
    if (score >= 70) return 'danger';
    if (score >= 50) return 'warning';
    return 'success';
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <History className="text-primary" size={36} />
            Analysis History
          </h1>
          <p className="text-muted">
            {mockSessionHistory.length} previous analyses
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-ink">Search</label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-ink">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-paper border border-border-soft text-ink focus:outline-none focus:border-primary transition-all"
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-ink">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-paper border border-border-soft text-ink focus:outline-none focus:border-primary transition-all"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'All' ? 'All' : status.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Analysis Cards */}
        <div className="space-y-4">
          {filteredHistory.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hoverable className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 truncate text-ink">
                      {session.ideaTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">{session.industry}</Badge>
                      <Badge
                        variant={
                          session.status === 'completed'
                            ? 'success'
                            : session.status === 'in-progress'
                            ? 'warning'
                            : 'neutral'
                        }
                      >
                        {session.status}
                      </Badge>
                      <span className="text-sm text-muted">
                        {formatDate(session.date)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted">Risk Score</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl font-semibold text-ink">
                          {session.riskScore}
                        </span>
                        <Badge variant={getRiskBadge(session.riskScore)}>
                          /100
                        </Badge>
                      </div>
                    </div>
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        View <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted mb-4">
              No analyses found matching your filters
            </p>
            <Link href="/analyze">
              <Button>Start New Analysis</Button>
            </Link>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
