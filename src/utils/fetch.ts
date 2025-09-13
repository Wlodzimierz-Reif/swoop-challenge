import { Todo } from '../types.ts';
import { Category } from '../types.ts';
import { generatePastelColor } from './pastelColor.ts';

export const addTodo = async ({ todoText }: { todoText: string }) => {
  const response = await fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: Date.now().toString(), text: todoText, done: false }),
  });
  const todo = await response.json();
  return todo;
};

export const toggleTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
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
    return updatedTodos;
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
};

export const deleteCategory = async ({ id, categories }: { id: string; categories: Category[] }) => {
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
