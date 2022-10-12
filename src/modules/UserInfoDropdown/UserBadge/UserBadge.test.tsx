import { UserBadgeProps } from './UserBadge.types';
import avatar from 'src/assets/svg/avatar.svg';
import { render, screen } from '@testing-library/react';
import { UserBadge } from './UserBadge';

const props: UserBadgeProps = {
  name: 'johndoe.near',
  balance: '0.34',
  avatar: avatar,
};

describe('UserBadge', () => {
  const renderUserBadge = (overrideProps?: UserBadgeProps) => render(<UserBadge {...props} {...overrideProps} />);
  test('renders properly', () => {
    renderUserBadge();
    const userName = screen.getByTestId('user-name');
    const userBalance = screen.getByTestId('user-balance');
    const userAvatar = screen.getByTestId('user-avatar');

    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(props.name);
    expect(userBalance).toBeInTheDocument();
    expect(userBalance).toHaveTextContent(`${props.balance} NEAR`);
    expect(userAvatar).toBeInTheDocument();
  });

  test('renders hidden balance', () => {
    renderUserBadge({ ...props, balance: null });
    const userName = screen.getByTestId('user-name');
    const userBalance = screen.getByTestId('user-balance');
    const userAvatar = screen.getByTestId('user-avatar');

    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(props.name);
    expect(userBalance).toBeInTheDocument();
    expect(userBalance).toHaveTextContent(`*** NEAR`);
    expect(userAvatar).toBeInTheDocument();
  });
});
