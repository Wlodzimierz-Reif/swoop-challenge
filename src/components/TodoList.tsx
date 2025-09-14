import { useContext } from 'react';

import { Box, TextField } from '@radix-ui/themes';

import type { Category, Todo } from 'types.ts';

import CardComponent from '@components/CardComponent.tsx';
import { TodoCatContext } from '@utils/context.tsx';
import { deleteTodo, onTodoCategoryChange, toggleTodo } from '@utils/fetch.ts';

const TodoList = ({
  todos,
  todoText,
  setTodoText,
  onCreateTodoKeyDown,
  categories,
}: {
  todos: Todo[];
  todoText: string;
  setTodoText: (text: string) => void;
  onCreateTodoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  categories: Category[];
}) => {
  const { setTodos, setShowDialog } = useContext(TodoCatContext) as {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  };
  const handleToggleTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
    const updatedTodos = await toggleTodo({ id, todos });
    setTodos(updatedTodos as Todo[]);
  };
  const handleDeleteTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
    const updatedTodos = await deleteTodo({ id, todos });
    setTodos(updatedTodos as Todo[]);
  };
  const handleTodoCategoryChange = async ({
    value,
    todoId,
    todos,
  }: {
    value: string;
    todoId: string;
    todos: Todo[];
  }) => {
    const updatedTodos = await onTodoCategoryChange({ value, todoId, todos });
    setTodos(updatedTodos as Todo[]);
  };

  return (
    <Box width="auto">
      <h2 data-testid="todo-list-title">Todo List</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Type your todo here"
          value={todoText}
          size="3"
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={onCreateTodoKeyDown}
          data-testid="new-todo-input"
        />
      </TextField.Root>

      <Box data-testid="todo-list">
        {todos.map((todo: Todo) => {
          return (
            <CardComponent
              todos={todos}
              key={todo.id}
              todo={todo}
              categories={categories}
              toggleTodo={handleToggleTodo}
              deleteTodo={handleDeleteTodo}
              onTodoCategoryChange={handleTodoCategoryChange}
              setShowDialog={setShowDialog}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default TodoList;
