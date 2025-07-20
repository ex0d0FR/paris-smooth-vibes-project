import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import TaskList from './List';

interface BoardList {
  id: string;
  title: string;
  position: number;
  board_id: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

interface BoardProps {
  boardId: string;
  canEdit: boolean;
}

const Board: React.FC<BoardProps> = ({ boardId, canEdit }) => {
  const [lists, setLists] = useState<BoardList[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchLists();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lists',
          filter: `board_id=eq.${boardId}`
        },
        () => {
          fetchLists();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [boardId]);

  const fetchLists = async () => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('board_id', boardId)
        .eq('is_archived', false)
        .order('position', { ascending: true });

      if (error) throw error;
      setLists(data || []);
    } catch (error) {
      console.error('Error fetching lists:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createList = async () => {
    if (!newListTitle.trim()) return;

    try {
      const maxPosition = lists.length > 0 
        ? Math.max(...lists.map(list => list.position)) 
        : -1;

      const { data, error } = await supabase
        .from('lists')
        .insert({
          title: newListTitle.trim(),
          board_id: boardId,
          position: maxPosition + 1
        })
        .select()
        .single();

      if (error) throw error;

      setLists([...lists, data]);
      setNewListTitle('');
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Success",
        description: "List created successfully",
      });
    } catch (error) {
      console.error('Error creating list:', error);
      toast({
        title: "Error",
        description: "Failed to create list",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {/* Lists */}
      {lists.map((list) => (
        <TaskList
          key={list.id} 
          list={list} 
          canEdit={canEdit}
          onUpdate={fetchLists}
        />
      ))}
      
      {/* Add List Button */}
      {canEdit && (
        <div className="flex-shrink-0">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="h-full min-h-[200px] w-72 border-dashed border-2 hover:border-primary/50 flex flex-col items-center justify-center gap-2"
              >
                <Plus className="h-6 w-6" />
                Add List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="List title"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createList()}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createList} disabled={!newListTitle.trim()}>
                    Create List
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Board;