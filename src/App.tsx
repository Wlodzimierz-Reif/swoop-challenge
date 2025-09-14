import { useContext, useEffect, useState } from 'react';

import { Grid } from '@radix-ui/themes';
import sanitizeHtml from 'sanitize-html';

import type { Category, Todo } from 'types.ts';

import CategoriesList from '@components/CategoriesList.tsx';
import { TodoCatContext } from '@utils/context.tsx';
import { addCategory, addTodo } from '@utils/fetch.ts';
import TodoList from '@components/TodoList.tsx';
import { inputType } from '@utils/statics.ts';

function App() {
  const [categoryText, setCategoryText] = useState<string>('');
  const [todoText, setTodoText] = useState<string>('');

  const { todos, setTodos, categories, setCategories } = useContext(TodoCatContext) as {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    showDialog: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  };

  const validateInput = (input: string) => {
    if (!input || input.trim() === '' || input.length > 100) {
      return false;
    }
    return input.trim();
  };

  const onCreateKeyDown = async ({ type }: { type: string }) => {
    if (type !== inputType.TODO && type !== inputType.CATEGORY) return;

    const sanitisedInput = sanitizeHtml(type === inputType.TODO ? todoText : categoryText);
    const validatedInput = validateInput(sanitisedInput);
    if (!validatedInput) {
      console.log('Invalid input');
      return;
    }
    if (type === inputType.TODO) {
      const newTodo = await addTodo({ todoText: sanitisedInput });
      setTodos([...todos, newTodo]);
    } else if (type === inputType.CATEGORY) {
      const newCategory = await addCategory({ categoryText: sanitisedInput });
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
  }, [categories, todos, setCategories, setTodos]);

  return (
    <Grid columns="2" gap="3" width="auto">
      <CategoriesList
        categories={categories}
        categoryText={categoryText}
        setCategoryText={setCategoryText}
        onCreateKeyDown={onCreateKeyDown}
      />
      <TodoList
        todos={todos}
        todoText={todoText}
        setTodoText={setTodoText}
        onCreateKeyDown={onCreateKeyDown}
      />
    </Grid>
  );
}

export default App;
