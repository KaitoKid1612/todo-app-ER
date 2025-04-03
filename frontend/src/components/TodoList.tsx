/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Loader2, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  userId?: string;
  createdAt?: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const fetchTodos = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Todo[]>('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTodos(response.data);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || t('todoList.fetchError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post<Todo>(
        'http://localhost:5000/api/todos',
        { title: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
      toast.success(t('todoList.addSuccess'));
    } catch (err: any) {
      toast.error(err.response?.data?.msg || t('todoList.addError'));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.put<Todo>(
        `http://localhost:5000/api/todos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      toast.success(
        t('todoList.toggleSuccess', { status: response.data.completed ? t('todoList.complete') : t('todoList.undo') })
      );
    } catch (err: any) {
      toast.error(err.response?.data?.msg || t('todoList.toggleError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success(t('todoList.deleteSuccess'));
    } catch (err: any) {
      toast.error(err.response?.data?.msg || t('todoList.deleteError'));
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('todoList.title')}</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={toggleLanguage} disabled={loading}>
            {i18n.language === 'en' ? 'VN' : 'EN'}
          </Button>
          <div className="flex items-center gap-2">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Switch checked={isDark} onCheckedChange={toggleTheme} disabled={loading} />
          </div>
          <Button variant="destructive" onClick={logout} disabled={loading}>
            {t('todoList.logout')}
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={t('todoList.placeholder')}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          disabled={loading}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <Button onClick={handleAddTodo} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('todoList.add')}
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">{t('todoList.loading')}</span>
        </div>
      )}
      {todos.length === 0 && !loading && (
        <p className="text-gray-500 dark:text-gray-400">{t('todoList.noTodos')}</p>
      )}
      {todos.map((todo) => (
        <Card key={todo._id} className="p-4 flex justify-between items-center">
          <span className={todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
            {todo.title}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleTodo(todo._id)}
              disabled={loading}
            >
              {todo.completed ? t('todoList.undo') : t('todoList.complete')}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTodo(todo._id)}
              disabled={loading}
            >
              {t('todoList.delete')}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;