import React from "react";
import { css, Global } from "@emotion/react";
import normalize from "emotion-normalize";
import Routes from "./pages/Routes";
import { appTheme } from "./themes/appTheme";

const theme = appTheme;

const App = () => {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          * {
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          body{
            background-color: ${theme.bgColor};
          }
        `}
      />
      <Routes />
    </>
  );
}

export default App;
