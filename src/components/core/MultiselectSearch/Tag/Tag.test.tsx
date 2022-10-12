import { fireEvent, render, screen } from '@testing-library/react';

import { Tag } from './Tag';
import { TagProps } from './Tag.types';

const props: TagProps = {
  label: 'Test',
  onDelete: jest.fn(),
  'data-tag-index': 0,
  key: 0,
  tabIndex: -1,
};

const renderTag = () => render(<Tag {...props}>Test Button</Tag>);

describe('Tag', () => {
  test('renders properly', () => {
    renderTag();
    const tagWrapper = screen.getByTestId('tag-wrapper');
    const tagValue = screen.getByTestId('tag-value');

    expect(tagWrapper).toBeInTheDocument();
    expect(tagValue).toBeInTheDocument();

    expect(tagValue).toHaveTextContent(props.label);

    fireEvent.click(tagWrapper);
    expect(props.onDelete).toBeCalled();
  });
});
