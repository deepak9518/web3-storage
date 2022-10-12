import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CreateFileMenu } from '.';

export default {
  component: CreateFileMenu,
  title: 'Create File Menu',
} as ComponentMeta<typeof CreateFileMenu>;

export const DefaultCreateFileMenu: ComponentStory<typeof CreateFileMenu> = () => (
  <CreateFileMenu
    anchorEl={null}
    createFileOpen
    setCreateFileOpen={(b: boolean) => console.log(b)}
    onFileUploadComplete={(c?: boolean) => console.log(c)}
    onFileUploadFail={(c?: boolean) => console.log(c)}
    onFileUploading={(c?: boolean) => console.log(c)}
    setLoader={(b: boolean) => console.log(b)}
  />
);
