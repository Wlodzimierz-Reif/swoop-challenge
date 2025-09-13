import { Box, TextField } from '@radix-ui/themes';
import { Category } from '../types';
import CategoryComponent from './CategoryComponent';

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
  return (
    <Box width="auto">
      <h2>Categories</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Create a new category"
          value={categoryText}
          size="3"
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={onCreateNewCategoryKeyDown}
        />
      </TextField.Root>
      {categories?.map((category: Category) => {
        return <CategoryComponent key={category.id} category={category} />;
      })}
    </Box>
  );
};

export default CategoriesList;
