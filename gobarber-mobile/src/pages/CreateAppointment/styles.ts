import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider, FormattedAvailabilityItem } from './index';

interface ProviderProps {
  selected: boolean;
}

interface HourProps {
  selected: boolean;
  available?: boolean;
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

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View``;

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

export const ShowDatePickerButton = styled(RectButton)`
  height: 46px;
  background-color: #ff9000;
  border-radius: 10px;
  margin: 0 24px;

  align-items: center;
  justify-content: center;
`;

export const ShowDatePickerButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #232129;
`;

export const Calendar = styled.View``;

export const CalendarTitle = styled.Text`
  margin: 0 24px 24px;
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const Schedule = styled.View`
  margin: 24px;
`;

export const ScheduleTitle = styled.Text`
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin-bottom: 4px;
`;

export const Period = styled.View``;

export const PeriodTitle = styled.Text`
  font-size: 14px;
  font-family: 'RobotoSlab-Medium';
  color: #999591;

  margin: 24px 0 12px;
`;

export const PeriodContent = styled(
  FlatList as new () => FlatList<FormattedAvailabilityItem>,
)``;

export const Hour = styled(RectButton)<HourProps>`
  background-color: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  padding: 12px;
  font-size: 14px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background-color: #ff9000;
  border-radius: 10px;
  margin: 0 24px 24px;

  align-items: center;
  justify-content: center;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: #232129;
`;
