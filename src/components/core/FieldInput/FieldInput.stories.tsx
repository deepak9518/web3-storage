import React, { useCallback } from 'react';

import { Form, Formik } from 'formik';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FieldInput from './FieldInput';

export default {
  /**  👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Field Input',
  component: FieldInput,
} as ComponentMeta<typeof FieldInput>;

const handleSubmit = () => {};

export const NormalInput: ComponentStory<typeof FieldInput> = () => (
  <Formik
    initialValues={{
      storybookInput: '',
    }}
    onSubmit={handleSubmit}
  >
    <Form>
      <FieldInput name="storybookInput" label="Field Input" />
    </Form>
  </Formik>
);

export const ErrorInput: ComponentStory<typeof FieldInput> = () => (
  <Formik
    initialValues={{
      storybookInput: '',
    }}
    onSubmit={handleSubmit}
  >
    <Form>
      <FieldInput name="storybookInput" label="Field Input" error="Something is wrong" />
    </Form>
  </Formik>
);

export const ClearableInput: ComponentStory<typeof FieldInput> = () => (
  <Formik
    initialValues={{
      storybookInput: 'test',
    }}
    onSubmit={handleSubmit}
  >
    {({ values, setFieldValue }) => {
      const onClearClickHandler = useCallback(() => {
        setFieldValue('storybookInput', '');
      }, [setFieldValue]);
      return (
        <Form>
          <FieldInput
            clearable
            value={values.storybookInput}
            onClearClick={onClearClickHandler}
            name="storybookInput"
            label="Field Input"
          />
        </Form>
      );
    }}
  </Formik>
);

export const ClearableErrorInput: ComponentStory<typeof FieldInput> = () => (
  <Formik
    initialValues={{
      storybookInput: 'test',
    }}
    onSubmit={handleSubmit}
  >
    {({ values, setFieldValue }) => {
      const onClearClickHandler = useCallback(() => {
        setFieldValue('storybookInput', '');
      }, [setFieldValue]);
      return (
        <Form>
          <FieldInput
            clearable
            value={values.storybookInput}
            onClearClick={onClearClickHandler}
            name="storybookInput"
            label="Field Input"
            error="Something is wrong"
          />
        </Form>
      );
    }}
  </Formik>
);
