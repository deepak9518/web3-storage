import { fireEvent, render, screen } from '@testing-library/react';

import MultiselectSearch from './MultiselectSearch';
import { MultiselectSearchProps, MultiselectValue } from './MultiselectSearch.types';

const testValues: MultiselectValue[] = [
  { label: 'test value 1', value: 1 },
  { label: 'test value 2', value: 2 },
  { label: 'test value 3', value: 3 },
];

const props: MultiselectSearchProps = {
  options: testValues,
  selectedOptions: [testValues[0]],
  onSelect: jest.fn(),
  selectedPrivilege: 1,
};

const renderTag = () => render(<MultiselectSearch {...props} />);

describe('Tag', () => {
  test('renders properly', () => {
    renderTag();
    const rootWrapper = screen.getByTestId('root-wrapper');
    expect(rootWrapper).toBeInTheDocument();

    const multiselectSearchInput = screen.getByTestId('multiselect-search-input');
    expect(multiselectSearchInput).toBeInTheDocument();
    fireEvent.input(multiselectSearchInput, { target: { value: 'Te' } });
    expect(screen.getByTestId('multisearch-listbox')).toBeInTheDocument();
  });
});
