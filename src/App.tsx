import { useContext, useEffect, useState } from 'react';

import { Grid } from '@radix-ui/themes';

import CategoriesList from './components/CategoriesList.tsx';
import TodoList from './components/TodoList.tsx';
import { addCategory, addTodo } from './utils/fetch.ts';
import type { Category, Todo } from './types.ts'; // Uncomment if you have these types
import { TodoCatContext } from './utils/context.tsx';

function App() {
  const [categoryText, setCategoryText] = useState<string>('');
  const [todoText, setTodoText] = useState<string>('');

  const { todos, setTodos, categories, setCategories } = useContext(TodoCatContext) as {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  };

  const onCreateTodoKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newTodo = await addTodo({ todoText });
      setTodos([...todos, newTodo]);
    }
  };

  const onCreateNewCategoryKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newCategory = await addCategory({ categoryText });
      setCategories([...categories, newCategory]);
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
      />
    </Grid>
  );
}

export default App;
