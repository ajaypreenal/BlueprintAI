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
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <FileText className="text-primary" size={36} />
            Export Report
          </h1>
          <p className="text-muted">Download your comprehensive analysis as PDF</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Report Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6 text-ink">Idea Validation Report</h2>

              <div className="space-y-6 text-ink">
                <section>
                  <h3 className="font-semibold text-lg mb-2">Idea Summary</h3>
                  <p className="text-muted">
                    AI-powered fitness coaching app for remote workers with real-time form correction and personalized workout plans.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg mb-2">Key Metrics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-paper border border-border-soft">
                      <p className="text-sm text-muted">Overall Risk Score</p>
                      <p className="font-serif text-3xl font-semibold text-ink">72/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-paper border border-border-soft">
                      <p className="text-sm text-muted">Market Demand</p>
                      <p className="font-serif text-3xl font-semibold text-ink">58/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-paper border border-border-soft">
                      <p className="text-sm text-muted">Execution Risk</p>
                      <p className="font-serif text-3xl font-semibold text-ink">72/100</p>
                    </div>
                    <div className="p-4 rounded-lg bg-paper border border-border-soft">
                      <p className="text-sm text-muted">Willingness to Pay</p>
                      <p className="font-serif text-3xl font-semibold text-ink">78/100</p>
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
              <h3 className="text-xl font-semibold mb-6 text-ink">Export Options</h3>

              <div className="space-y-4">
                <button
                  onClick={handlePDFExport}
                  className="w-full p-6 rounded-lg border border-border-soft hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-ink">
                        <Download size={20} className="text-primary" />
                        Download as PDF
                      </h4>
                      <p className="text-sm text-muted">
                        Complete report with charts, analysis, and recommendations. Ready to share with investors, mentors, or collaborators.
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Download
                    </Button>
                  </div>
                </button>

                <button className="w-full p-6 rounded-lg border border-border-soft hover:border-primary hover:bg-primary/5 transition-all text-left">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-ink">
                        <Share2 size={20} className="text-primary" />
                        Generate Shareable Link
                      </h4>
                      <p className="text-sm text-muted">
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
            <Card className="p-8">
              <h3 className="font-semibold mb-4 text-ink">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  • Share the PDF with mentors, advisors, or potential investors to demonstrate thorough validation
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
