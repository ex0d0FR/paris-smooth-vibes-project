import React from 'react';
import { Plus, Megaphone, Mic, Video, UserCheck, Coffee, Truck, Shield, Users, Presentation, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BoardTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  defaultLists: string[];
  priority: 'high' | 'medium' | 'low';
}

interface BoardTemplatesProps {
  onCreateFromTemplate: (template: BoardTemplate) => void;
}

const BOARD_TEMPLATES: BoardTemplate[] = [
  {
    id: 'marketing',
    title: 'Marketing Team',
    description: 'Manage marketing campaigns, social media, and promotional materials',
    category: 'Marketing',
    icon: <Megaphone className="h-6 w-6" />,
    defaultLists: ['To Do', 'In Progress', 'Review', 'Published'],
    priority: 'high'
  },
  {
    id: 'sound-audio',
    title: 'Sound & Audio',
    description: 'Handle sound equipment, audio testing, and live sound management',
    category: 'Sound & Audio',
    icon: <Mic className="h-6 w-6" />,
    defaultLists: ['Setup Tasks', 'Testing', 'Live Event', 'Cleanup'],
    priority: 'high'
  },
  {
    id: 'video-streaming',
    title: 'Video & Streaming',
    description: 'Manage video recording, live streaming, and post-production',
    category: 'Video & Streaming',
    icon: <Video className="h-6 w-6" />,
    defaultLists: ['Pre-Production', 'Live Recording', 'Post-Production', 'Published'],
    priority: 'high'
  },
  {
    id: 'registration',
    title: 'Registration',
    description: 'Handle attendee registration, check-in, and badge distribution',
    category: 'Registration',
    icon: <UserCheck className="h-6 w-6" />,
    defaultLists: ['Pre-Registration', 'Check-In Setup', 'Event Check-In', 'Follow-Up'],
    priority: 'medium'
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Manage catering, guest services, and attendee experience',
    category: 'Hospitality',
    icon: <Coffee className="h-6 w-6" />,
    defaultLists: ['Planning', 'Setup', 'Service', 'Cleanup'],
    priority: 'medium'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Coordinate transportation, equipment, and venue logistics',
    category: 'Logistics',
    icon: <Truck className="h-6 w-6" />,
    defaultLists: ['Equipment', 'Transportation', 'Venue Setup', 'Breakdown'],
    priority: 'medium'
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage event security, crowd control, and safety protocols',
    category: 'Security',
    icon: <Shield className="h-6 w-6" />,
    defaultLists: ['Planning', 'Pre-Event', 'During Event', 'Post-Event'],
    priority: 'low'
  },
  {
    id: 'volunteers',
    title: 'Volunteer Coordination',
    description: 'Organize volunteer recruitment, training, and assignments',
    category: 'Volunteers',
    icon: <Users className="h-6 w-6" />,
    defaultLists: ['Recruitment', 'Training', 'Assignments', 'Recognition'],
    priority: 'medium'
  },
  {
    id: 'speakers',
    title: 'Speaker Management',
    description: 'Coordinate with speakers, manage schedules, and handle requirements',
    category: 'Speakers',
    icon: <Presentation className="h-6 w-6" />,
    defaultLists: ['Outreach', 'Confirmed', 'Preparation', 'Event Day'],
    priority: 'high'
  },
  {
    id: 'sponsors',
    title: 'Sponsor Relations',
    description: 'Manage sponsor relationships, exhibits, and sponsorship fulfillment',
    category: 'Sponsors',
    icon: <Award className="h-6 w-6" />,
    defaultLists: ['Prospecting', 'Confirmed', 'Setup', 'Follow-Up'],
    priority: 'low'
  }
];

const BoardTemplates: React.FC<BoardTemplatesProps> = ({ onCreateFromTemplate }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Conference Board Templates</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Quick start with pre-configured boards for common conference areas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BOARD_TEMPLATES.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {template.icon}
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </div>
                <Badge className={`text-xs ${getPriorityColor(template.priority)}`}>
                  {template.priority}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Default Lists:</p>
                <div className="flex flex-wrap gap-1">
                  {template.defaultLists.slice(0, 3).map((list, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {list}
                    </Badge>
                  ))}
                  {template.defaultLists.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.defaultLists.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={() => onCreateFromTemplate(template)}
                className="w-full gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoardTemplates;