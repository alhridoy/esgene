import { v4 as uuidv4 } from 'uuid';

interface CommandMenuData {
  id: string;
  label: string;
  description: string;
  tag: string;
}

export const COMMAND_MENU_DATA: CommandMenuData[] = [
  {
    id: uuidv4(),
    label: 'Text',
    description: 'Start by typing plain text.',
    tag: 'p',
  },
  {
    id: uuidv4(),
    label: 'Heading 1',
    description: 'Big section heading.',
    tag: 'h1',
  },
  {
    id: uuidv4(),
    label: 'Heading 2',
    description: 'Medium section heading.',
    tag: 'h2',
  },
  {
    id: uuidv4(),
    label: 'Heading 3',
    description: 'Small section heading.',
    tag: 'h3',
  },
];
