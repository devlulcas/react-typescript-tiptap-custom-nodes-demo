import { Node, mergeAttributes, type NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';

export type Counter = {
  initialValue: number;
};

type CounterNodeAttributes = Counter;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    counterNode: {
      setCounter: (options: CounterNodeAttributes) => ReturnType;
    };
  }
}

type LayeredImageVisualizationProps = NodeViewProps;

function CounterNodeVisualization(props: LayeredImageVisualizationProps) {
  return (
    <NodeViewWrapper className="counterNode">
      <div
        data-drag-handle
        className="relative w-fit h-fit flex items-center border rounded px-2 gap-2"
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            props.updateAttributes({
              counter: props.node.attrs.counter + 1,
            });
          }}
        >
          <PlusIcon />
        </Button>
        <pre className="text-center w-[10ch]">{props.node.attrs.counter}</pre>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            props.updateAttributes({
              counter: props.node.attrs.counter - 1,
            });
          }}
        >
          <MinusIcon />
        </Button>
      </div>
    </NodeViewWrapper>
  );
}

export default Node.create({
  name: 'counterNode',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      counter: 0,
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div [data-node-type="counterNode"]',
      },
    ];
  },
  draggable: true,
  renderHTML({ HTMLAttributes }) {
    return ['counterNode', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CounterNodeVisualization);
  },
  addCommands() {
    return {
      setCounter: (options) => {
        return ({ commands }) => {
          return commands.insertContent({
            type: 'counterNode',
            attrs: {
              counter: options.initialValue,
            },
          });
        };
      },
    };
  },
});
