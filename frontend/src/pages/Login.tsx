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
import { useSetAtom } from 'jotai';
import { authAtom } from 'atoms/authAtoms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 55px;
`;
interface IFormInputs {
  ID: string;
  Password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const setAuthAtom = useSetAtom(authAtom);
  const onSubmit = async (data: IFormInputs) => {
    toast
      .promise(
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/SignIn`, {
          Email: data.ID,
          Password: data.Password,
        }),
        {
          loading: 'Loading',
          success: 'Login successful',
          error: e => e.response.data,
        },
      )
      .then(res => {
        setAuthAtom(res.data.Token);
        navigate('/');
      });
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
              required: 'email info is required',
            })}
            placeholder="email"
          />
          {errors.ID?.message && <FormError>{errors.ID.message}</FormError>}
          <Input
            type="password"
            {...register('Password', {
              required: 'password is required',
            })}
            placeholder="password"
          />
          {errors.Password?.message && (
            <FormError>{errors.Password.message}</FormError>
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
