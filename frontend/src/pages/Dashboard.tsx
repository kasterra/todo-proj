/** @jsxImportSource @emotion/react */
import { useAtomValue } from 'jotai';
import { Suspense, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PulseLoader from 'react-spinners/PulseLoader';
import { authAtom } from 'atoms/authAtoms';
import Header from 'components/Header';
import { theme as chakraTheme } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from '@emotion/react';

const Menus = styled.div`
  display: flex;
  width: fit-content;
  margin-top: 24px;
  margin-left: 28px;
  margin-bottom: 22px;
  border-radius: 0.25rem;
  padding: 5px;
  line-height: 24px;
  background-color: ${chakraTheme.colors.gray[50]};
`;

const MenuTab = styled(Link)<{ active: boolean | undefined }>`
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  padding: 8px 16px;
  border-bottom: 2px solid
    ${props =>
      props.active
        ? chakraTheme.colors.blue[600]
        : chakraTheme.colors.blue[300]};
  font-weight: 400;
  font-size: 16px;
  color: ${props =>
    props.active ? chakraTheme.colors.blue[600] : chakraTheme.colors.blue[300]};
  &:not(:last-child) {
    margin-right: 20px;
  }
  &:hover {
    border-bottom: 2px solid ${chakraTheme.colors.blue[600]};
    background-color: ${chakraTheme.colors.blackAlpha[100]};
  }
`;

const DashboardPlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 48px;
  margin-bottom: 30px;
  background-color: ${chakraTheme.colors.gray[100]};
  height: calc(100vh - 208px);
  border-radius: 1rem;
`;

const MessageHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    width: 250px;
    height: 250px;
    margin-bottom: 50px;
  }
  & h3 {
    font-size: ${chakraTheme.fontSizes['4xl']};
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);
  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth]);
  return (
    <>
      <Header />
      <Menus>
        <MenuTab
          to="team"
          active={window.location.href.includes('/team') || undefined}
        >
          Team DashBoard
        </MenuTab>
        <MenuTab
          to="user/222"
          active={window.location.href.includes('/user') || undefined}
        >
          User DashBoard
        </MenuTab>
      </Menus>
      <ErrorBoundary fallback={<span>error</span>}>
        <Suspense
          fallback={
            <div
              css={css`
                width: 100%;
                height: calc(100vh - 178px);
                display: flex;
                flex-direction: column;
                gap: 20px;
                justify-content: center;
                align-items: center;
              `}
            >
              <PulseLoader color={chakraTheme.colors.blue[500]} />
              <h2>Loading Dashboard...</h2>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      {(window.location.href.endsWith('/dashboard') ||
        window.location.href.endsWith('/dashboard/')) && (
        <DashboardPlaceHolder>
          <MessageHolder>
            <img src="/icons/file-03.svg" alt="file-03" />
            <h3>Select category to use menus</h3>
          </MessageHolder>
        </DashboardPlaceHolder>
      )}
    </>
  );
};

export default Dashboard;
