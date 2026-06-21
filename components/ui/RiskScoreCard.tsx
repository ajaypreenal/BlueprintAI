'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from './Card';
import { getRiskColor, getRiskLevel } from '@/lib/utils';

interface RiskScoreCardProps {
  score: number;
  title: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export function RiskScoreCard({
  score,
  title,
  description,
  trend = 'stable',
}: RiskScoreCardProps) {
  const color = getRiskColor(score);
  const level = getRiskLevel(score);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
        {trend === 'up' && <TrendingUp size={20} className="text-danger" />}
        {trend === 'down' && <TrendingDown size={20} className="text-success" />}
      </div>

      <div className="flex items-end gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="relative"
        >
          <div className="relative w-20 h-20 rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: color }}>
            <div className="absolute inset-0 rounded-full opacity-10" style={{ backgroundColor: color }} />
            <span className="text-2xl font-bold text-white">{score}</span>
          </div>
        </motion.div>

        <div className="flex-1">
          <p className="text-sm font-medium text-white mb-2">{level}</p>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
