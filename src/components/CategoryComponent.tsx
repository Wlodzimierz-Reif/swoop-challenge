import { Box, Card, Flex, Strong, Text } from '@radix-ui/themes';
import { Category } from 'types.ts';
import Modal from './Modal.tsx';
import { useContext } from 'react';
import { TodoCatContext } from '@utils/context.tsx';
import { deleteCategory } from '@utils/fetch.ts';

const CategoryComponent = ({ category }: { category: Category }) => {
  const { categories, setCategories, setShowDialog } = useContext(TodoCatContext) as {
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
  };
  const handleDeleteCategory = async ({ id }: { id: string }) => {
    const updatedCategories = await deleteCategory({ id, categories });
    setCategories(updatedCategories as Category[]);
  };
  return (
    <Card
      my="2"
      key={category.id}
      style={{
        backgroundColor: category.color,
      }}
      data-testid="category-item"
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
        <Modal
          title="Delete Category"
          buttonText="Delete"
          description="Are you sure you want to delete this category?"
          onConfirm={() => handleDeleteCategory({ id: category.id })}
          onCancel={() => setShowDialog(false)}
          dataTestId="delete-category-button"
        />
      </Flex>
    </Card>
  );
};

export default CategoryComponent;
