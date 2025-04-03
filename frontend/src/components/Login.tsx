/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      toast.success(t('login.success'));
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.msg || t('login.failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{t('login.title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('login.username')}
            disabled={loading}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.password')}
            disabled={loading}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('login.loggingIn') : t('login.button')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;