import { Box, TextField } from '@radix-ui/themes';

import type { Category } from 'types.ts';

import CategoryComponent from '@components/CategoryComponent.tsx';
import { inputType } from '@utils/statics.ts';

const CategoriesList = ({
  categories,
  categoryText,
  setCategoryText,
  onCreateKeyDown,
}: {
  categories: Category[];
  categoryText: string;
  setCategoryText: (text: string) => void;
  onCreateKeyDown: ({ type }: { type: string }) => void;
}) => {
  return (
    <Box width="auto">
      <h2 data-testid="categories-list-title">Categories</h2>
      <TextField.Root>
        <TextField.Input
          placeholder="Create a new category"
          value={categoryText}
          size="3"
          onChange={(e) => setCategoryText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCreateKeyDown({ type: inputType.CATEGORY });
            }
          }}
          data-testid="new-category-input"
        />
      </TextField.Root>
      <Box data-testid="categories-list">
        {categories?.map((category: Category) => {
          return <CategoryComponent key={category.id} category={category} />;
        })}
      </Box>
    </Box>
  );
};

export default CategoriesList;
