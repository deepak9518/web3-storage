import React from 'react';
import { InlineContainer, IconContainer, PathText } from './index.styles';
import { HomeIcon, CaretRightIcon } from 'src/assets/svg';

export interface IPathProps {
  links: string[];
  icon: boolean;
  onPathClick: (path: string) => void;
}

const Path: React.FC<IPathProps> = ({ links, icon, onPathClick }) => {
  return (
    <InlineContainer>
      {icon && (
        <IconContainer onClick={() => onPathClick('Home')}>
          <HomeIcon />
        </IconContainer>
      )}
      {links.map((link: string, index: number) => (
        <InlineContainer key={index} component="link" onClick={() => onPathClick(link)}>
          {icon && <CaretRightIcon />}
          <PathText>{link}</PathText>
        </InlineContainer>
      ))}
    </InlineContainer>
  );
};

export default Path;
