import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ShowDatePickerButton,
  ShowDatePickerButtonText,
  Calendar,
  CalendarTitle,
} from './styles';

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayAvailability, setDayAvailability] = useState<AvailabilityItem[]>(
    [],
  );

  // Get providers
  useEffect(() => {
    api.get('providers').then((response) => setProviders(response.data));
  }, []);

  // Get day availability
  useEffect(() => {
    const params = {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    };

    api
      .get(`providers/${selectedProvider}/day-availability`, { params })
      .then((response) => {
        setDayAvailability(response.data);
      });
  }, [selectedProvider, selectedDate]);

  const handleProviderSelection = useCallback((providerId) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDataPicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback(
    (event, date: Date | undefined) => {
      if (Platform.OS === 'android') handleToggleDataPicker();

      if (date) setSelectedDate(date);
    },
    [handleToggleDataPicker],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleProviderSelection(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <CalendarTitle>Escolha a data</CalendarTitle>

        <ShowDatePickerButton onPress={handleToggleDataPicker}>
          <ShowDatePickerButtonText>
            Selecionar outra data
          </ShowDatePickerButtonText>
        </ShowDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            textColor="#f4ede8"
            onChange={handleDateChange}
            display="calendar"
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
