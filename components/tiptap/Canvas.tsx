'use client';
import React from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import SlashCommandMenu from './SlashCommandMenu';
import { getCaretCoordinates, CaretCoordinates } from '@/lib/utils';
import { useEditor, EditorContent } from '@tiptap/react';

export default function Canvas() {
  const [showSlashCommandMenu, setShowSlashCommandMenu] = React.useState(false);
  const [showPromptForm, setShowPromptForm] = React.useState(false);

  const [caretCoordinates, setCaretCoordinates] =
    React.useState<CaretCoordinates>({ x: 0, y: 0 });

  const editor = useEditor({
    extensions: [
      // @ts-ignore
      StarterKit,
      // @ts-ignore
      Placeholder.configure({ placeholder: `Press '/' to open command menu` }),
    ],
  });

  const openSlashCommandMenu = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '/') {
      const { x, y } = getCaretCoordinates();
      setCaretCoordinates({ x, y });
      setShowSlashCommandMenu(true);
    }
  };

  React.useEffect(() => {
    editor?.commands.focus();
  }, [editor]);

  return (
    <>
      <EditorContent
        editor={editor}
        onKeyDown={openSlashCommandMenu}
        onClick={() => setShowPromptForm(false)}
      />
      <SlashCommandMenu
        open={showSlashCommandMenu}
        onOpenChange={() => setShowSlashCommandMenu(false)}
        caretCoordinates={caretCoordinates}
        editor={editor}
        closePromptForm={() => setShowPromptForm(false)}
        showPromptForm={showPromptForm}
        openPromptForm={() => setShowPromptForm(true)}
      />
    </>
  );
}
