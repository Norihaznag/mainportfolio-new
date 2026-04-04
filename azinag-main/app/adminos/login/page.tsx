'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      router.push('/adminos');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cartoon-bg font-sans selection:bg-cartoon-pink selection:text-black p-6">
      <div className="bg-white rounded-2xl border-4 border-black shadow-neo-lg p-8 sm:p-12 w-full max-w-md rotate-[-1deg] transition-transform hover:rotate-0 duration-300">
        <h1 className="text-4xl font-black text-center text-black mb-2 uppercase tracking-wide">Azinag Admin</h1>
        <p className="text-center text-lg font-bold text-gray-700 mb-8">Login to your admin panel</p>

        {error && (
          <div className="bg-cartoon-pink border-3 border-black text-black font-bold px-4 py-3 rounded-xl mb-6 shadow-neo-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-bold text-black mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border-3 border-black rounded-xl bg-[#FFFDF0] focus:bg-white focus:outline-none focus:shadow-neo-sm transition-all font-bold text-black"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-bold text-black mb-2 uppercase">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border-3 border-black rounded-xl bg-[#FFFDF0] focus:bg-white focus:outline-none focus:shadow-neo-sm transition-all font-bold text-black"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cartoon-yellow text-black border-3 border-black shadow-neo py-3 rounded-xl font-black text-xl hover:-translate-y-1 hover:shadow-neo-md active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide mt-4"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-10 p-5 bg-[#f5f5f7] border-3 border-black shadow-neo-sm rounded-xl text-black">
          <p className="font-black text-lg mb-2 uppercase">Demo Credentials:</p>
          <p className="font-bold">Email: admin@azinag.site</p>
          <p className="font-bold">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
