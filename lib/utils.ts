export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getRiskColor = (score: number): string => {
  if (score >= 70) return '#EF4444'; // Danger - High Risk
  if (score >= 50) return '#F59E0B'; // Warning - Moderate Risk
  return '#22C55E'; // Success - Low Risk
};

export const getRiskLevel = (score: number): string => {
  if (score >= 70) return 'High Risk';
  if (score >= 50) return 'Moderate Risk';
  return 'Low Risk';
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getProgressPercentage = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};

export const calculateCompletionStats = (items: { completed: boolean }[]): { completed: number; total: number; percentage: number } => {
  const total = items.length;
  const completed = items.filter((item) => item.completed).length;
  return { completed, total, percentage: getProgressPercentage(completed, total) };
};
