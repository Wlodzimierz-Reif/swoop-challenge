import { Box, TextField } from '@radix-ui/themes';
import { Category, Todo } from '../types';
import CardComponent from './CardComponent';
import { deleteTodo, onTodoCategoryChange, toggleTodo } from '../utils/fetch';
import { TodoCatContext } from '../utils/context';
import { useContext } from 'react';

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
  const { setTodos } = useContext(TodoCatContext) as {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
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
      <h2>Todo List</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Type your todo here"
          value={todoText}
          size="3"
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={onCreateTodoKeyDown}
        />
      </TextField.Root>

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
          />
        );
      })}
    </Box>
  );
};

export default TodoList;
