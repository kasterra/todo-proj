import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { getTeamInfoByTeamName, queryKeys } from 'lib/fetchData';
import { useQuery } from 'react-query';

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
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

const NewTeamModalResult = ({
  teamName,
  isSuccess,
  setIsSuccess,
}: INewTeamModalResultProps) => {
  const { data } = useQuery(queryKeys.teamInfoByTeamName(teamName), () =>
    getTeamInfoByTeamName(teamName),
  );
  useEffect(() => {
    if (data) setIsSuccess(Object.keys(data.data).length === 0);
  }, [setIsSuccess, data]);
  return teamName ? (
    isSuccess ? (
      <Container>
        <img src="/icons/modal-check.svg" alt="check" />
        <div className="info">
          <span className="title">Awesome Name</span>
          <span className="detail">Good To go!</span>
        </div>
      </Container>
    ) : (
      <Container>
        <img src="/icons/modal-x.svg" alt="x" />
        <div className="info">
          <span className="title">Already In Use</span>
          <span className="detail">please use another name</span>
        </div>
      </Container>
    )
  ) : null;
};

export default NewTeamModalResult;
