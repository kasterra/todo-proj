/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'mockAxios';
import {
  FormBoxContainer,
  FormContainer,
  Title,
  FormError,
  MidBtn,
  OAuthBtn,
  Input,
  Divider,
} from 'components/FormComponents';
import toast from 'react-hot-toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 55px;
`;

interface IFormInputs {
  nickname: string;
  email: string;
  password: string;
  password2: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>({
    criteriaMode: 'all',
  });
  const onSubmit = async (data: IFormInputs) => {
    toast
      .promise(axios.post('/api/signup', data), {
        loading: 'Loading',
        success: 'Account Created Successfully',
        error: err => err.response.data,
      })
      .then(() => navigate('/login'));
  };
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
            Sign Up For Your Account
          </Title>
          <Input
            type="text"
            {...register('nickname', {
              required: 'nickname is required',
            })}
            placeholder="nickname"
          />
          {errors.nickname?.message && (
            <FormError>{errors.nickname.message}</FormError>
          )}
          <Input
            type="email"
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email address',
              },
            })}
            placeholder="Email"
          />
          {errors.email?.message && (
            <FormError>{errors.email.message}</FormError>
          )}
          <Input
            type="password"
            {...register('password', {
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'Please enter at least 8 characters',
              },
              validate: {
                atLeastOneUpperCase: v =>
                  /.*[A-Z]/.test(v) ||
                  'password must contain at least one uppercase',
                atLeastOneLowerCase: v =>
                  /.*[a-z]/.test(v) ||
                  'password must contain at least one lowercase',
                atLeastOneDigit: v =>
                  /.*[0-9]/.test(v) ||
                  'password must contain at least one digit',
                atLeastOneSpecialCharacter: v =>
                  /[^A-Za-z0-9]/.test(v) ||
                  'password must contain at least one special character',
              },
            })}
            placeholder="Password"
          />
          {errors.password?.message && (
            <FormError>{errors.password.message}</FormError>
          )}
          <Input
            type="password"
            {...register('password2', {
              required: 'password validation is required',
              validate: {
                samePassword: v =>
                  v === watch('password') ||
                  'password and password validation must match',
              },
            })}
            placeholder="Password Confirm"
          />
          {errors.password2?.message && (
            <FormError>{errors.password2.message}</FormError>
          )}
          <MidBtn type="submit">Continue</MidBtn>
        </FormContainer>
        <Divider
          css={css`
            margin-top: 50px;
            margin-bottom: 45px;
          `}
        />
        <Title
          css={css`
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

export default Signup;
