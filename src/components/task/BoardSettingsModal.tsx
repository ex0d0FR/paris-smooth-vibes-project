import React, { useState, useEffect } from 'react';
import { Settings, Trash2, Users, Eye, EyeOff, Archive } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface BoardData {
  id: string;
  title: string;
  description?: string;
  visibility: 'private' | 'team' | 'public';
  status: string;
  category?: string;
  created_by: string;
  is_archived: boolean;
}

interface User {
  id: string;
  username?: string;
  avatar_url?: string;
}

interface BoardAssignment {
  id: string;
  user_id: string;
  assigned_by: string;
  assigned_at: string;
  user?: User;
}

interface BoardSettingsModalProps {
  board: BoardData;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const CONFERENCE_CATEGORIES = [
  'Marketing',
  'Sound & Audio',
  'Video & Streaming',
  'Registration',
  'Hospitality',
  'Logistics',
  'Security',
  'Volunteers',
  'Speakers',
  'Sponsors',
  'Other'
];

const BoardSettingsModal: React.FC<BoardSettingsModalProps> = ({
  board,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    title: board.title,
    description: board.description || '',
    visibility: board.visibility,
    status: board.status,
    category: board.category || ''
  });
  const [assignments, setAssignments] = useState<BoardAssignment[]>([]);
  const [teamLeaders, setTeamLeaders] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchAssignments();
      fetchTeamLeaders();
    }
  }, [isOpen, board.id]);

  const fetchAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('board_assignments')
        .select('*')
        .eq('board_id', board.id);

      if (error) throw error;
      
      // Fetch user profiles separately
      const assignmentsWithUsers = await Promise.all(
        (data || []).map(async (assignment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', assignment.user_id)
            .single();
          
          return {
            ...assignment,
            user: profile
          };
        })
      );
      
      setAssignments(assignmentsWithUsers);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchTeamLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'team_leader')
        .eq('is_active', true);

      if (error) throw error;
      
      // Fetch profiles separately
      const profiles = await Promise.all(
        (data || []).map(async (role) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', role.user_id)
            .single();
          return profile;
        })
      );
      
      setTeamLeaders(profiles.filter(Boolean));
    } catch (error) {
      console.error('Error fetching team leaders:', error);
    }
  };

  const updateBoard = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('boards')
        .update({
          title: formData.title,
          description: formData.description || null,
          visibility: formData.visibility,
          status: formData.status,
          category: formData.category || null
        })
        .eq('id', board.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Board updated successfully",
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating board:', error);
      toast({
        title: "Error",
        description: "Failed to update board",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignTeamLeader = async () => {
    if (!selectedLeader) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from('board_assignments')
        .insert({
          board_id: board.id,
          user_id: selectedLeader,
          assigned_by: session.user.id
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team leader assigned successfully",
      });
      setSelectedLeader('');
      fetchAssignments();
    } catch (error) {
      console.error('Error assigning team leader:', error);
      toast({
        title: "Error",
        description: "Failed to assign team leader",
        variant: "destructive",
      });
    }
  };

  const removeAssignment = async (assignmentId: string) => {
    try {
      const { error } = await supabase
        .from('board_assignments')
        .delete()
        .eq('id', assignmentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Assignment removed successfully",
      });
      fetchAssignments();
    } catch (error) {
      console.error('Error removing assignment:', error);
      toast({
        title: "Error",
        description: "Failed to remove assignment",
        variant: "destructive",
      });
    }
  };

  const archiveBoard = async () => {
    try {
      const { error } = await supabase
        .from('boards')
        .update({ is_archived: true })
        .eq('id', board.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Board archived successfully",
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error archiving board:', error);
      toast({
        title: "Error",
        description: "Failed to archive board",
        variant: "destructive",
      });
    }
  };

  const deleteBoard = async () => {
    if (!confirm('Are you sure you want to delete this board? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', board.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Board deleted successfully",
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting board:', error);
      toast({
        title: "Error",
        description: "Failed to delete board",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Board Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Board Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Board description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONFERENCE_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          Private
                        </div>
                      </SelectItem>
                      <SelectItem value="team">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Team
                        </div>
                      </SelectItem>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Public
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={updateBoard} disabled={loading} className="w-full">
                {loading ? 'Updating...' : 'Update Board'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div>
              <Label>Assign Team Leader</Label>
              <div className="flex gap-2">
                <Select value={selectedLeader} onValueChange={setSelectedLeader}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select team leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamLeaders
                      .filter(leader => !assignments.some(a => a.user_id === leader.id))
                      .map((leader) => (
                        <SelectItem key={leader.id} value={leader.id}>
                          {leader.username || 'Unknown User'}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={assignTeamLeader} disabled={!selectedLeader}>
                  Assign
                </Button>
              </div>
            </div>

            <div>
              <Label>Current Assignments</Label>
              <div className="space-y-2">
                {assignments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No team leaders assigned</p>
                ) : (
                  assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{assignment.user?.username || 'Unknown User'}</p>
                          <p className="text-sm text-muted-foreground">
                            Assigned on {new Date(assignment.assigned_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAssignment(assignment.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="danger" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Archive Board</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  Archiving will hide this board from the dashboard but keep all data intact.
                </p>
                <Button variant="outline" onClick={archiveBoard} className="gap-2">
                  <Archive className="h-4 w-4" />
                  Archive Board
                </Button>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete Board</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  This action cannot be undone. This will permanently delete the board and all its data.
                </p>
                <Button variant="destructive" onClick={deleteBoard} className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Board
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BoardSettingsModal;