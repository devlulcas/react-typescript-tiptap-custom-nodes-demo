import { Editor } from '@/components/editor/';

const content = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
    },
    {
      type: 'counterNode',
      attrs: {
        counter: 0,
      },
    },
  ],
};

export default function App() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center overflow-x-hidden">
      <div className="container my-2 h-[90dvh]">
        <Editor defaultContent={content} />
      </div>
    </div>
  );
}
