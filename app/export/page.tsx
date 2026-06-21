'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Download, FileText, Share2 } from 'lucide-react';

export default function ExportPage() {
  const handlePDFExport = () => {
    alert('PDF export functionality would be implemented with a library like html2pdf or similar');
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FileText className="text-secondary" size={36} />
            Export Report
          </h1>
          <p className="text-slate-400">Download your comprehensive analysis as PDF</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Report Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
              <h2 className="text-2xl font-bold mb-6">Startup Idea Validation Report</h2>

              <div className="space-y-6 text-slate-300">
                <section>
                  <h3 className="font-semibold text-lg mb-2">Idea Summary</h3>
                  <p className="text-slate-400">
                    AI-powered fitness coaching app for remote workers with real-time form correction and personalized workout plans.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">Key Metrics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-900/50">
                      <p className="text-sm text-slate-400">Overall Risk Score</p>
                      <p className="text-3xl font-bold">72/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900/50">
                      <p className="text-sm text-slate-400">Market Demand</p>
                      <p className="text-3xl font-bold">58/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900/50">
                      <p className="text-sm text-slate-400">Execution Risk</p>
                      <p className="text-3xl font-bold">72/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900/50">
                      <p className="text-sm text-slate-400">VC Score</p>
                      <p className="text-3xl font-bold">78/100</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">Includes</h3>
                  <ul className="space-y-2">
                    <li>✓ Comprehensive Risk Analysis</li>
                    <li>✓ Competitive Landscape</li>
                    <li>✓ Market Research Findings</li>
                    <li>✓ VC Investment Evaluation</li>
                    <li>✓ 90-Day Roadmap</li>
                    <li>✓ Assumption Validation Plan</li>
                    <li>✓ Charts & Visualizations</li>
                    <li>✓ Pivot Recommendations</li>
                  </ul>
                </section>
              </div>
            </Card>
          </motion.div>

          {/* Export Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Export Options</h3>

              <div className="space-y-4">
                <button
                  onClick={handlePDFExport}
                  className="w-full p-6 rounded-lg border border-slate-700 hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Download size={20} className="text-secondary" />
                        Download as PDF
                      </h4>
                      <p className="text-sm text-slate-400">
                        Complete report with charts, analysis, and recommendations. Ready to share with investors or your team.
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Download
                    </Button>
                  </div>
                </button>

                <button className="w-full p-6 rounded-lg border border-slate-700 hover:border-primary hover:bg-primary/5 transition-all text-left">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Share2 size={20} className="text-secondary" />
                        Generate Shareable Link
                      </h4>
                      <p className="text-sm text-slate-400">
                        Create a read-only link to share with stakeholders. No sign-in required.
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Generate
                    </Button>
                  </div>
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-8 border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
              <h3 className="font-semibold mb-4"> Pro Tips</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  • Share the PDF with potential investors to demonstrate thorough validation
                </li>
                <li>
                  • Use the charts in pitch decks and presentations
                </li>
                <li>
                  • Update your report weekly as you learn new information
                </li>
                <li>
                  • Share the roadmap with your team to align on next steps
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
