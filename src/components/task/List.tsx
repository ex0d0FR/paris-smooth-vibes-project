import React, { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import TaskCardComponent from './Card';

interface TaskList {
  id: string;
  title: string;
  position: number;
  board_id: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

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

interface ListProps {
  list: TaskList;
  canEdit: boolean;
  onUpdate: () => void;
}

const TaskList: React.FC<ListProps> = ({ list, canEdit, onUpdate }) => {
  const [cards, setCards] = useState<TaskCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const { toast } = useToast();

  useEffect(() => {
    fetchCards();
    
    // Set up real-time subscription for cards
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cards',
          filter: `list_id=eq.${list.id}`
        },
        () => {
          fetchCards();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [list.id]);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('list_id', list.id)
        .eq('is_archived', false)
        .order('position', { ascending: true });

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const maxPosition = cards.length > 0 
        ? Math.max(...cards.map(card => card.position)) 
        : -1;

      const { data, error } = await supabase
        .from('cards')
        .insert({
          title: newCardTitle.trim(),
          list_id: list.id,
          created_by: session.user.id,
          position: maxPosition + 1
        })
        .select()
        .single();

      if (error) throw error;

      setCards([...cards, data]);
      setNewCardTitle('');
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Card created successfully",
      });
    } catch (error) {
      console.error('Error creating card:', error);
      toast({
        title: "Error",
        description: "Failed to create card",
        variant: "destructive",
      });
    }
  };

  const updateListTitle = async () => {
    if (!editTitle.trim() || editTitle === list.title) {
      setIsEditing(false);
      setEditTitle(list.title);
      return;
    }

    try {
      const { error } = await supabase
        .from('lists')
        .update({ title: editTitle.trim() })
        .eq('id', list.id);

      if (error) throw error;

      setIsEditing(false);
      onUpdate();
      
      toast({
        title: "Success",
        description: "List title updated successfully",
      });
    } catch (error) {
      console.error('Error updating list title:', error);
      toast({
        title: "Error",
        description: "Failed to update list title",
        variant: "destructive",
      });
      setEditTitle(list.title);
      setIsEditing(false);
    }
  };

  const deleteList = async () => {
    try {
      const { error } = await supabase
        .from('lists')
        .update({ is_archived: true })
        .eq('id', list.id);

      if (error) throw error;

      onUpdate();
      
      toast({
        title: "Success",
        description: "List deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting list:', error);
      toast({
        title: "Error",
        description: "Failed to delete list",
        variant: "destructive",
      });
    }
  };

  return (
    <UICard className="w-72 flex-shrink-0 h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={updateListTitle}
              onKeyPress={(e) => e.key === 'Enter' && updateListTitle()}
              className="text-sm font-medium"
              autoFocus
            />
          ) : (
            <CardTitle 
              className="text-sm font-medium cursor-pointer"
              onClick={() => canEdit && setIsEditing(true)}
            >
              {list.title} ({cards.length})
            </CardTitle>
          )}
          
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={deleteList} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {/* Cards */}
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <>
            {cards.map((card) => (
              <TaskCardComponent
                key={card.id} 
                card={card} 
                canEdit={canEdit}
                onUpdate={fetchCards}
              />
            ))}
          </>
        )}
        
        {/* Add Card Button */}
        {canEdit && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add a card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createCard()}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createCard} disabled={!newCardTitle.trim()}>
                    Create Card
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </UICard>
  );
};

export default TaskList;