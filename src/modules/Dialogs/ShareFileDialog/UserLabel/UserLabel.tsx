import React from 'react';
import * as Styled from './UserLabel.styles';
import { UserLabelProps } from './UserLabel.types';

export const UserLabel = ({ userName }: UserLabelProps) => {
  return (
    <Styled.UserLabelWrapper>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png"
        data-testid="user-avatar"
        alt={`${userName}'s avatar`}
        width={40}
        height={40}
      />
      {userName}
    </Styled.UserLabelWrapper>
  );
};
