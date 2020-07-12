import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ShowDatePickerButton,
  ShowDatePickerButtonText,
  Calendar,
  CalendarTitle,
  Schedule,
  ScheduleTitle,
  Period,
  PeriodTitle,
  PeriodContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface FormattedAvailabilityItem extends AvailabilityItem {
  hourFormatted: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);

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
        setAvailability(response.data);
        setSelectedHour(0);
      });
  }, [selectedProvider, selectedDate]);

  const handleProviderSelection = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDataPicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleSelectDate = useCallback(
    (event, date: Date | undefined) => {
      if (Platform.OS === 'android') handleToggleDataPicker();

      if (date) setSelectedDate(date);
    },
    [handleToggleDataPicker],
  );

  const handleSelectHour = useCallback((hour) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    if (selectedHour !== 0) {
      try {
        const date = new Date(selectedDate);

        date.setHours(selectedHour);
        date.setMinutes(0);

        await api.post('appointments', {
          provider_id: selectedProvider,
          date,
        });

        const provider = providers.find(
          (prov) => prov.id === selectedProvider,
        ) || { name: 'seu cabeleireiro' };

        navigate('AppointmentCreated', {
          date: date.getTime(),
          providerName: provider.name,
        });
      } catch (error) {
        Alert.alert(
          'Erro ao criar agendamento',
          'Ocorreu um erro ao tentar criar um agendamento, por favor tente novamente',
          [
            {
              text: 'Mais informações',
              onPress: () => Alert.alert(`${error.response.data.message}`),
            },
            {},
            {
              text: 'OK',
            },
          ],
        );
      }
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider, providers]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour <= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const noonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour > 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
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
              onChange={handleSelectDate}
              display="calendar"
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <ScheduleTitle>Escolha o horário</ScheduleTitle>

          <Period>
            <PeriodTitle>Manhã</PeriodTitle>

            <PeriodContent
              horizontal
              showsHorizontalScrollIndicator={false}
              data={morningAvailability}
              keyExtractor={(hourData) => hourData.hourFormatted}
              renderItem={({ item: hourData }) => (
                <Hour
                  onPress={() => handleSelectHour(hourData.hour)}
                  selected={hourData.hour === selectedHour}
                  available={hourData.available}
                  enabled={hourData.available}
                >
                  <HourText selected={hourData.hour === selectedHour}>
                    {hourData.hourFormatted}
                  </HourText>
                </Hour>
              )}
            />
          </Period>

          <Period>
            <PeriodTitle>Tarde</PeriodTitle>

            <PeriodContent
              horizontal
              showsHorizontalScrollIndicator={false}
              data={noonAvailability}
              keyExtractor={(hourData) => hourData.hourFormatted}
              renderItem={({ item: hourData }) => (
                <Hour
                  onPress={() => handleSelectHour(hourData.hour)}
                  selected={hourData.hour === selectedHour}
                  available={hourData.available}
                  enabled={hourData.available}
                >
                  <HourText selected={hourData.hour === selectedHour}>
                    {hourData.hourFormatted}
                  </HourText>
                </Hour>
              )}
            />
          </Period>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
