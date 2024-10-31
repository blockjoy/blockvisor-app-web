import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconChangeColor from '@public/assets/icons/common/Drop.svg';
import IconPencil from '@public/assets/icons/common/Pencil.svg';

export const UPDATE_TAG_FUNCTIONS: TagUpdateItem[] = [
  {
    id: 'delete',
    name: 'Delete',
    icon: <IconDelete />,
  },
  {
    id: 'rename',
    name: 'Rename',
    icon: <IconPencil />,
  },
  {
    id: 'change-color',
    name: 'Change color',
    icon: <IconChangeColor />,
  },
];

export const TAG_COLORS = [];

// export const TAG_COLORS = [
//   'rgb(79, 65, 98)',
//   'rgb(45, 115, 123)',
//   'rgb(49, 63, 113)',
//   'rgb(79, 109, 54)',
//   'rgb(98, 65, 65)',
//   'rgb(36, 46, 36)',
//   'rgb(36, 36, 36)',
//   'rgb(125, 45, 85)',
//   'rgb(110, 45, 45)',
// ];

export const DEFAULT_TAG_COLOR = 'rgb(84, 84, 84)';
