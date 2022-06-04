import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const FormBoxContainer = styled.div`
  margin-top: 22px;
  background-color: #fff;
  border: 1px solid ${chakraTheme.colors.gray[200]};
  box-shadow: ${chakraTheme.shadows.base};
  border-radius: 12px;
  width: 610px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  & > input:not(:first-of-type) {
    margin-top: 15px;
  }
`;

export const Title = styled.h3`
  font-weight: 700;
  font-size: 20px;
`;

export const Divider = styled.div`
  width: 530px;
  height: 2px;
  background: #d9d9d9;
`;

export const Input = styled.input`
  background: ${chakraTheme.colors.whiteAlpha[100]};
  border: 1px solid ${chakraTheme.colors.blackAlpha[500]};
  border-radius: 4px;
  padding: 6px 12px;
  width: 100%;
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${chakraTheme.colors.blackAlpha[500]};
  }
`;

export const MidBtn = styled.button`
  display: block;
  padding: 12px 45px;
  background: ${chakraTheme.colors.green[400]};
  border-radius: 6px;
  color: #fff;
  margin-top: 20px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
`;

export const OAuthBtn = styled(Link)`
  box-sizing: content-box;
  width: 328px;
  display: flex;
  padding: 9px 0px;
  font-weight: 600;
  font-size: 12px;
  border-radius: 3px;
  img {
    padding-left: 10px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const FormError = styled.p`
  margin: 0;
  color: #bf1650;
  align-self: flex-start;
  margin-top: 5px;
  padding-left: 5px;
  &::before {
    display: inline;
    content: '⚠ ';
  }
`;
