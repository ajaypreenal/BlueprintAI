'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import GoogleIcon from '@/components/icons/GoogleIcon';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { goToGoogleLogin } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
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
            <h1 className="font-serif text-3xl font-semibold mb-2 text-ink">Welcome Back</h1>
            <p className="text-muted">Sign in to your BlueprintAI account</p>
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
              <span className="px-2 bg-card-dark text-muted">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-border-soft" />
                <span className="ml-2 text-sm text-muted">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline transition">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" isLoading={loading}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-muted text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline transition font-medium">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
