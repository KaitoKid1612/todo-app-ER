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

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Todo[]>('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTodos(response.data);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

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
      toast.success('Todo added successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to add todo');
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
      toast.success(`Todo ${response.data.completed ? 'completed' : 'undone'}`);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to update todo');
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
      toast.success('Todo deleted successfully');
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Todo List</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Switch checked={isDark} onCheckedChange={toggleTheme} disabled={loading} />
          </div>
          <Button variant="destructive" onClick={logout} disabled={loading}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          disabled={loading}
        />
        <Button onClick={handleAddTodo} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {todos.length === 0 && !loading && (
        <p className="text-gray-500 dark:text-gray-400">No todos yet.</p>
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
              {todo.completed ? 'Undo' : 'Complete'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTodo(todo._id)}
              disabled={loading}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;