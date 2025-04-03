import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Học TypeScript', completed: false },
    { id: 2, title: 'Cài shadcn/ui', completed: true },
    { id: 3, title: 'Xây dựng Todo App', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const todo: Todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Todo List</h2>
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      {todos.map((todo) => (
        <Card key={todo.id} className="p-4 flex justify-between items-center">
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.title}
          </span>
          <Button variant="outline" size="sm">
            {todo.completed ? 'Undo' : 'Complete'}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;