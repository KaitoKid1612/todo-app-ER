import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import TodoList from '@/components/TodoList';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;