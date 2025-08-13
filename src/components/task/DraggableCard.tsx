import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import TaskCardComponent from './Card';

interface TaskCard {
  id: string;
  title: string;
  description?: string;
  position: number;
  assigned_to?: string;
  created_by: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  labels?: string[];
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

interface DraggableCardProps {
  card: TaskCard;
  listId: string;
  canEdit: boolean;
  onUpdate: () => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ card, listId, canEdit, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { 
      type: 'card', 
      cardId: card.id, 
      fromListId: listId,
      card: { ...card, list_id: listId }
    }
  });

  const style = transform ? { 
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1000 : 'auto'
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <TaskCardComponent 
        card={card} 
        canEdit={canEdit && !isDragging} 
        onUpdate={onUpdate} 
      />
    </div>
  );
};

export default DraggableCard;