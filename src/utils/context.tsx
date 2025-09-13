import { useState, createContext } from 'react';

import type { Category, Todo } from 'types.ts';

import { Dispatch, SetStateAction } from 'react';

const defaultState: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
} = {
  todos: [],
  setTodos: () => {},
  categories: [],
  setCategories: () => {},
};
export const TodoCatContext = createContext(defaultState);

export const TodoCatProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <TodoCatContext.Provider value={{ todos, setTodos, categories, setCategories }}>{children}</TodoCatContext.Provider>
  );
};
