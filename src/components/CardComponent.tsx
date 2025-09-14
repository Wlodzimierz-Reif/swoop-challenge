import {
  Box,
  Card,
  Checkbox,
  Flex,
  Select,
  Strong,
  Text,
} from '@radix-ui/themes';
import type { Category, Todo } from 'types.ts';
import Modal from './Modal.tsx';

const CardComponent = ({
  todos,
  todo,
  categories,
  toggleTodo,
  deleteTodo,
  onTodoCategoryChange,
  setShowDialog,
}: {
  todos: Todo[];
  todo: Todo;
  categories: Category[];
  toggleTodo: ({ id, todos }: { id: string; todos: Todo[] }) => void;
  deleteTodo: ({ id, todos }: { id: string; todos: Todo[] }) => void;
  onTodoCategoryChange: ({
    value,
    todoId,
    todos,
  }: {
    value: string;
    todoId: string;
    todos: Todo[];
  }) => void;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Card
      my="2"
      key={todo.id}
      style={{
        backgroundColor: categories.find((category: Category) => category.id === todo.categoryId)
          ?.color,
      }}
      data-testid="todo-item"
    >
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Checkbox
            size="3"
            checked={todo.done}
            onCheckedChange={() => {
              toggleTodo({ id: todo.id, todos });
            }}
          />
          <Box>
            <Text
              as="span"
              size="3"
              style={{
                color: 'black',
              }}
            >
              <Strong> {todo.text}</Strong>
            </Text>
          </Box>
          <Select.Root
            value={todo.categoryId?.toString()}
            onValueChange={(value) =>
              onTodoCategoryChange({ value, todoId: todo.id.toString(), todos })
            }
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                {categories.map((category: Category) => {
                  return (
                    <Select.Item key={category.id} value={category.id.toString()}>
                      {category.name}
                    </Select.Item>
                  );
                })}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Modal
          buttonText="Delete"
          description="Are you sure you want to delete this todo?"
          onConfirm={() => deleteTodo({ id: todo.id, todos })}
          onCancel={() => setShowDialog(false)}
        />
      </Flex>
    </Card>
  );
};

export default CardComponent;
