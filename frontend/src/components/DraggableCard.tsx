import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${props =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? '0px 2px 5px rgba(0,0,0,0.5)' : 'none'};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
