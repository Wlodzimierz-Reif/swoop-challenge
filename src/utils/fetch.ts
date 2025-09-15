import type { Category, Todo } from 'types.ts';
import { generatePastelColor } from './pastelColor.ts';

export const fetchData = async (slug: string) => {
  try {
    const response = await fetch(`http://localhost:3001/${slug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${slug}:`, error);
    return [];
  }
};

export const addTodo = async ({ todoText }: { todoText: string }) => {
  try {
    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Date.now().toString(), text: todoText, done: false }),
    });
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

export const toggleTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
  const todo = todos.find((todo: Todo) => todo.id === id);

  if (todo) {
    try {
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
      return updatedTodos;
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }
};

export const deleteTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
  const todo = todos.find((todo: Todo) => todo.id === id);

  if (todo) {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
      return updatedTodos;
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
};

export const addCategory = async ({ categoryText }: { categoryText: string }) => {
  try {
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
    return category;
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
};

export const deleteCategory = async ({
  id,
  categories,
}: {
  id: string;
  categories: Category[];
}) => {
  const category = categories.find((category: Category) => category.id === id);

  if (category) {
    try {
      await fetch(`http://localhost:3001/categories/${id}`, {
        method: 'DELETE',
      });
      const updatedCategories = categories.filter((category: Category) => category.id !== id);
      return updatedCategories;
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
};

export const onTodoCategoryChange = async ({
  value,
  todoId,
  todos,
}: {
  value: string;
  todoId: string;
  todos: Todo[];
}) => {
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
    return updatedTodos;
  }
};
