// DroppableContainer.tsx
import React, { ReactNode } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

interface DroppableContainerProps {
  droppableId: string;
  children: ReactNode;
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ droppableId, children }) => {
  return (
    <Droppable droppableId={droppableId} type='group'>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableContainer;
