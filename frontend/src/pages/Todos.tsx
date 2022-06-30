import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Todos = () => {
  // const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    // const { destination, source } = info;
    // if (!destination) return;
    // setToDos(allBoards => {
    //   const sourceBoardCopy = [...allBoards[source.droppableId]];
    //   const taskObj = sourceBoardCopy[source.index];
    //   sourceBoardCopy.splice(source.index, 1);
    //   if (source.droppableId === destination.droppableId) {
    //     sourceBoardCopy.splice(destination.index, 0, taskObj);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoardCopy,
    //     };
    //   } else {
    //     const destBoardCopy = [...allBoards[destination.droppableId]];
    //     destBoardCopy.splice(destination.index, 0, taskObj);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoardCopy,
    //       [destination.droppableId]: destBoardCopy,
    //     };
    //   }
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* {Object.keys(toDos).map(boardId => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))} */}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default Todos;
