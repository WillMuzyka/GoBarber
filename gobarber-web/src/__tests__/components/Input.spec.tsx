import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import { FiMail } from 'react-icons/fi';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        field: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should display input icon', async () => {
    const { getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={FiMail} />,
    );

    const iconInput = getByTestId('input-icon');

    await wait(() => {
      expect(iconInput).toBeTruthy();
    });
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerInput = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerInput).toHaveStyle('border-color: #ff9000;');
      expect(containerInput).toHaveStyle('color: #ff9000;');
    });
  });

  it('should remove highlight on input blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerInput = getByTestId('input-container');

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerInput).not.toHaveStyle('border-color: #ff9000;');
      expect(containerInput).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep highlight color on input blur if value is truthy', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerInput = getByTestId('input-container');
    const inputComponent = getByTestId('input-component');

    fireEvent.focus(inputElement);
    fireEvent.change(inputComponent, { target: { value: 'value' } });
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerInput).not.toHaveStyle('border-color: #ff9000;');
      expect(containerInput).toHaveStyle('color: #ff9000;');
    });
  });

  // it('should highlight red on input error', async () => {
  //   const { getByPlaceholderText, getByTestId } = render(
  //     <Input name="email" placeholder="E-mail" icon={FiMail} />,
  //   );

  //   error. = 'Error occurred';

  //   const inputElement = getByPlaceholderText('E-mail');
  //   const iconInput = getByTestId('input-icon');

  //   fireEvent.focus(inputElement);

  //   await wait(() => {
  //     expect(iconInput).toHaveStyle('color: #ff9000;');
  //   });
  // });
});
