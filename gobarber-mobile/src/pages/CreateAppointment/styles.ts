import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}

  background-color: #28262e;

  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;

  margin-left: 24px;
  flex: 1;
`;

export const UserAvatar = styled.Image`
  width: 54px;
  height: 54px;

  border-radius: 27px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)<ProviderProps>`
  margin-right: 16px;
  padding: 8px;
  border-radius: 10px;
  height: 48px;

  background-color: ${(props) => (props.selected ? '#ff9000' : '#3E3B47')};

  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;

  margin-right: 8px;
`;

export const ProviderName = styled.Text<ProviderProps>`
  font-size: 14px;
  font-family: 'RobotoSlab-Medium';
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
`;
