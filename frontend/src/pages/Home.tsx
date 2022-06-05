/** @jsxImportSource @emotion/react */
import Header from 'components/Header';
import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { authAtom } from 'atoms/authAtoms';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentArea = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 60px;
`;

const SubTitle = styled.h3`
  font-weight: 700;
  font-size: 36px;
`;

const Buttons = styled.div`
  display: flex;
  & a:not(:last-child) {
    margin-right: 40px;
  }
`;

const Button = styled.div`
  box-sizing: content-box;
  height: 40px;
  padding: 10px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: 600;
  font-size: 18px;
  & img {
    margin-right: 8px;
  }
`;

const DevContainer = styled.div``;

const RoleText = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 16px;
`;

const Home = () => {
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);
  useEffect(() => {
    if (auth) {
      navigate('/dashboard');
    }
    console.log(auth);
  }, [auth]);
  return (
    <>
      <Header />
      <Container
        css={css`
          padding-top: 100px;
          padding-left: 125px;
          margin-right: 222px;
          margin-bottom: 62px;
        `}
      >
        <ContentArea
          css={css`
            flex-direction: column;
          `}
        >
          <Title
            css={css`
              margin-bottom: 55px;
            `}
          >
            Beyond the simple Todo Board
          </Title>
          <SubTitle
            css={css`
              margin-bottom: 50px;
            `}
          >
            Remind schedule for you and your teammates.
          </SubTitle>
          <Buttons>
            <Link to="/signup">
              <Button
                css={css`
                  background-color: ${chakraTheme.colors.blue[500]};
                  color: #fff;
                `}
              >
                <span>Sign up For Todo App Now</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button
                css={css`
                  background: ${chakraTheme.colors.gray[200]};
                  border: 1px solid ${chakraTheme.colors.gray[200]};
                `}
              >
                <img src="/icons/log-in-01.svg" alt="Log In" />
                <span>Already have an account? Log in!</span>
              </Button>
            </Link>
          </Buttons>
        </ContentArea>
        <ContentArea
          css={css`
            margin-top: -30px;
          `}
        >
          <img src="/icons/check-broken.svg" alt="check-broken" />
        </ContentArea>
      </Container>
      <Container
        css={css`
          margin-left: 126px;
          flex-direction: column;
        `}
      >
        <SubTitle
          css={css`
            margin-bottom: 92px;
          `}
        >
          Developed By
        </SubTitle>
        <ContentArea>
          <DevContainer
            css={css`
              margin-right: 75px;
            `}
          >
            <img
              src="/logo/kasterra.png"
              alt="kasterra"
              width="230"
              height="160"
            />
            <RoleText>Frontend & Design</RoleText>
            <div
              css={css`
                display: flex;
                & > *:not(:last-child) {
                  margin-right: 5px;
                }
              `}
            >
              <span>kasterra</span>
              <a href="https://github.com/kasterra">
                <img src="/logo/github.svg" alt="github" />
              </a>
            </div>
          </DevContainer>
          <DevContainer>
            <img
              src="/logo/kadrick.png"
              alt="kadrick"
              width="130"
              height="160"
            />
            <RoleText>Backend & DB</RoleText>
            <div
              css={css`
                display: flex;
                & > *:not(:last-child) {
                  margin-right: 5px;
                }
              `}
            >
              <span>Kadrick</span>
              <a href="https://github.com/kadrick">
                <img src="/logo/github.svg" alt="github" />
              </a>
            </div>
          </DevContainer>
        </ContentArea>
      </Container>
    </>
  );
};

export default Home;
