import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  containerStyle?: {};
}

const Button: React.FC<ButtonProps> = ({
  children,
  containerStyle = {},
  ...rest
}) => (
  <Container style={containerStyle} {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
