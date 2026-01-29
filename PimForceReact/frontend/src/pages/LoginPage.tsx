import * as React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { buildUrl } from "../../config";

// Validation
const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional().default(false),
});

type LoginValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await axios.post(buildUrl('/api/token/'), {
        username: values.username,
        password: values.password,
      });
      const { access, refresh } = response.data;
      if (values.remember) {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
      } else {
        sessionStorage.setItem('accessToken', access);
        sessionStorage.setItem('refreshToken', refresh);
      }
      navigate('/dashboard');
    } catch (error: any) {
      // TODO: show error to user
      if (error.response && error.response.data) {
        form.setError('username', { message: 'Invalid credentials' });
        form.setError('password', { message: 'Invalid credentials' });
      } else {
        form.setError('username', { message: 'Login failed' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-muted/20">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-2xl border bg-white shadow-sm">
            <CardContent className="p-8">
              {/* Brand */}
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-2 inline-flex items-center gap-2">
                  {/* Simple brand mark */}
                  <picture>
                    <source srcSet="/logos/pimforce-white.svg" media="(prefers-color-scheme: dark)" />
                    <img
                      src="/logos/pimforce-black.svg"
                      alt="PimForce"
                      className="h-[28px] w-auto select-none"
                      aria-label="PimForce"
                      draggable={false}
                    />
                  </picture>
                </div>
                <h1 className="text-lg font-semibold text-foreground">Sign in</h1>
              </div>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Username <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            autoComplete="username"
                            placeholder="yourusername"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password with show/hide */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              autoComplete="current-password"
                              placeholder="••••••••"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword((v) => !v)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember me */}
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0 font-normal">Remember me</FormLabel>
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="mt-2 w-full bg-[#873EFF] hover:bg-[#7a34ef]"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
