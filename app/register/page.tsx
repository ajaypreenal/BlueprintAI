'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { goToGoogleLogin } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold mb-2 text-ink">Start Your Journey</h1>
            <p className="text-muted">Create your BlueprintAI account</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full mb-6 flex items-center justify-center gap-2"
            onClick={goToGoogleLogin}
          >
            <GoogleIcon size={20} />
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-soft"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card-dark text-muted">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                <Input type="text" placeholder="John User" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <label className="flex items-start">
              <input type="checkbox" className="w-4 h-4 rounded border-border-soft mt-1" required />
              <span className="ml-2 text-sm text-muted">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>

            <Button type="submit" className="w-full" isLoading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-muted text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline transition font-medium">
              Sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
