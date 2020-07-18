import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  containerStyle?: {};
  hasChanged?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  containerStyle = {},
  hasChanged = true,
  ...rest
}) => (
  <Container style={containerStyle} hasChanged={hasChanged} {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
