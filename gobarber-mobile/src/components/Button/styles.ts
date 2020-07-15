import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  hasChanged: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  align-items: center;
  justify-content: center;

  ${props => !props.hasChanged &&
  css`
    opacity: 0.3;
  `}
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #312e38;
`;
