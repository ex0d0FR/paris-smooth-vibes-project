
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, UserCheck, Crown } from 'lucide-react';

type UserRole = 'dev' | 'admin' | 'team_leader' | 'volunteer' | 'guest';

interface UserWithProfile {
  primary_role: UserRole;
}

interface UserStatsCardsProps {
  users: UserWithProfile[];
}

const UserStatsCards = ({ users }: UserStatsCardsProps) => {
  const getRoleCount = (role: UserRole) => {
    return users.filter(user => user.primary_role === role).length;
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Developers',
      value: getRoleCount('dev'),
      icon: Crown,
      color: 'text-purple-600'
    },
    {
      title: 'Administrators',
      value: getRoleCount('admin'),
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Team Leaders',
      value: getRoleCount('team_leader'),
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      title: 'Volunteers',
      value: getRoleCount('volunteer'),
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Guests',
      value: getRoleCount('guest'),
      icon: Users,
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStatsCards;
