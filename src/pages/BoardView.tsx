import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Settings, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import NavigationMenu from '@/components/NavigationMenu';
import Board from '@/components/task/Board';

interface BoardData {
  id: string;
  title: string;
  description?: string;
  visibility: 'private' | 'team' | 'public';
  created_by: string;
  is_archived: boolean;
}

const BoardView = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [board, setBoard] = useState<BoardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (boardId) {
      fetchBoard();
      checkPermissions();
    }
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .select('*')
        .eq('id', boardId)
        .single();

      if (error) throw error;
      setBoard(data);
    } catch (error) {
      console.error('Error fetching board:', error);
      toast({
        title: "Error",
        description: "Failed to fetch board",
        variant: "destructive",
      });
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const checkPermissions = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: canEditBoard } = await supabase
        .rpc('can_edit_board', { 
          _user_id: session.user.id, 
          _board_id: boardId 
        });

      setCanEdit(canEditBoard);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationMenu variant="compact" />
        <div className="p-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading board...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!board) return null;

  return (
    <div className="min-h-screen bg-background">
      <NavigationMenu variant="compact" />
      <div>
        {/* Board Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/tasks')}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Boards
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{board.title}</h1>
                  {board.description && (
                    <p className="text-muted-foreground">{board.description}</p>
                  )}
                </div>
              </div>
              
              {canEdit && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Users className="h-4 w-4" />
                    Members
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Board Content */}
        <div className="p-6">
          <Board boardId={boardId!} canEdit={canEdit} />
        </div>
      </div>
    </div>
  );
};

export default BoardView;