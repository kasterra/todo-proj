import styled from '@emotion/styled';
// import { useSetRecoilState } from 'recoil';
// import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
// import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

// interface IAreaProps {
//   isDraggingOver: boolean;
//   isDraggingFromThisWith: boolean;
// }

// const Area = styled.div<IAreaProps>`
//   background-color: ${props =>
//     props.isDraggingOver
//       ? '#b2b3c3'
//       : props.isDraggingFromThisWith
//       ? '#dfe6e9'
//       : 'transparent'};
//   flex-grow: 1;
//   transition: background-color 0.3s ease-in-out;
//   padding: 20px;
// `;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  & input {
    width: 100%;
  }
`;

// interface IBoardProps {
//   toDos: IToDo[];
//   boardId: string;
// }

interface IForm {
  toDo: string;
}

const Board = () => {
  // const setToDos = useSetRecoilState(toDoState);
  const { register } = useForm<IForm>();
  // const onValid = ({ toDo }: IForm) => {
  //   const newToDo = {
  //     id: Date.now(),
  //     text: toDo,
  //   };
  //   setToDos(allBoards => {
  //     return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
  //   });
  //   setValue('toDo', '');
  // };
  return (
    <Wrapper>
      <Title>boardId</Title>
      <Form>
        <input {...register('toDo', { required: true })} type="text"></input>
      </Form>
      {/* <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={!!snapshot.draggingFromThisWith}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable> */}
    </Wrapper>
  );
};

export default Board;
