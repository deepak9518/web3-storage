import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CreateOrUploadButton } from '.';

export default {
  component: CreateOrUploadButton,
  title: 'Create or Upload Button',
} as ComponentMeta<typeof CreateOrUploadButton>;

export const DefaultCreateOrUploadButton: ComponentStory<typeof CreateOrUploadButton> = () => (
  <CreateOrUploadButton
    setCreateFileOpen={(b: boolean) => console.log(b)}
    setCreateFileAnchor={(a: any) => console.log(a)}
    onFileUploadComplete={(c?: boolean) => console.log(c)}
    onFileUploadFail={(c?: boolean) => console.log(c)}
    onFileUploading={(c?: boolean) => console.log(c)}
    onFolderCreating={() => {}}
    onFolderCreateFail={() => {}}
    onFolderCreateComplete={() => {}}
    closedAllModal={false}
    parentFolderId=""
  />
);
