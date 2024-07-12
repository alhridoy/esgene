'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { TextIcon } from '@/components/ui/icons';
import { CaretCoordinates } from '@/lib/utils';
import { COMMAND_MENU_DATA } from './data';
import { Editor } from '@tiptap/react';
import PromptFormV2 from '../chat/prompt-form-v2';

interface SlashCommandMenuProps {
  open: boolean;
  onOpenChange: () => void;
  caretCoordinates?: CaretCoordinates; // cursor position
  editor: Editor | null;
  closePromptForm: () => void;
  openPromptForm: () => void;
  showPromptForm: boolean;
}

export default function SlashCommandMenu({
  open,
  onOpenChange,
  caretCoordinates,
  editor,
  openPromptForm,
  closePromptForm,
  showPromptForm,
}: SlashCommandMenuProps) {
  const { x, y } = caretCoordinates || { x: 0, y: 0 };

  const handleCommandClick = (
    e: React.MouseEvent<HTMLDivElement>,
    tag: string,
  ) => {
    closePromptForm();
    if (tag === 'p') {
      editor?.chain().focus().setNode('paragraph').run();
    } else {
      const level = Number(tag.slice(1)); // Extract the heading level
      editor?.chain().focus().setNode('heading', { level }).run();
    }
  };

  return (
    <div style={{ top: y ? y + 20 : 90, left: x ? x : 285, position: 'fixed' }}>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger></DropdownMenuTrigger>

        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-muted-foreground text-xs leading-none">
                Basic blocks
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {COMMAND_MENU_DATA.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={(e) => {
                  handleCommandClick(e, item.tag);
                }}
              >
                <div className="align-middl mr-2 h-8 w-8 rounded-sm border p-1">
                  <TextIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="">{item.label}</span>
                  <p className="text-muted-foreground text-xs leading-none">
                    {item.description}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-muted-foreground text-xs leading-none">
                  ESGene AI
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="flex flex-col items-start"
              onClick={openPromptForm}
            >
              Ask AI to write...
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {showPromptForm ? <PromptFormV2 /> : null}
    </div>
  );
}
