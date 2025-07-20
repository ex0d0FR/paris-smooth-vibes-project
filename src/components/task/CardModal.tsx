import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Tag, Flag, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface CardModalProps {
  card: TaskCard;
  isOpen: boolean;
  onClose: () => void;
  canEdit: boolean;
  onUpdate: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, isOpen, onClose, canEdit, onUpdate }) => {
  const [editedCard, setEditedCard] = useState(card);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setEditedCard(card);
      fetchComments();
    }
  }, [card, isOpen]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('card_comments')
        .select('*')
        .eq('card_id', card.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const updateCard = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cards')
        .update({
          title: editedCard.title,
          description: editedCard.description,
          priority: editedCard.priority,
          status: editedCard.status,
          due_date: editedCard.due_date,
          labels: editedCard.labels
        })
        .eq('id', card.id);

      if (error) throw error;

      onUpdate();
      onClose();
      
      toast({
        title: "Success",
        description: "Card updated successfully",
      });
    } catch (error) {
      console.error('Error updating card:', error);
      toast({
        title: "Error",
        description: "Failed to update card",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('card_comments')
        .insert({
          card_id: card.id,
          user_id: session.user.id,
          content: newComment.trim()
        })
        .select()
        .single();

      if (error) throw error;

      setComments([...comments, data]);
      setNewComment('');
      
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const addLabel = (label: string) => {
    if (!label.trim() || editedCard.labels?.includes(label.trim())) return;
    
    const newLabels = [...(editedCard.labels || []), label.trim()];
    setEditedCard({ ...editedCard, labels: newLabels });
  };

  const removeLabel = (labelToRemove: string) => {
    const newLabels = editedCard.labels?.filter(label => label !== labelToRemove) || [];
    setEditedCard({ ...editedCard, labels: newLabels });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {canEdit ? (
                <Input
                  value={editedCard.title}
                  onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                  className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
                />
              ) : (
                <h2 className="text-lg font-semibold">{card.title}</h2>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                Created {format(new Date(card.created_at), 'MMM d, yyyy')}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                {canEdit ? (
                  <Textarea
                    value={editedCard.description || ''}
                    onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                    placeholder="Add a description..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {card.description || 'No description'}
                  </p>
                )}
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comments ({comments.length})
                </h3>
                
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-muted p-3 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        {format(new Date(comment.created_at), 'MMM d, yyyy at h:mm a')}
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                  
                  {/* Add Comment */}
                  <div className="space-y-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="min-h-[80px]"
                    />
                    <Button onClick={addComment} disabled={!newComment.trim()} size="sm">
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Priority */}
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Priority
                </h3>
                {canEdit ? (
                  <Select
                    value={editedCard.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high') => 
                      setEditedCard({ ...editedCard, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{card.priority}</Badge>
                )}
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Status
                </h3>
                {canEdit ? (
                  <Select
                    value={editedCard.status}
                    onValueChange={(value: 'todo' | 'in_progress' | 'review' | 'done') => 
                      setEditedCard({ ...editedCard, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{card.status.replace('_', ' ')}</Badge>
                )}
              </div>

              {/* Due Date */}
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due Date
                </h3>
                {canEdit ? (
                  <Input
                    type="datetime-local"
                    value={editedCard.due_date?.slice(0, 16) || ''}
                    onChange={(e) => setEditedCard({ 
                      ...editedCard, 
                      due_date: e.target.value ? new Date(e.target.value).toISOString() : undefined 
                    })}
                  />
                ) : (
                  <p className="text-sm">
                    {card.due_date ? format(new Date(card.due_date), 'MMM d, yyyy') : 'No due date'}
                  </p>
                )}
              </div>

              {/* Labels */}
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Labels
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {editedCard.labels?.map((label, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {label}
                        {canEdit && (
                          <button
                            onClick={() => removeLabel(label)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {canEdit && (
                    <Input
                      placeholder="Add label..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addLabel(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="text-xs"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {canEdit && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={updateCard} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;