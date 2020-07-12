import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-size: 14px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;

  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  width: 100px;
  border-radius: 10px;
  background-color: #ff9000;

  margin-top: 40px;

  align-items: center;
  justify-content: center;
`;

export const OkButtonText = styled.Text`
  padding: 16px;
  color: #312e38;
  font-size: 14px;
`;
