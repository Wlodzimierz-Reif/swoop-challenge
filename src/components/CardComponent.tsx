import { Box, Card, Checkbox, Flex, Select, Strong, Text } from '@radix-ui/themes';
import type { Category, Todo } from 'types.ts';
import Modal from './Modal.tsx';
import { useContext } from 'react';
import { TodoCatContext } from '@utils/context.tsx';
import { deleteTodo, onTodoCategoryChange, toggleTodo } from '@utils/fetch.ts';

const CardComponent = ({ todo }: { todo: Todo }) => {
  const { todos, setTodos, categories, setShowDialog } = useContext(TodoCatContext) as {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
    todos: Todo[];
  };

  const handleToggleTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
    const updatedTodos = await toggleTodo({ id, todos });
    setTodos(updatedTodos ?? []);
  };
  const handleDeleteTodo = async ({ id, todos }: { id: string; todos: Todo[] }) => {
    const updatedTodos = await deleteTodo({ id, todos });
    setTodos(updatedTodos ?? []);
  };
  const handleCategoryChange = async ({
    value,
    todoId,
    todos,
  }: {
    value: string;
    todoId: string;
    todos: Todo[];
  }) => {
    const updatedTodos = await onTodoCategoryChange({ value, todoId, todos });
    setTodos(updatedTodos ?? []);
  };

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
              handleToggleTodo({ id: todo.id, todos });
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
            value={todo.categoryId ? todo.categoryId.toString() : ''}
            onValueChange={(value) =>
              handleCategoryChange({ value, todoId: todo.id.toString(), todos })
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
          title="Delete Todo"
          buttonText="Delete"
          description="Are you sure you want to delete this todo?"
          onConfirm={() => handleDeleteTodo({ id: todo.id, todos })}
          onCancel={() => setShowDialog(false)}
          dataTestId="delete-todo-button"
        />
      </Flex>
    </Card>
  );
};

export default CardComponent;
