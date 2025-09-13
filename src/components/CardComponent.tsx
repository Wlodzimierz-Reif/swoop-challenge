import { Box, Button, Card, Checkbox, Flex, Select, Strong, Text } from '@radix-ui/themes';
import { Category, Todo } from '../types';

const CardComponent = ({
  todos,
  todo,
  categories,
  toggleTodo,
  deleteTodo,
  onTodoCategoryChange,
}: {
  todos: Todo[];
  todo: Todo;
  categories: Category[];
  toggleTodo: ({ id, todos }: { id: string; todos: Todo[] }) => void;
  deleteTodo: ({ id, todos }: { id: string; todos: Todo[] }) => void;
  onTodoCategoryChange: ({ value, todoId, todos }: { value: string; todoId: string; todos: Todo[] }) => void;
}) => {
  return (
    <Card
      my="2"
      key={todo.id}
      style={{
        backgroundColor: categories.find((category: Category) => category.id === todo.categoryId)?.color,
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
            onValueChange={(value) => onTodoCategoryChange({ value, todoId: todo.id.toString(), todos })}
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
        <Button data-testid="delete-todo-button" color="red" onClick={() => deleteTodo({ id: todo.id, todos })} style={{ cursor: 'pointer' }}>
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default CardComponent;
