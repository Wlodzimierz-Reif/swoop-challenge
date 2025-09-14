import { Box, TextField } from '@radix-ui/themes';

import type { Todo } from 'types.ts';

import CardComponent from '@components/CardComponent.tsx';
import { inputType } from '@utils/statics.ts';

const TodoList = ({
  todos,
  todoText,
  setTodoText,
  onCreateKeyDown,
}: {
  todos: Todo[];
  todoText: string;
  setTodoText: (text: string) => void;
  onCreateKeyDown: ({ type }: { type: string }) => void;
}) => {
  return (
    <Box width="auto">
      <h2 data-testid="todo-list-title">Todo List</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Type your todo here"
          value={todoText}
          size="3"
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCreateKeyDown({ type: inputType.TODO });
            }
          }}
          data-testid="new-todo-input"
        />
      </TextField.Root>
      <Box data-testid="todo-list">
        {todos.map((todo: Todo) => {
          return <CardComponent key={todo.id} todo={todo} />;
        })}
      </Box>
    </Box>
  );
};

export default TodoList;
