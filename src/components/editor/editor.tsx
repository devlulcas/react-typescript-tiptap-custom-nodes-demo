import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorMenu } from './editor-menu';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import { cn } from '@/lib/utils';
import css from './editor.module.css';
import CounterNode from './counter-node';

const extensions = [
  TextStyle.configure(),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
  Image,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Youtube.configure({
    progressBarColor: 'hotpink',
  }),
  CounterNode,
];

type EditorProps = {
  defaultContent?: string | object;
};

export function Editor({ defaultContent }: EditorProps) {
  const editor = useEditor({
    extensions,
    content: defaultContent,
  });

  return (
    <div className="flex flex-col gap-2 min-w-full h-full">
      <EditorMenu editor={editor} />

      <div className="flex flex-col lg:flex-row min-w-full h-full border rounded-lg p-2 gap-2 overflow-hidden">
        <EditorContent
          className={cn('prose min-w-full lg:min-w-0 lg:w-full h-full', css.editor)}
          editor={editor}
        />

        <pre className="w-full border rounded-lg p-2 bg-slate-900 text-slate-50 overflow-auto">
          {JSON.stringify(editor?.getJSON(), null, 2)}
        </pre>
      </div>
    </div>
  );
}
