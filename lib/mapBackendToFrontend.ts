export function mapBackendToFrontend(raw: any) {
  const sc = raw.scorecard || {};
  const er = raw.execution_risk || {};

  return {
    risk_score: {
      competition: sc.competition_score || 0,
      market: sc.market_score || 0,
      execution: er.execution_risk_score || 0,
      assumption: sc.willingness_to_pay_score || 0,
    },
    assumptions: (raw.assumption_checklist?.assumptions || []).map((a: any) => ({
      claim: a.assumption,
      validation_method: a.experiment,
      time_required: '48 hours',
    })),
    roadmap: {
      headline: raw.roadmap?.headline || '',
      week_1_action: raw.roadmap?.week_1?.action || '',
      week_1_rationale: raw.roadmap?.week_1?.rationale || '',
      milestones_30_day: raw.roadmap?.milestones?.['30_day'] || [],
      milestones_60_day: raw.roadmap?.milestones?.['60_day'] || [],
      milestones_90_day: raw.roadmap?.milestones?.['90_day'] || [],
      top_risk: raw.roadmap?.top_risk || null,
      based_on_pivot: raw.roadmap?.based_on_pivot || false,
      top_assumptions: raw.roadmap?.top_assumptions || [],
      disclaimer: raw.roadmap?.disclaimer || '',
    },
    pivot: raw.pivot_suggestion || {},
    competitors: raw.competitors || [],
    pain_points: raw.pain_points || [],
    idea_cleaned: raw.idea_cleaned || {},
    scorecard: sc,
    execution_risk: er,
    evidence_confidence: raw.evidence_confidence || {},
    geographic_bias: raw.geographic_bias || {},
    score_explainability: raw.score_explainability || {},
    original_data: raw, // Keep for other uses
  };
}
