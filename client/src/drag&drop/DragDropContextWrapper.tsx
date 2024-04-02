// DragDropContextWrapper.tsx
import React, { ReactNode } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DragDropContextWrapperProps {
  children: ReactNode;
  onDragEnd: (result: DropResult) => void;
}

const DragDropContextWrapper: React.FC<DragDropContextWrapperProps> = ({ children, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default DragDropContextWrapper;

