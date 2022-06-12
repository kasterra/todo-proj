import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { getUserInfoByEmail, queryKeys } from 'lib/fetchData';
import { useQuery } from 'react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';

const Container = styled.div`
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

interface IAddMemberModalResultProps {
  email: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<object>>;
}

const AddMemberModalResult = ({
  email,
  setIsSuccess,
  setData,
}: IAddMemberModalResultProps) => {
  const { data, isSuccess } = useQuery(
    queryKeys.userInfoByEmail(email),
    () => getUserInfoByEmail(email),
    { retry: false, enabled: !!email },
  );
  useEffect(() => {
    setIsSuccess(isSuccess);
    setData(data as object);
  }, [isSuccess, data]);
  return email ? (
    <Container>
      <img src={data?.data.image} alt="profile" />
      <div className="info">
        <span className="name">{data?.data.name}</span>
        <span className="email">{data?.data.email}</span>
      </div>
    </Container>
  ) : null;
};

export default AddMemberModalResult;
