/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'mockAxios';
import {
  FormBoxContainer,
  FormContainer,
  FormError,
  Input,
  MidBtn,
  OAuthBtn,
  Title,
} from 'components/FormComponents';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 55px;
`;
interface IFormInputs {
  ID: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: IFormInputs) => {
    toast
      .promise(axios.post('/api/login', data), {
        loading: 'Loading',
        success: 'Login successful',
        error: e => e.response.data,
      })
      .then(() => navigate('/'));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  return (
    <Container>
      <Link to="/">
        <img src="/logo/main%20logo.svg" alt="main logo" />
      </Link>
      <FormBoxContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title
            css={css`
              margin-top: 20px;
              margin-bottom: 24px;
            `}
          >
            Log in with your account
          </Title>
          <Input
            type="text"
            {...register('ID', {
              required: 'nickname or email is required',
            })}
            placeholder="nickname or email"
          />
          {errors.ID?.message && <FormError>{errors.ID.message}</FormError>}
          <Input
            type="password"
            {...register('password', {
              required: 'password is required',
            })}
            placeholder="password"
          />
          {errors.password?.message && (
            <FormError>{errors.password.message}</FormError>
          )}
          <MidBtn
            type="submit"
            css={css`
              margin-bottom: 32px;
            `}
          >
            Log in
          </MidBtn>
        </FormContainer>
      </FormBoxContainer>
      <FormBoxContainer>
        <Title
          css={css`
            margin-top: 22px;
            margin-bottom: 30px;
          `}
        >
          Or continue with social account
        </Title>
        <OAuthBtn
          to="#"
          css={css`
            background: #1a202c;
            color: #fff;
            margin-bottom: 20px;
          `}
        >
          <img src="/logo/github-w.svg" alt="github" />
          <span>Continue With Github</span>
        </OAuthBtn>
        <OAuthBtn
          to="#"
          css={css`
            background: #4285f4;
            color: #fff;
            margin-bottom: 60px;
          `}
        >
          <img src="/logo/google.svg" alt="google logo" />
          <span>Continue With Google</span>
        </OAuthBtn>
      </FormBoxContainer>
    </Container>
  );
};

export default Login;
