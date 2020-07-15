import React, { useCallback, useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  BackButton,
  UserAvatar,
  CameraIcon,
  Title,
  AvatarButton,
} from './styles';

interface UserUpdateData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface DimensionsProps {
  width: number;
  height: number;
}

const SignUp: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleUpdate = useCallback(
    async (data: UserUpdateData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),

          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().min(6, 'A senha deve ter 6 digitos'),
            otherwise: Yup.string()
              .ensure()
              .length(0, 'Preencha a Senha atual'),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string()
              .oneOf([Yup.ref('password')], 'Confirmação incorreta')
              .required('Digite sua nova senha'),
            otherwise: Yup.string()
              .ensure()
              .length(0, 'Preencha a Senha atual'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('profile', formData);
        await updateUser(response.data);

        navigation.goBack();

        Alert.alert('Perfil atualizado com sucesso!');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        if (error.status) {
          Alert.alert(error.message);
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro na atualização do seu perfil, tente novamente.',
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
    },
    [navigation, updateUser],
  );

  const handleAvatarUpdate = useCallback(async () => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma foto de avatar',
        cancelButtonTitle: 'Cancelar',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        takePhotoButtonTitle: 'Tirar uma foto',
        allowsEditing: true,
      },
      async (response) => {
        if (response.didCancel) {
          return;
        }

        const updateError = (): void => {
          Alert.alert(
            'Ocorreu um erro ao atualizar avatar',
            'Ocorreu um erro na atualização da sua foto do avatar, tente novamente.',
            [
              {
                text: 'Mais informações',
                onPress: () => Alert.alert(`${response.error}`),
              },
              {},
              {
                text: 'OK',
              },
            ],
          );
        };
        if (response.error) {
          updateError();
          return;
        }

        const dimensionsPromise = new Promise<DimensionsProps>(
          (resolve, reject) => {
            Image.getSize(
              response.uri,
              (width, height) => {
                resolve({ width, height });
              },
              (error) => reject(error),
            );
          },
        );

        const dimensions = await dimensionsPromise;
        const cropData = {
          offset: { x: 0, y: 0 },
          size: {
            width: dimensions.width,
            height: dimensions.width,
          },
          displaySize: {
            width: 400,
            height: 400,
          },
        };

        const uri = await ImageEditor.cropImage(response.uri, cropData);

        const data = new FormData();
        data.append('avatar', {
          uri,
          name: `${user.id}.jpg`,
          type: 'image/jpeg',
        });

        api.patch('users/avatar', data).then((patchResponse) => {
          updateUser(patchResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Header>
              <BackButton onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="#999591" />
              </BackButton>

              <AvatarButton onPress={handleAvatarUpdate}>
                <UserAvatar source={{ uri: user.avatar_url }} />
                <CameraIcon>
                  <Icon name="camera" size={24} color="#312E38"/>
                </CameraIcon>
              </AvatarButton>
            </Header>

            <Title>Meu perfil</Title>

            <Form initialData={user} ref={formRef} onSubmit={handleUpdate}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                autoCapitalize="none"
                secureTextEntry
                name="old_password"
                icon="lock"
                containerStyle={{ marginTop: 24 }}
                placeholder="Senha atual"
                textContentType="password"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                autoCapitalize="none"
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confPasswordInputRef}
                autoCapitalize="none"
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => formRef.current?.submitForm()}
                containerStyle={{ marginBottom: 24 }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
