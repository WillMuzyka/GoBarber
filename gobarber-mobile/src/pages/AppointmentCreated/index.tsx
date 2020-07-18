import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
  providerName: string;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkButtonPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    const formatted = format(
      routeParams.date,
      "eeee', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h\n'",
      { locale: ptBR },
    );

    return formatted.replace(/^./, formatted[0].toUpperCase());
  }, [routeParams]);

  return (
    <Container>
      <Icon name="check" size={60} color="#04D361" />

      <Title>Agendamento concluído</Title>

      <Description>
        {formattedDate}com {routeParams.providerName}
      </Description>

      <OkButton onPress={handleOkButtonPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
