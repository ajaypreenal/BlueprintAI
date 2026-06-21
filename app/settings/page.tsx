'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John User',
    email: 'john@example.com',
    company: 'My Project',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyDigest: true,
    darkMode: true,
  });

  const handleProfileUpdate = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePreferenceChange = (field: keyof typeof preferences) => {
    setPreferences({ ...preferences, [field]: !preferences[field] });
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold mb-2 flex items-center gap-3 text-ink">
            <Settings className="text-primary" size={36} />
            Settings
          </h1>
          <p className="text-muted">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl space-y-8">
          {/* Profile Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink">Profile</h2>
                  <p className="text-sm text-muted">Update your personal information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-ink">Full Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-ink">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-ink">Company/Project</label>
                  <Input
                    value={profile.company}
                    onChange={(e) => handleProfileUpdate('company', e.target.value)}
                  />
                </div>

                <Button className="w-full">Save Changes</Button>
              </div>
            </Card>
          </motion.div>

          {/* Preferences Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Bell className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink">Preferences</h2>
                  <p className="text-sm text-muted">Customize your experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-paper border border-border-soft">
                  <div>
                    <p className="font-semibold text-ink">Email Notifications</p>
                    <p className="text-sm text-muted">Get updates about your analysis</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('emailNotifications')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.emailNotifications
                        ? 'bg-success'
                        : 'bg-border-soft'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-paper transition-transform ${
                        preferences.emailNotifications
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-paper border border-border-soft">
                  <div>
                    <p className="font-semibold text-ink">Weekly Digest</p>
                    <p className="text-sm text-muted">Receive a weekly summary</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('weeklyDigest')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.weeklyDigest ? 'bg-success' : 'bg-border-soft'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-paper transition-transform ${
                        preferences.weeklyDigest
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-paper border border-border-soft">
                  <div>
                    <p className="font-semibold text-ink">Theme</p>
                    <p className="text-sm text-muted">Ink &amp; Paper (always enabled)</p>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Shield className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink">Account</h2>
                  <p className="text-sm text-muted">Manage your account security</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-paper border border-border-soft">
                  <p className="font-semibold mb-1 text-ink">Password</p>
                  <p className="text-sm text-muted mb-4">Change your password</p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-paper border border-border-soft">
                  <p className="font-semibold mb-1 text-ink">Two-Factor Authentication</p>
                  <p className="text-sm text-muted mb-4">
                    Add an extra layer of security
                  </p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-danger/10 border border-danger/20">
                  <p className="font-semibold text-danger mb-1">Sign Out</p>
                  <p className="text-sm text-muted mb-4">
                    Sign out from all devices
                  </p>
                  <Button variant="danger" size="sm" className="flex items-center gap-2">
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
