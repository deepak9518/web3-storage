import React from 'react';
import * as Styled from './UserBadge.styles';
import { UserBadgeProps } from './UserBadge.types';

export const UserBadge = ({ name, balance }: UserBadgeProps) => {
  return (
    <Styled.UserBadgeContainer>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ski_trail_rating_symbol_black_circle.png"
        data-testid="user-avatar"
        alt={`${name}'s avatar`}
        width={35}
        height={35}
      />
      <Styled.UserNameWrapper>
        <Styled.UserName data-testid="user-name">{name}</Styled.UserName>
        <Styled.UserBalance data-testid="user-balance">{`${balance ? balance : '***'} NEAR`}</Styled.UserBalance>
      </Styled.UserNameWrapper>
    </Styled.UserBadgeContainer>
  );
};
