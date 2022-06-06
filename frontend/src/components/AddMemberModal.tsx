/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import axios from 'mockAxios';
import { useQuery } from 'react-query';
import RingLoader from 'react-spinners/RingLoader';
import { useState } from 'react';

interface IWrapper {
  visible: boolean;
}

const Wrapper = styled.div<IWrapper>`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: ${chakraTheme.colors.blackAlpha[500]};
  width: 100%;
  height: calc(100% - 178px);
  z-index: 1;
`;

const Container = styled.div`
  position: absolute;
  width: 500px;
  background: #fff;
  border: 1px solid #718096;
  box-shadow: ${chakraTheme.shadows.lg};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

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

const PersonCard = styled.div`
  box-shadow: ${chakraTheme.shadows.md};
  background: #f7fafc;
  border-radius: 10px;
  display: flex;
  gap: 16px;
  margin-top: 20px;
  padding: 24px 38px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    color: #000;
    .name {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }
    .email {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
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
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMemberModal = ({ visible, setVisible }: IAddMemberModalProps) => {
  const [email, setEmail] = useState('');
  const {
    data: response,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ['userInfo', email],
    () =>
      axios.post<{
        image: string;
        name: string;
        email: string;
      }>(`${process.env.REACT_APP_API_BASE_URL}/user/search`, {
        email,
      }),
    { retry: false },
  );

  return (
    <Wrapper visible={visible} onClick={() => setVisible(false)}>
      <Container onClick={e => e.stopPropagation()}>
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
              onChange={e => setEmail(e.target.value)}
            />
          </Form>
          {isSuccess && (
            <PersonCard>
              <img src={response.data.image} alt="profile" />
              <div className="info">
                <span className="name">{response.data.name}</span>
                <span className="email">{response.data.email}</span>
              </div>
            </PersonCard>
          )}
          {email && isLoading && (
            <RingLoader size={80} color={chakraTheme.colors.blue[500]} />
          )}
          {email && isError && (
            <ErrorCard>
              <img src="/icons/alert-triangle-r.svg" alt="alert" />
              <div className="texts">
                <span className="title">Opps! No user found</span>
                <span className="description">
                  Please check teammate's info
                  <hr />
                  and try again
                </span>
              </div>
            </ErrorCard>
          )}
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
                console.log(response!.data);
                setVisible(false);
              }}
            >
              Continue
            </BottomButton>
          </BottomButtons>
        </>
      </Container>
    </Wrapper>
  );
};

export default AddMemberModal;
