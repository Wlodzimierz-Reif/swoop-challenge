import { Box, Button, Card, Checkbox, Flex, Select, Strong, Text } from '@radix-ui/themes';
import { Category, Todo } from '../types';

const CardComponent = ({
  todo,
  categories,
  toggleTodo,
  deleteTodo,
  onTodoCategoryChange,
}: {
  todo: Todo;
  categories: Category[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onTodoCategoryChange: (value: string, todoId: string) => void;
}) => {
  return (
    <Card
      my="2"
      key={todo.id}
      style={{
        backgroundColor: categories.find((category: Category) => category.id === todo.categoryId)?.color,
      }}
    >
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Checkbox
            size="3"
            checked={todo.done}
            onCheckedChange={() => {
              toggleTodo(todo.id);
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
            onValueChange={(value) => onTodoCategoryChange(value, todo.id.toString())}
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
        <Button color="red" onClick={() => deleteTodo(todo.id)} style={{ cursor: 'pointer' }}>
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default CardComponent;
