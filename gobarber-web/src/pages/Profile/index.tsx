import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import { Container, Content, AnimationContainer, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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

        const response = await api.put('/profile', formData);

        updateUser(response.data);
        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Suas informações foram atualizadas com sucesso!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        if (error.status) {
          addToast({
            type: 'error',
            title: error.message,
          });
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar perfil',
          description:
            'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <AnimationContainer>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
