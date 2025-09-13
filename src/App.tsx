import { useEffect, useState } from 'react';

import type { Category, Todo } from './types';

import { generatePastelColor } from './utils/pastelColor';
import { Grid } from '@radix-ui/themes';

import CategoriesList from './components/CategoriesList';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');

  const addTodo = async () => {
    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Date.now().toString(), text: todoText, done: false }),
    });
    const todo = await response.json();
    setTodos([...todos, todo]);
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((todo: Todo) => todo.id === id);

    if (todo) {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, done: !todo.done }),
      });
      const updatedTodo = await response.json();
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (id: string) => {
    const todo = todos.find((todo: Todo) => todo.id === id);

    if (todo) {
      try {
        await fetch(`http://localhost:3001/todos/${id}`, {
          method: 'DELETE',
        });
        const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
        setTodos(updatedTodos);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const addCategory = async () => {
    const response = await fetch('http://localhost:3001/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Date.now().toString(),
        name: categoryText,
        color: generatePastelColor(),
      }),
    });
    const category = await response.json();
    setCategories([...categories, category]);
  };

  const onCreateTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const onCreateNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addCategory();
    }
  };

  const onTodoCategoryChange = async (value: string, todoId: string) => {
    const todo = todos.find((todo: Todo) => todo.id === todoId);

    if (todo) {
      const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, categoryId: value }),
      });
      const updatedTodo = await response.json();
      const updatedTodos = todos.map((todo: Todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  useEffect(() => {
    const fetchData = async (slug: string) => {
      try {
        const response = await fetch(`http://localhost:3001/${slug}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching ${slug}:`, error);
        return [];
      }
    };
    const loadData = async () => {
      const todos = await fetchData('todos');
      const categories = await fetchData('categories');

      setCategories(categories);
      setTodos(todos);
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();

      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <Grid columns="2" gap="3" width="auto">
      <CategoriesList
        categories={categories}
        categoryText={categoryText}
        setCategoryText={setCategoryText}
        onCreateNewCategoryKeyDown={onCreateNewCategoryKeyDown}
      />
      <TodoList
        todos={todos}
        todoText={todoText}
        setTodoText={setTodoText}
        onCreateTodoKeyDown={onCreateTodoKeyDown}
        categories={categories}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        onTodoCategoryChange={onTodoCategoryChange}
      />
    </Grid>
  );
}

export default App;
