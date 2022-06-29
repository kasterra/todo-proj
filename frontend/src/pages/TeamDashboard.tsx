/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { theme as chakraTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryErrorResetBoundary } from 'react-query';
import BarLoader from 'react-spinners/BarLoader';
import Modal from 'components/Modal';
import AddMemberModalContent from 'components/AddMemberModalContent';
import NewTeamModalContent from 'components/NewTeamModalContent';
import TeamDashboardMainContent from 'components/TeamDashboardMainContent';
import { ErrorBoundary } from 'react-error-boundary';
import { getTeamList, queryKeys } from 'lib/fetchData';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAtomValue } from 'jotai';
import { authAtom } from 'atoms/authAtoms';

const Container = styled.div`
  margin: 0px 48px;
  padding: 53px 0px;
  margin-bottom: 30px;
  background-color: ${chakraTheme.colors.gray[50]};
  min-height: calc(100vh - 208px);
  border-radius: 1rem;
  display: flex;
  position: relative;
`;

const SideNav = styled.nav`
  width: 200px;
  border: 1px solid ${chakraTheme.colors.gray[200]};
  background: #fff;
  box-shadow: ${chakraTheme.shadows.base};
  border-radius: 12px;
  margin: 0px 22px;
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavBtn = styled.button`
  font-family: ${chakraTheme.fonts.body};
  box-sizing: border-box;
  height: 45px;
  background: ${chakraTheme.colors.gray[100]};
  box-shadow: ${chakraTheme.shadows.base};
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 24px;
    height: 24px;
    margin-right: 13px;
  }
`;

const NewBtnSection = styled.div`
  border-bottom: 2px solid ${chakraTheme.colors.blackAlpha[600]};
  padding: 18px 0px;
`;

const TeamDashboard = () => {
  const { teamId } = useParams() as { teamId: string };
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const [isShowingNewTeamModal, setIsShowingNewTeamModal] = useState(false);
  const [isShowingNewMemberModal, setIsShowingNewMemberModal] = useState(false);
  const { reset } = useQueryErrorResetBoundary();
  const token = useAtomValue(authAtom);
  const { data } = useQuery(queryKeys.teamList, () => getTeamList(token));
  const navigate = useNavigate();

  useEffect(() => {
    if (!teamId && data?.data && data.data[0]?.teamId) {
      resetBtnRef.current?.click();
      navigate(`${data.data[0].teamId}`);
    }
  }, [data?.data, navigate, teamId]);

  return (
    <>
      {isShowingNewMemberModal && (
        <Modal setVisible={setIsShowingNewMemberModal}>
          <AddMemberModalContent setVisible={setIsShowingNewMemberModal} />
        </Modal>
      )}
      {isShowingNewTeamModal && (
        <Modal setVisible={setIsShowingNewTeamModal}>
          <NewTeamModalContent setVisible={setIsShowingNewTeamModal} />
        </Modal>
      )}
      <Container>
        <DragDropContext onDragEnd={() => {}}>
          <SideNav>
            <NewBtnSection>
              <NavBtn
                css={css`
                  size: 12px;
                `}
                onClick={() => setIsShowingNewTeamModal(true)}
              >
                <img src="/icons/users-plus.svg" alt="users-plus" />
                <span>
                  Create
                  <br /> New Team
                </span>
              </NavBtn>
            </NewBtnSection>
            {data?.data.map(item => {
              return (
                <NavBtn
                  key={item.teamId}
                  onClick={() => {
                    navigate(`/dashboard/team/${item.teamId}`);
                    resetBtnRef.current?.click();
                  }}
                >
                  <img src={item.teamAvatarUrl} alt="teamAvatar" />
                  {item.teamName}
                </NavBtn>
              );
            })}
          </SideNav>
          {teamId && (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    justify-content: center;
                    align-items: center;
                    img {
                      width: 200px;
                      height: 200px;
                    }
                  `}
                >
                  <img src="/icons/alert-y.svg" alt="alert" />
                  <h2>Team Not Found. Please check your URL and try again.</h2>
                  <button
                    ref={resetBtnRef}
                    onClick={() => resetErrorBoundary()}
                  ></button>
                </div>
              )}
            >
              <Suspense
                fallback={
                  <div
                    css={css`
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                      gap: 10px;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <BarLoader
                      width={100}
                      color={chakraTheme.colors.blue[500]}
                    />
                    <h2>Loading Team Info...</h2>
                  </div>
                }
              >
                <TeamDashboardMainContent
                  teamId={teamId}
                  setIsShowingNewMemberModal={setIsShowingNewMemberModal}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </DragDropContext>
      </Container>
    </>
  );
};

export default TeamDashboard;
