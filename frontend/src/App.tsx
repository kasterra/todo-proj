import React from 'react';
import { css, Global } from '@emotion/react';
import normalize from 'emotion-normalize';
import { theme as chakraTheme } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './pages/Routes';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            custom: {
              duration: 5000,
            },
          }}
        />
        <Global
          styles={css`
            ${normalize}
            * {
              box-sizing: border-box;
              background-color: transparent;
              border: none;
              font: ${chakraTheme.fonts.body};
            }
            a {
              text-decoration: none;
              color: inherit;
            }
            button:not([disabled]) {
              cursor: pointer;
            }
            body {
              background-color: #f5f5f5;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
              font: ${chakraTheme.fonts.heading};
            }
          `}
        />
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
