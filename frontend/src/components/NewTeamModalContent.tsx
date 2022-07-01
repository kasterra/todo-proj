/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import { Suspense, useState } from 'react';
import NewTeamModalResult from './NewTeamModalResult';
import { postNewTeam } from 'lib/fetchData';

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

interface INewTeamModalContentProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTeamModalContent = ({ setVisible }: INewTeamModalContentProps) => {
  const [teamName, setTeamName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <Header>
        <img src="/icons/modal-users-plus.svg" alt="user-plus-icon" />
        <h3>New Team</h3>
      </Header>
      <Form>
        <span>New Team's Name</span>
        <input
          type="text"
          value={teamName}
          onChange={e => {
            setTeamName(e.target.value);
          }}
          placeholder="New Team Name"
        />
      </Form>

      <Suspense
        fallback={<RingLoader size={80} color={chakraTheme.colors.blue[500]} />}
      >
        <NewTeamModalResult
          teamName={teamName}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      </Suspense>

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
            postNewTeam(teamName);
            setVisible(false);
          }}
        >
          Continue
        </BottomButton>
      </BottomButtons>
    </>
  );
};

export default NewTeamModalContent;
