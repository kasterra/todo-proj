/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
import { useRecoilState } from 'recoil';
import { authAtom } from 'atoms/authAtoms';
import { useCallback, useEffect } from 'react';
import { requestLogin } from 'lib/fetchData';

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
  const [auth, setAuth] = useRecoilState(authAtom);

  const onSubmit = useCallback(
    async (data: IFormInputs) => {
      toast
        .promise(requestLogin(data.ID, data.Password), {
          loading: 'Loading',
          success: 'Login successful',
          error: e => e.response.data,
        })
        .then(res => {
          setAuth({
            AccessToken: res.data.AccessToken,
            RefreshToken: res.data.RefreshToken,
          });
          navigate('/');
        });
    },
    [navigate, setAuth],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (auth.AccessToken) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return (
    <Container>
      <Link to="/">
        <img src="/logo/main%20logo.svg" alt="main logo" />
      </Link>
      <FormBoxContainer
        css={css`
          margin-top: 24px;
        `}
      >
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
