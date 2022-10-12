import { ComponentMeta, ComponentStory } from '@storybook/react';
import DragAndDropFiles from './DragAndDropFiles';

export default {
  title: 'Drag and Drop Files',
  component: DragAndDropFiles,
} as ComponentMeta<typeof DragAndDropFiles>;

export const DefaultDragAndDropFiles: ComponentStory<typeof DragAndDropFiles> = () => {
  const onDropHandler = (files: File[]) => {
    console.log('files', files);
  };

  return <DragAndDropFiles onDropHandler={onDropHandler}>This is Content</DragAndDropFiles>;
};
