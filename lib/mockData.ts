import { SessionHistory, RoadmapMilestone, AssumptionValidation } from '@/types';

export const mockSessionHistory: SessionHistory[] = [
  {
    id: '1',
    ideaTitle: 'AI-powered fitness coaching app for remote workers',
    date: new Date('2024-01-15'),
    riskScore: 72,
    status: 'completed',
    industry: 'Health & Fitness',
  },
  {
    id: '2',
    ideaTitle: 'Personalized meal planning AI assistant',
    date: new Date('2024-01-10'),
    riskScore: 45,
    status: 'completed',
    industry: 'Food Tech',
  },
  {
    id: '3',
    ideaTitle: 'B2B SaaS for restaurant inventory management',
    date: new Date('2024-01-08'),
    riskScore: 38,
    status: 'completed',
    industry: 'Food Service',
  },
  {
    id: '4',
    ideaTitle: 'Web3 gaming platform for indie developers',
    date: new Date('2024-01-05'),
    riskScore: 85,
    status: 'completed',
    industry: 'Gaming',
  },
  {
    id: '5',
    ideaTitle: 'Climate tech carbon tracking app',
    date: new Date('2024-01-01'),
    riskScore: 52,
    status: 'in-progress',
    industry: 'Climate Tech',
  },
];

export const mockRoadmapMilestones: RoadmapMilestone[] = [
  // Week 1
  {
    id: '1',
    week: 1,
    day: 1,
    title: 'Define core value proposition',
    description: 'Create a clear 1-minute pitch of your solution',
    completed: true,
    priority: 'high',
  },
  {
    id: '2',
    week: 1,
    day: 2,
    title: 'Identify 20 target customers',
    description: 'Make a list of specific people/companies that fit your ICP',
    completed: true,
    priority: 'high',
  },
  {
    id: '3',
    week: 1,
    day: 3,
    title: 'Schedule 5 customer interviews',
    description: 'Reach out and book conversations with your target market',
    completed: false,
    priority: 'high',
  },
  {
    id: '4',
    week: 1,
    day: 4,
    title: 'Conduct first customer conversation',
    description: 'Learn about their pain points and validate assumptions',
    completed: false,
    priority: 'high',
  },
  {
    id: '5',
    week: 1,
    day: 5,
    title: 'Document key learnings',
    description: 'Summarize what you learned from initial research',
    completed: false,
    priority: 'medium',
  },
  // 30 Day Milestones
  {
    id: '6',
    week: 4,
    title: '30-Day: Complete 10+ customer interviews',
    description: 'Deep understanding of market needs',
    completed: false,
    priority: 'high',
  },
  {
    id: '7',
    week: 4,
    title: '30-Day: Create product wireframes',
    description: 'Visual representation of MVP features',
    completed: false,
    priority: 'high',
  },
  {
    id: '8',
    week: 4,
    title: '30-Day: Build landing page',
    description: 'Simple page to test messaging and collect signups',
    completed: false,
    priority: 'medium',
  },
  // 60 Day Milestones
  {
    id: '9',
    week: 8,
    title: '60-Day: Launch MVP prototype',
    description: 'Functional prototype for early users',
    completed: false,
    priority: 'high',
  },
  {
    id: '10',
    week: 8,
    title: '60-Day: Get first 10 paying customers',
    description: 'Validate monetization strategy',
    completed: false,
    priority: 'high',
  },
  // 90 Day Milestones
  {
    id: '11',
    week: 12,
    title: '90-Day: 50+ active users',
    description: 'Significant user base and traction',
    completed: false,
    priority: 'high',
  },
  {
    id: '12',
    week: 12,
    title: '90-Day: $5K MRR target',
    description: 'Monthly recurring revenue goal',
    completed: false,
    priority: 'high',
  },
];

export const mockAssumptions: AssumptionValidation[] = [
  {
    id: '1',
    assumption: 'People will pay for this solution',
    experiment: 'Interview 10 potential customers about pricing willingness',
    duration: '48 hours',
    completed: true,
    notes: '8 out of 10 indicated willingness to pay $50+/month',
  },
  {
    id: '2',
    assumption: 'Target audience actively searches for this solution',
    experiment: 'Analyze Google trends and Reddit discussions',
    duration: '24 hours',
    completed: true,
    notes: 'Found 500+ monthly searches and active community discussions',
  },
  {
    id: '3',
    assumption: 'Market is currently underserved',
    experiment: 'Competitive analysis of top 5 competitors',
    duration: '3 days',
    completed: false,
    notes: 'In progress...',
  },
  {
    id: '4',
    assumption: 'Can acquire customers for <$30',
    experiment: 'Test 3 acquisition channels with $500 budget',
    duration: '1 week',
    completed: false,
    notes: 'Not started',
  },
  {
    id: '5',
    assumption: 'Product-market fit achievable in 6 months',
    experiment: 'Build and iterate MVP with feedback loop',
    duration: '6 months',
    completed: false,
    notes: 'Not started',
  },
];

export const competitorData = [
  {
    name: 'Competitor A',
    features: 8,
    userBase: 50000,
    fundingRaised: 5000000,
    marketShare: 35,
  },
  {
    name: 'Competitor B',
    features: 6,
    userBase: 30000,
    fundingRaised: 2000000,
    marketShare: 20,
  },
  {
    name: 'Your Solution',
    features: 12,
    userBase: 0,
    fundingRaised: 0,
    marketShare: 0,
  },
  {
    name: 'Emerging Player',
    features: 5,
    userBase: 10000,
    fundingRaised: 500000,
    marketShare: 8,
  },
];

export const riskBreakdownData = [
  { name: 'Competition Risk', value: 28, fill: '#EF4444' },
  { name: 'Market Demand', value: 22, fill: '#F59E0B' },
  { name: 'Execution Risk', value: 35, fill: '#06B6D4' },
  { name: 'Willingness to Pay', value: 15, fill: '#22C55E' },
];

export const researchFindings = {
  competition: [
    {
      id: '1',
      title: 'Top 3 Competitors Identified',
      content: 'Found 3 direct competitors with $50M+ combined funding',
      evidence: ['Crunchbase', 'Pitchbook', 'Company websites'],
    },
    {
      id: '2',
      title: 'Market Positioning Gap',
      content: 'Competitors focused on enterprise, opportunity in SMB segment',
      evidence: ['Competitor analysis', 'Customer interviews'],
    },
    {
      id: '3',
      title: 'Feature Parity Possible',
      content: 'Your solution can match core features in 6 months',
      evidence: ['Tech stack analysis', 'Developer resources'],
    },
  ],
  market: [
    {
      id: '1',
      title: 'Strong Market Demand Signal',
      content: '500+ monthly searches, 2K+ Reddit discussions',
      evidence: ['Google Trends', 'Reddit', 'ProductHunt'],
    },
    {
      id: '2',
      title: 'Price Sensitivity Low',
      content: '75% of interviewed users willing to pay $50+/month',
      evidence: ['Customer interviews', 'Survey results'],
    },
    {
      id: '3',
      title: 'TAM of $2.5B annually',
      content: 'Large addressable market with room for multiple players',
      evidence: ['Market research', 'Beachhead analysis'],
    },
  ],
  vc: [
    {
      id: '1',
      title: 'Monetization Path Clear',
      content: 'SaaS model with strong unit economics',
      evidence: ['Pricing analysis', 'Comparable companies'],
    },
    {
      id: '2',
      title: 'Defensibility Through Network Effects',
      content: 'Can build platform stickiness and switching costs',
      evidence: ['Product strategy', 'Growth analysis'],
    },
    {
      id: '3',
      title: 'Retention Risk: Churn management critical',
      content: 'Need strong onboarding and engagement strategy',
      evidence: ['Industry benchmarks', 'Competitor analysis'],
    },
  ],
};
