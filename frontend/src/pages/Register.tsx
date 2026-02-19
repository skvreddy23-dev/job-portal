import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../services/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name is required'),
  role: z.enum(['seeker', 'recruiter']),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'seeker' },
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/register', data);
      const { token, user } = res.data;

      login(token, user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
  
      {/* LEFT SIDE - Branding (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white items-center justify-center p-16">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Join Us Today.
          </h1>
          <p className="text-lg text-indigo-100">
            Create your account and start connecting with opportunities
            that move your career forward.
          </p>
        </div>
      </div>
  
      {/* RIGHT SIDE - FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-10">
  
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="text-gray-500">
              Fill in your details to get started
            </p>
          </div>
  
          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
  
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register('name')}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
  
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
  
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
  
            {/* Role Selection - Improved UI */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                I am registering as
              </label>
  
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="seeker"
                    {...register('role')}
                    className="hidden peer"
                  />
                  <div className="border rounded-lg p-4 text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-50 transition">
                    <p className="font-medium text-gray-800">Job Seeker</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Looking for jobs
                    </p>
                  </div>
                </label>
  
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="recruiter"
                    {...register('role')}
                    className="hidden peer"
                  />
                  <div className="border rounded-lg p-4 text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-50 transition">
                    <p className="font-medium text-gray-800">Recruiter</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Hiring candidates
                    </p>
                  </div>
                </label>
              </div>
  
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>
  
            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
  
          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
  
        </div>
      </div>
    </div>
  );
  
}