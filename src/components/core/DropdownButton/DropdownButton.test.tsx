import { fireEvent, render, screen } from '@testing-library/react';
import { DropdownButton } from './DropdownButton';
import { DropdownButtonProps } from './DropdownButton.types';

const props = {
  renderMenu: (
    <div>
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>
  ),
};

const renderDropdownButton = (overrideProps?: DropdownButtonProps) =>
  render(
    <DropdownButton {...props} {...overrideProps}>
      Test Button
    </DropdownButton>
  );

describe('DropDownButton', () => {
  test('renders properly', () => {
    renderDropdownButton();
    const dropdownButton = screen.getByTestId('dropdown-button');
    expect(dropdownButton).toBeInTheDocument();
    expect(dropdownButton).toBeEnabled();

    fireEvent.click(dropdownButton);

    const dropdownMenu = screen.getByTestId('dropdown-menu');
    expect(dropdownMenu).toBeInTheDocument();
  });
});
