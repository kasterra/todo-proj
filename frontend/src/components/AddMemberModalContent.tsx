/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import React, { Suspense, useRef, useState } from 'react';
import AddMemberModalResult from './AddMemberModalResult';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 36px;
  img {
    width: 48px;
    height: 48px;
  }
  h3 {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: ${chakraTheme.colors.gray[900]};
  }
`;

const Form = styled.form`
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${chakraTheme.colors.gray[700]};
    align-self: flex-start;
  }
  input {
    background: #fff;
    border: 1px solid ${chakraTheme.colors.gray[200]};
    border-radius: 6px;
    padding: 6px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    &::placeholder {
      color: ${chakraTheme.colors.blackAlpha[500]};
    }
  }
`;

const BottomButtons = styled.div`
  display: flex;
  gap: 50px;
  margin: 24px 0px;
`;

const BottomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  &.continue {
    background: ${chakraTheme.colors.teal[500]};
    color: #fff;
    &:disabled {
      opacity: 0.5;
    }
  }
`;

const ErrorCard = styled.div`
  box-shadow: ${chakraTheme.shadows.md};
  width: 264px;
  height: 104px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 11px;
  margin-top: 20px;
  img {
    width: 24px;
    height: 24px;
  }
  .texts {
    display: flex;
    flex-direction: column;
    gap: 15px;
    .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    }
    .description {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

interface IAddMemberModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberModalContent = ({ setVisible }: IAddMemberModalProps) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<object>({});
  const { reset } = useQueryErrorResetBoundary();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Header>
        <img src="/icons/modal-user-plus.svg" alt="user-plus-icon" />
        <h3>Adding Teammate</h3>
      </Header>
      <Form>
        <span>New Teammate's info</span>
        <input
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            buttonRef.current?.click();
          }}
          placeholder="Email or name"
        />
      </Form>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => {
          return (
            <ErrorCard>
              <img src="/icons/alert-triangle-r.svg" alt="alert" />
              <div className="texts">
                <span className="title">Opps! No user found</span>
                <span className="description">
                  Please check teammate's info
                  <hr />
                  and try again
                  <button
                    ref={buttonRef}
                    onClick={() => {
                      resetErrorBoundary();
                    }}
                  />
                </span>
              </div>
            </ErrorCard>
          );
        }}
      >
        <Suspense
          fallback={
            <RingLoader size={80} color={chakraTheme.colors.blue[500]} />
          }
        >
          <AddMemberModalResult
            email={email}
            setIsSuccess={setIsSuccess}
            setData={setData}
          />
        </Suspense>
      </ErrorBoundary>
      <BottomButtons>
        <BottomButton
          onClick={() => setVisible(false)}
          css={css`
            background: #f7fafc;
            border: 1px solid ${chakraTheme.colors.gray[300]};
          `}
        >
          Cancel
        </BottomButton>
        <BottomButton
          className="continue"
          disabled={!isSuccess}
          onClick={() => {
            console.log(data);
            setVisible(false);
          }}
        >
          Continue
        </BottomButton>
      </BottomButtons>
    </>
  );
};

export default AddMemberModalContent;
