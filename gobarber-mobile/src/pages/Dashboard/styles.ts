import { Platform, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: #666360;
`;

export const UserName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #ff9000;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProvidersListHeader = styled.Text`
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin-bottom: 24px;
`;

export const ProviderContainer = styled(RectButton)`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #3e3b47;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin-bottom: 8px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 8px;
`;

export const ProviderMetaText = styled.Text`
  color: #999591;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';

  margin-left: 12px;
`;
