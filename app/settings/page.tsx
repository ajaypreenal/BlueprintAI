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
    company: 'MyStartup Inc',
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
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Settings className="text-secondary" size={36} />
            Settings
          </h1>
          <p className="text-slate-400">Manage your account and preferences</p>
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
                  <h2 className="text-xl font-semibold">Profile</h2>
                  <p className="text-sm text-slate-400">Update your personal information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Company/Startup</label>
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
                <div className="p-3 rounded-lg bg-secondary/20">
                  <Bell className="text-secondary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Preferences</h2>
                  <p className="text-sm text-slate-400">Customize your experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm text-slate-400">Get updates about your analysis</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('emailNotifications')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.emailNotifications
                        ? 'bg-success'
                        : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        preferences.emailNotifications
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div>
                    <p className="font-semibold">Weekly Digest</p>
                    <p className="text-sm text-slate-400">Receive a weekly summary</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('weeklyDigest')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.weeklyDigest ? 'bg-success' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        preferences.weeklyDigest
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div>
                    <p className="font-semibold">Dark Mode</p>
                    <p className="text-sm text-slate-400">Always enabled</p>
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
                <div className="p-3 rounded-lg bg-danger/20">
                  <Shield className="text-danger" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Account</h2>
                  <p className="text-sm text-slate-400">Manage your account security</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="font-semibold mb-1">Password</p>
                  <p className="text-sm text-slate-400 mb-4">Change your password</p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="font-semibold mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-400 mb-4">
                    Add an extra layer of security
                  </p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-danger/10 border border-danger/20">
                  <p className="font-semibold text-danger mb-1">Sign Out</p>
                  <p className="text-sm text-slate-400 mb-4">
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
