/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import {
  FormBoxContainer,
  FormContainer,
  Input,
  FormError,
  MidBtn,
  Title,
} from 'components/FormComponents';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import {
  getUserDetail,
  getUserTeamDetail,
  queryKeys,
  updateUserInfo,
} from 'lib/fetchData';
import {
  faCrown,
  faUser,
  faUserShield,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  border-top: 52px;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Divider = styled.div`
  width: 5px;
  height: 750px;
  background: #4a5568;
`;

const TeamCardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TeamCard = styled.div`
  width: 264px;
  height: 104px;
  box-shadow: ${chakraTheme.shadows.md};
  background-color: #f7fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  svg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    h3 {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }
    h4 {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const LeaveBtn = styled.button`
  width: 127px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${chakraTheme.colors.red[500]};
  color: #fff;
  gap: 8px;
`;

const AddBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${chakraTheme.colors.green[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 20px;
`;

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  password2: string;
}

interface props {
  userId: string;
}

const UserDashBoardMainContent = ({ userId }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery(queryKeys.userDetail, () => getUserDetail(userId));
  const { data: teamList } = useQuery(queryKeys.userTeamDetail, () =>
    getUserTeamDetail(userId),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>({
    criteriaMode: 'all',
    defaultValues: {
      name: data?.data.name,
      email: data?.data.email,
    },
  });

  const onSubmit = useCallback(
    (data: IFormInputs) => {
      setIsLoading(true);
      toast
        .promise(updateUserInfo(userId, data), {
          loading: 'Requesting update to server',
          success: 'Updated successfully',
          error: 'server error',
        })
        .catch(e => {
          console.log(JSON.parse(e.message));
        })
        .finally(() => setIsLoading(false));
    },
    [userId],
  );

  return (
    <Container>
      <Section>
        <FormBoxContainer>
          <Title
            css={css`
              margin-top: 22px;
              margin-right: 300px;
              font-size: 24px;
            `}
          >
            Update User Info
          </Title>
          <FormContainer
            onSubmit={handleSubmit(onSubmit)}
            css={css`
              width: calc(100% - 200px);
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              flex-wrap: nowrap;
            `}
          >
            <InputFields>
              <InputSection>
                <label htmlFor="nickname">nickname</label>
                <Input
                  type="text"
                  {...register('name', {
                    required: 'nickname is required',
                  })}
                  placeholder="new nickname here"
                />
                {errors.name?.message && (
                  <FormError>{errors.name.message}</FormError>
                )}
              </InputSection>
              <InputSection>
                <label htmlFor="email">email</label>
                <Input
                  type="email"
                  {...register('email', { required: 'email is required' })}
                  placeholder="new email here"
                />
                {errors.email?.message && (
                  <FormError>{errors.email.message}</FormError>
                )}
              </InputSection>
              <InputSection>
                <label htmlFor="password">password</label>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="new password here"
                />
                {errors.password?.message && (
                  <FormError>{errors.password.message}</FormError>
                )}
              </InputSection>
              <InputSection>
                <label htmlFor="password2">password check</label>
                <Input
                  type="password"
                  {...register('password2', {
                    validate: {
                      samePassword: v =>
                        v === watch('password') ||
                        'password and password validation must match',
                    },
                  })}
                  placeholder="password check here"
                />
                {errors.password2?.message && (
                  <FormError>{errors.password2.message}</FormError>
                )}
              </InputSection>
            </InputFields>
            <MidBtn
              type="submit"
              css={css`
                display: flex;
                font-size: 16px;
                background-color: ${chakraTheme.colors.teal[500]};
                img {
                  margin-right: 8px;
                }
              `}
              disabled={isLoading}
            >
              <img src="/icons/user-edit.svg" alt="Edit User" /> Update Info
            </MidBtn>
          </FormContainer>
        </FormBoxContainer>
      </Section>
      <Divider />
      <Section>
        <FormBoxContainer
          css={css`
            display: flex;
            flex-direction: column;
            gap: 15px;
            height: calc(100vh - 200px);
            overflow-y: scroll;
            &::-webkit-scrollbar {
              width: 5px;
              height: 5px;
              background-color: #aaa;
            }
            &::-webkit-scrollbar-thumb {
              background: #000;
            }
          `}
        >
          <Title
            css={css`
              margin-top: 22px;
              margin-bottom: 50px;
              align-self: flex-start;
              margin-left: 60px;
              font-size: 24px;
            `}
          >
            Manage your team
          </Title>
          {teamList?.data.map(element => {
            let icon: IconDefinition;
            switch (element.role) {
              case 'admin':
                icon = faUserShield;
                break;
              case 'owner':
                icon = faCrown;
                break;
              case 'user':
                icon = faUser;
                break;
            }
            return (
              <TeamCardRow key={element.teamId}>
                <TeamCard>
                  <FontAwesomeIcon icon={icon} />
                  <div>
                    <h3>{element.teamName}</h3>
                    <h4>your role : {element.role}</h4>
                  </div>
                </TeamCard>
                <LeaveBtn>
                  Leave Team <img src="/icons/log-out-04-w.svg" alt="log out" />
                </LeaveBtn>
              </TeamCardRow>
            );
          })}
          <AddBtn>
            <img src="/icons/add-green-btn.svg" alt="plus icon" />
          </AddBtn>
        </FormBoxContainer>
      </Section>
    </Container>
  );
};

export default UserDashBoardMainContent;
