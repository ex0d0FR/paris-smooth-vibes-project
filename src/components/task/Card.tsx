import React, { useState } from 'react';
import { Calendar, User, MessageSquare, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import CardModal from './CardModal';

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

interface CardProps {
  card: TaskCard;
  canEdit: boolean;
  onUpdate: () => void;
}

const TaskCard: React.FC<CardProps> = ({ card, canEdit, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    review: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const deleteCard = async () => {
    try {
      const { error } = await supabase
        .from('cards')
        .update({ is_archived: true })
        .eq('id', card.id);

      if (error) throw error;

      onUpdate();
      
      toast({
        title: "Success",
        description: "Card deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: "Error",
        description: "Failed to delete card",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <UICard 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-3">
          <div className="space-y-2">
            {/* Title and Menu */}
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-foreground line-clamp-2 flex-1">
                {card.title}
              </h3>
              {canEdit && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Card
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCard();
                      }} 
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Card
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            {/* Description */}
            {card.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {card.description}
              </p>
            )}
            
            {/* Labels */}
            {card.labels && card.labels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {card.labels.slice(0, 3).map((label, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
                {card.labels.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{card.labels.length - 3}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Priority and Status */}
            <div className="flex gap-1">
              <Badge className={`text-xs ${priorityColors[card.priority]}`}>
                {card.priority}
              </Badge>
              <Badge className={`text-xs ${statusColors[card.status]}`}>
                {card.status.replace('_', ' ')}
              </Badge>
            </div>
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {card.due_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(card.due_date), 'MMM d')}
                  </div>
                )}
                {card.assigned_to && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Assigned
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>

      {/* Card Modal */}
      <CardModal
        card={card}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        canEdit={canEdit}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TaskCard;