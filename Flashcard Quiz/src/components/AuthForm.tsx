import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  isSignUp?: boolean;
  onSuccess?: () => void;
}

export default function AuthForm({ isSignUp = true, onSuccess }: AuthFormProps) {
  const { signup, login, resendVerificationEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setVerificationEmailSent(false);
    setNeedsVerification(false);

    try {
      if (isSignUp) {
        await signup(email, password);
        setVerificationEmailSent(true);
      } else {
        await login(email, password);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      setError(err.message);
      if (err.message === 'Please verify your email before logging in') {
        setNeedsVerification(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
      setVerificationEmailSent(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-500">{error}</p>
            {needsVerification && (
              <button
                type="button"
                onClick={handleResendVerification}
                className="text-blue-400 hover:text-blue-300 text-sm mt-2"
              >
                Resend verification email
              </button>
            )}
          </div>
        </div>
      )}

      {verificationEmailSent && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-500">
          Verification email sent! Please check your inbox and verify your email before logging in.
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-primary pl-10"
            placeholder="Enter your email"
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-primary pl-10 pr-10"
            placeholder="Enter your password"
            required
            minLength={6}
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || verificationEmailSent}
        className={`btn-primary w-full ${(loading || verificationEmailSent) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            <span>Please wait...</span>
          </div>
        ) : (
          isSignUp ? 'Sign Up' : 'Log In'
        )}
      </button>
    </form>
  );
}