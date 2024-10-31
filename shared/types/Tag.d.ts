type TagUpdateMode = 'delete' | 'rename' | 'change-color';

type TagUpdateItem = {
  id: TagUpdateMode;
  name: string;
  icon: ReactNode;
};

type TagColor = Record<string, string>;
