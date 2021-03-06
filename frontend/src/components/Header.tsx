/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { authState } from 'atoms/authAtoms';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import { theme } from '@chakra-ui/react';

const Container = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-left: 12px;
`;

const Buttons = styled.div`
  display: flex;
  & *:not(:last-child) {
    margin-right: 11px;
  }
  margin-right: 25px;
`;

const Button = styled.div`
  height: 40px;
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  & img {
    margin-right: 8px;
  }
`;
const SignOutBtn = () => (
  <Button
    css={css`
      background: ${theme.colors.red[500]};
      color: white;
    `}
  >
    <img src="/icons/log-out-03.svg" alt="signup" />
    <span>Log out</span>
  </Button>
);

const NotLoggedInBtns = () => {
  return (
    <>
      <Link to="/login">
        <Button
          css={css`
            border: 1px solid ${theme.colors.gray[200]};
            background-color: transparent;
          `}
        >
          <img src="/icons/log-in-01.svg" alt="login" />
          <span>Log in</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          css={css`
            background: ${theme.colors.blue[400]};
            color: white;
          `}
        >
          <img src="/icons/user-plus-01.svg" alt="signup" />
          <span>Sign up</span>
        </Button>
      </Link>
    </>
  );
};

const Header = () => {
  const { token } = useAtomValue(authState);
  return (
    <Container>
      <img src="/logo/top%20logo.svg" alt="logo" />
      <Buttons>{token === '' ? <NotLoggedInBtns /> : <SignOutBtn />}</Buttons>
    </Container>
  );
};

export default Header;
