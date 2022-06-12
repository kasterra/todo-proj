/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme as chakraTheme } from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
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

interface IModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ setVisible, children }: IModalProps) => {
  return (
    <Wrapper onClick={() => setVisible(false)}>
      <Container onClick={e => e.stopPropagation()}>{children}</Container>
    </Wrapper>
  );
};

export default Modal;
