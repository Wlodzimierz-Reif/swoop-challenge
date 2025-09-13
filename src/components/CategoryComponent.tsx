import type { Category } from '../types.ts';
import { Box, Button, Card, Flex, Strong, Text } from '@radix-ui/themes';

const CategoryComponent = ({
  category,
  handleDeleteCategory,
}: {
  category: Category;
  handleDeleteCategory: (id: string) => void;
}) => {
  return (
    <Card
      my="2"
      key={category.id}
      style={{
        backgroundColor: category.color,
      }}
    >
      <Flex gap="3" align="center" justify="between">
        <Box>
          <Text
            as="span"
            size="3"
            style={{
              color: 'black',
            }}
          >
            <Strong>{category.name}</Strong>
          </Text>
        </Box>
        <Button color="red" onClick={() => handleDeleteCategory(category.id)} style={{ cursor: 'pointer' }}>
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default CategoryComponent;
