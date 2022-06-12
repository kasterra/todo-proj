/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import { useRef, useState, useCallback, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Table from './Table';
import { getTeamInfoByTeamId, queryKeys, updateTeamName } from 'lib/fetchData';

const MainContent = styled.div`
  width: 100%;
`;
const TeamDashBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 45px;
`;

const HeaderInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 4px;
  width: 400px;
  background: #fff;
  border: 1px solid ${chakraTheme.colors.gray[200]};
  border-radius: 12px;
  color: ${chakraTheme.colors.gray[700]};
  & h4 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
  & h3,
  & input {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    padding-bottom: 5px;
    width: 300px;
    &:disabled {
      color: inherit;
    }
  }
  & input:not(:disabled) {
    border-bottom: 1px solid ${chakraTheme.colors.gray[600]};
  }
`;
const NameAndRole = styled.div`
  display: flex;
  gap: 40px;
  height: fit-content;
`;

const TeamControllButtons = styled.div`
  display: flex;
  gap: 25px;
  margin-right: 90px;
`;

const TeamButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: min-content;
  padding: 15px 24px;
  gap: 8px;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  & img {
    width: 18px;
    height: 18px;
  }
`;

const TableHeaderItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 8px;
  background: ${chakraTheme.colors.gray[50]};
  img {
    width: 16px;
    height: 16px;
  }
  span {
    font-weight: 700;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

const TableNameCard = styled.div`
  display: flex;
  align-items: center;
  padding-left: 36px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-weight: 500;
      font-size: 14px;
      color: ${chakraTheme.colors.gray[700]};
    }
    .email {
      font-weight: 400;
      font-size: 14px;
      color: ${chakraTheme.colors.gray[500]};
    }
  }
`;

const TableTextCard = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-weight: 400;
  font-size: 14px;
  color: ${chakraTheme.colors.gray[700]};
`;

const StatusBadge = styled.div`
  border-radius: 2px;
  color: #fff;
  background: ${props => {
    switch (props.children) {
      case 'active':
        return chakraTheme.colors.green[500];
      case 'inactive':
        return chakraTheme.colors.gray[500];
      case 'invite sent':
        return chakraTheme.colors.teal[400];
    }
  }};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  height: 18px;
  display: flex;
  align-items: center;
  padding: 1px 4px;
  margin-left: 16px;
`;

const IconList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-right: 16px;
`;

const CustomToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: max-content;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  span {
    font-size: 14px;
    font-weight: 600;
  }
  .icons {
    margin-left: 6px;
    display: flex;
    gap: 10px;
    button {
      padding: 0;
    }
    img {
      width: 24px;
      height: 24px;
      margin: 0;
    }
  }
`;

interface ITeamDashboardMainContentProps {
  teamId: string;
  setIsShowingNewMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamDashboardMainContent = ({
  teamId,
  setIsShowingNewMemberModal,
}: ITeamDashboardMainContentProps) => {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isChangeNameLoading, setIsChangeNameLoading] = useState(false);
  const [teamName, setTeamName] = useState('');
  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO:server fetching logic
    setIsChangeNameLoading(true);
    toast
      .promise(updateTeamName(teamId, teamNameRef.current!.value), {
        loading: 'Loading',
        success: 'Team name change successfull',
        error: e => e.response.data,
      })
      .then(() => setIsNameEditing(false))
      .finally(() => setIsChangeNameLoading(false));
  }, []);

  const onLeaveClick = useCallback(() => {
    toast(t => (
      <CustomToast>
        <img src="/icons/alert-triangle-y.svg" alt="alert" />
        <span>Are you sure to leave this team?</span>
        <div className="icons">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            <img src="/icons/check-circle-g.svg" alt="ok" />
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            <img src="/icons/x-circle-r.svg" alt="x" />
          </button>
        </div>
      </CustomToast>
    ));
  }, []);

  const onKickUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      toast(t => (
        <CustomToast>
          <img src="/icons/alert-triangle-y.svg" alt="alert" />
          <span>Are you sure to kick this user?</span>
          <div className="icons">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                console.log(
                  'useruid',
                  (e.target as HTMLElement).parentElement?.parentElement
                    ?.dataset.userUid,
                );
              }}
            >
              <img src="/icons/check-circle-g.svg" alt="ok" />
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              <img src="/icons/x-circle-r.svg" alt="x" />
            </button>
          </div>
        </CustomToast>
      ));
    },
    [],
  );

  const { data } = useQuery(queryKeys.teamInfoByTeamId(teamId), () =>
    getTeamInfoByTeamId(teamId),
  );

  useEffect(() => {
    setTeamName(data!.data.teamName);
  }, [data?.data.teamName]);
  return (
    <MainContent>
      <TeamDashBoardHeader
        css={css`
          margin-bottom: 60px;
        `}
      >
        <NameAndRole>
          <HeaderInfoSection>
            <h4>Team Name</h4>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                disabled={!isNameEditing}
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                ref={teamNameRef}
              />
              <button
                disabled={isChangeNameLoading}
                onClick={e => {
                  if (!teamNameRef.current) return;
                  if (!isNameEditing) {
                    e.preventDefault();
                    setIsNameEditing(true);
                    teamNameRef.current.disabled = false;
                  }
                }}
              >
                <img
                  src={
                    isNameEditing
                      ? '/icons/check-circle.svg'
                      : '/icons/edit-02.svg'
                  }
                  alt=""
                />
              </button>
            </form>
          </HeaderInfoSection>
          <HeaderInfoSection>
            <h4>Your Role</h4>
            <h3>{data?.data.yourRole}</h3>
          </HeaderInfoSection>
        </NameAndRole>
        <TeamControllButtons>
          <TeamButton
            css={css`
              background: ${chakraTheme.colors.blue[400]};
            `}
            onClick={() => setIsShowingNewMemberModal(true)}
          >
            <img src="/icons/user-plus-01-w.svg" alt="user-plus" />
            <span>Add Teammate</span>
          </TeamButton>
          <TeamButton
            onClick={onLeaveClick}
            css={css`
              background: ${chakraTheme.colors.red[400]};
            `}
          >
            <img src="/icons/log-out-04-w.svg" alt="user-plus" />
            <span>Leave Team</span>
          </TeamButton>
        </TeamControllButtons>
      </TeamDashBoardHeader>
      <Table
        headInfo={{
          headList: [
            {
              content: (
                <TableHeaderItem
                  css={css`
                    margin-left: 20px;
                  `}
                >
                  <img src="/icons/person-bold.svg" alt="person" />
                  <span>name</span>
                </TableHeaderItem>
              ),
              width: '320px',
            },
            {
              content: (
                <TableHeaderItem>
                  <img src="/icons/lock-bold.svg" alt="lock" />
                  <span>role</span>
                </TableHeaderItem>
              ),
              width: '260px',
            },
            {
              content: (
                <TableHeaderItem>
                  <img src="/icons/clock-bold.svg" alt="clock" />
                  <span>status</span>
                </TableHeaderItem>
              ),
              width: '230px',
            },
            { content: '', width: '1fr' },
          ],
          height: '40px',
        }}
        contentTable={{
          content: data!.data.teamMateList.map(item => [
            <TableNameCard>
              <img src={item.profile} alt="profile img" />
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="email">{item.email}</span>
              </div>
            </TableNameCard>,
            <TableTextCard>{item.role}</TableTextCard>,
            <StatusBadge>{item.status}</StatusBadge>,
            data!.data.yourRole != 'member' ? (
              <IconList data-user-uid={item.uid}>
                <button onClick={onKickUserClick}>
                  <img src="/icons/person-minus.svg" alt="person" />
                </button>
              </IconList>
            ) : null,
          ]),
          height: '72px',
        }}
      />
    </MainContent>
  );
};

export default TeamDashboardMainContent;
