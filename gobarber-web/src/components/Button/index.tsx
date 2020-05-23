import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container loading={loading} type="button" {...rest}>
    {loading ? (
      <>
        <FiLoader />
        <p>Carregando</p>
      </>
    ) : (
      children
    )}
  </Container>
);

export default Button;
