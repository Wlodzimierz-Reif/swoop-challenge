import { Box, TextField } from '@radix-ui/themes';
import { Category, Todo } from '../types';
import CardComponent from './CardComponent';

const TodoList = ({
  todos,
  todoText,
  setTodoText,
  onCreateTodoKeyDown,
  categories,
  toggleTodo,
  deleteTodo,
  onTodoCategoryChange,
}: {
  todos: Todo[];
  todoText: string;
  setTodoText: (text: string) => void;
  onCreateTodoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  categories: Category[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onTodoCategoryChange: (value: string, todoId: string) => void;
}) => {
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
            key={todo.id}
            todo={todo}
            categories={categories}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            onTodoCategoryChange={onTodoCategoryChange}
          />
        );
      })}
    </Box>
  );
};

export default TodoList;
