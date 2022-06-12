import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getTeamInfoByTeamName, queryKeys } from 'lib/fetchData';

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
    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }
    .detail {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

interface INewTeamModalResultProps {
  teamName: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

const NewTeamModalResult = ({
  teamName,
  setIsSuccess,
}: INewTeamModalResultProps) => {
  const { isSuccess } = useQuery(
    queryKeys.teamInfoByTeamName(teamName),
    () => getTeamInfoByTeamName(teamName),
    { retry: false, enabled: !!teamName },
  );
  useEffect(() => {
    setIsSuccess(isSuccess);
  }, [isSuccess]);
  return teamName ? (
    <Container>
      <img src="/icons/modal-check.svg" alt="check" />
      <div className="info">
        <span className="title">Awesome Name</span>
        <span className="detail">Good To go!</span>
      </div>
    </Container>
  ) : null;
};

export default NewTeamModalResult;
