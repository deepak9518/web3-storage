import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const props = {
    name: 'test-input',
  };
  test('to be rendered', () => {
    render(<Input {...props} />);
    const fieldInput = screen.getByTestId('field-input');
    expect(fieldInput).toBeInTheDocument();
  });
});
