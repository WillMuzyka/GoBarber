import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

interface RouteParams {
  providerId: string;
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

  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  useEffect(() => {
    api.get('providers').then((response) => setProviders(response.data));
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => setSelectedProvider(provider.id)}
            selected={provider.id === selectedProvider}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderName selected={provider.id === selectedProvider}>
              {provider.name}
            </ProviderName>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default CreateAppointment;
