import { render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import { COLORS } from 'src/constants/colors';

import FieldInput, { IInputProps } from './FieldInput';

const handleSubmit = jest.fn();

const renderFieldInput = (overrideProps: IInputProps = { name: 'testInput' }) =>
  render(
    <Formik
      initialValues={{
        [overrideProps.name]: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <FieldInput {...overrideProps} />
      </Form>
    </Formik>
  );

describe('FieldInput', () => {
  test('renders field input', () => {
    renderFieldInput();
    const fieldInput = screen.getByTestId('testInput-field-input');
    expect(fieldInput).toBeInTheDocument();
    expect(fieldInput).toHaveStyle(`border: 1px solid ${COLORS.BLACK_100};`);

    const crossIcon = screen.queryByTestId('cross-icon');
    expect(crossIcon).toBeNull();
  });

  test('renders error field input', () => {
    renderFieldInput({ error: 'Something went wrong', name: 'testInput' });

    const fieldInput = screen.getByTestId('testInput-field-input');
    expect(fieldInput).toBeInTheDocument();
    expect(fieldInput).toHaveClass('error-field');

    const crossIcon = screen.queryByTestId('cross-icon');
    expect(crossIcon).toBeNull();
  });

  test('renders clearable error field input', () => {
    renderFieldInput({ error: 'Something went wrong', name: 'testInput', clearable: true, value: 'test' });

    const fieldInput = screen.getByTestId('testInput-field-input');
    expect(fieldInput).toBeInTheDocument();
    expect(fieldInput).toHaveClass('error-field');

    const crossIcon = screen.getByTestId('cross-icon');
    expect(crossIcon).toBeInTheDocument();
  });
  test('renders clearable field input', () => {
    renderFieldInput({ name: 'testInput', clearable: true, value: 'test' });

    const fieldInput = screen.getByTestId('testInput-field-input');
    expect(fieldInput).toBeInTheDocument();
    expect(fieldInput).toHaveStyle(`border: 1px solid ${COLORS.BLACK_100};`);

    const crossIcon = screen.getByTestId('cross-icon');
    expect(crossIcon).toBeInTheDocument();
  });
});
