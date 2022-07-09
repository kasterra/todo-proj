/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useRef } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import UserDashboardMainContent from 'components/UserDashboardMainContent';
import BarLoader from 'react-spinners/BarLoader';

const UserDashBoard = () => {
  const { userId } = useParams() as { userId: string };
  const { reset } = useQueryErrorResetBoundary();
  const resetBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
            align-items: center;
            img {
              width: 200px;
              height: 200px;
            }
          `}
        >
          <img src="/icons/alert-y.svg" alt="alert" />
          <h2>User Not Found. Please check your URL and try again.</h2>
          <button
            ref={resetBtnRef}
            onClick={() => resetErrorBoundary()}
          ></button>
        </div>
      )}
    >
      <Suspense
        fallback={
          <div
            css={css`
              width: 100%;
              height: calc(100vh - 182px);
              display: flex;
              flex-direction: column;
              gap: 10px;
              justify-content: center;
              align-items: center;
            `}
          >
            <BarLoader width={100} color={chakraTheme.colors.blue[500]} />
            <h2>Loading User Info...</h2>
          </div>
        }
      >
        <UserDashboardMainContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default UserDashBoard;
