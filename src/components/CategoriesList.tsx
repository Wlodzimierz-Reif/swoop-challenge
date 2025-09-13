import { Box, TextField } from '@radix-ui/themes';
import { Category } from '../types.ts';
import CategoryComponent from './CategoryComponent.tsx';
import { deleteCategory } from '../utils/fetch.ts';
import { useContext } from 'react';
import { TodoCatContext } from '../utils/context.tsx';

const CategoriesList = ({
  categories,
  categoryText,
  setCategoryText,
  onCreateNewCategoryKeyDown,
}: {
  categories: Category[];
  categoryText: string;
  setCategoryText: (text: string) => void;
  onCreateNewCategoryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const { setCategories } = useContext(TodoCatContext) as {
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  };
  const handleDeleteCategory = async (id: string) => {
    const updatedCategories = await deleteCategory({ id, categories });
    setCategories(updatedCategories as Category[]);
  };
  return (
    <Box width="auto">
      <h2 data-testid="categories-list-title">Categories</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Create a new category"
          value={categoryText}
          size="3"
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={onCreateNewCategoryKeyDown}
          data-testid="new-category-input"
        />
      </TextField.Root>
      <Box data-testid="categories-list">
        {categories?.map((category: Category) => {
          return (
            <CategoryComponent key={category.id} category={category} handleDeleteCategory={handleDeleteCategory} />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoriesList;
