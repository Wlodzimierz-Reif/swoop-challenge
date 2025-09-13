export type Todo = {
  id: string;
  text: string;
  done: boolean;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
};
