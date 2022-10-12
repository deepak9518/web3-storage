import { fireEvent, render, screen } from '@testing-library/react';

import { COLORS } from 'src/constants/colors';

import Button, { IButtonProps } from './Button';

const onClickHandler = jest.fn();

const renderButton = (overrideProps: IButtonProps = {}) =>
  render(
    <Button buttonStyle="dark" onClick={onClickHandler} withArrow={false} {...overrideProps}>
      Test Button
    </Button>
  );

describe('Button', () => {
  test('renders dark button', () => {
    renderButton();
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toBeEnabled();
    expect(button).toHaveStyle(
      `background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #232529; color: ${COLORS.WHITE_100}`
    );
    fireEvent.click(button);
    expect(onClickHandler).toBeCalled();
  });

  test('renders light button', () => {
    renderButton({ buttonStyle: 'light' });
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toBeEnabled();
    expect(button).toHaveStyle(
      `background: ${COLORS.WHITE_100}; color: rgb(143, 150, 157); border: 1px solid ${COLORS.GREY_70};`
    );
    fireEvent.click(button);
    expect(onClickHandler).toBeCalled();
  });

  test('renders primary button', () => {
    renderButton({ buttonStyle: 'primary' });
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toBeEnabled();
    expect(button).toHaveStyle(`background: ${COLORS.BLUE_80}; color: ${COLORS.WHITE_100};`);
    fireEvent.click(button);
    expect(onClickHandler).toBeCalled();
  });

  test('renders disabled button', () => {
    renderButton({ disabled: true });
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle(`opacity: 0.3;`);
  });
});
