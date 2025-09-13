import type { Category } from '../types';
import { Box, Card, Flex, Strong, Text } from '@radix-ui/themes';

const CategoryComponent = ({ category }: { category: Category }) => {
  return (
    <Card
      my="2"
      key={category.id}
      style={{
        backgroundColor: category.color,
      }}
    >
      <Flex gap="3" align="center">
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
      </Flex>
    </Card>
  );
};

export default CategoryComponent;
