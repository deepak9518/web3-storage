import React from 'react';
import { TagProps } from './Tag.types';

export const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other} onClick={onDelete} data-testid="tag-wrapper">
      <span data-testid="tag-value">{label}</span>
    </div>
  );
};
