export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      board_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string
          board_id: string
          id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by: string
          board_id: string
          id?: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string
          board_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_assignments_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      board_members: {
        Row: {
          added_at: string | null
          added_by: string
          board_id: string
          id: string
          role: Database["public"]["Enums"]["board_member_role"] | null
          user_id: string
        }
        Insert: {
          added_at?: string | null
          added_by: string
          board_id: string
          id?: string
          role?: Database["public"]["Enums"]["board_member_role"] | null
          user_id: string
        }
        Update: {
          added_at?: string | null
          added_by?: string
          board_id?: string
          id?: string
          role?: Database["public"]["Enums"]["board_member_role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_members_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      boards: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_archived: boolean | null
          status: string | null
          team_id: string | null
          title: string
          updated_at: string | null
          visibility: Database["public"]["Enums"]["board_visibility"] | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_archived?: boolean | null
          status?: string | null
          team_id?: string | null
          title: string
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["board_visibility"] | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_archived?: boolean | null
          status?: string | null
          team_id?: string | null
          title?: string
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["board_visibility"] | null
        }
        Relationships: []
      }
      card_comments: {
        Row: {
          card_id: string
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_comments_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          is_archived: boolean | null
          labels: string[] | null
          list_id: string
          position: number
          priority: Database["public"]["Enums"]["card_priority"] | null
          status: Database["public"]["Enums"]["card_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_archived?: boolean | null
          labels?: string[] | null
          list_id: string
          position?: number
          priority?: Database["public"]["Enums"]["card_priority"] | null
          status?: Database["public"]["Enums"]["card_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_archived?: boolean | null
          labels?: string[] | null
          list_id?: string
          position?: number
          priority?: Database["public"]["Enums"]["card_priority"] | null
          status?: Database["public"]["Enums"]["card_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
        ]
      }
      lists: {
        Row: {
          board_id: string
          created_at: string | null
          id: string
          is_archived: boolean | null
          position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          board_id: string
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          position?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          board_id?: string
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lists_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_counts: {
        Row: {
          country_code: string
          country_name: string
          created_at: string
          id: string
          prayer_count: number
          updated_at: string
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string
          id?: string
          prayer_count?: number
          updated_at?: string
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string
          id?: string
          prayer_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      profile_access_log: {
        Row: {
          access_type: string
          accessed_user_id: string
          accessor_user_id: string
          board_id: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
        }
        Insert: {
          access_type: string
          accessed_user_id: string
          accessor_user_id: string
          board_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Update: {
          access_type?: string
          accessed_user_id?: string
          accessor_user_id?: string
          board_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Relationships: []
      }
      profile_contact_info: {
        Row: {
          church_name: string | null
          created_at: string
          email: string | null
          id: string
          phone_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          church_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          church_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"]
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"]
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"]
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      role_audit_log: {
        Row: {
          action: string
          assigned_by: string
          created_at: string | null
          id: string
          new_roles: string[] | null
          old_roles: string[] | null
          target_user_id: string
        }
        Insert: {
          action: string
          assigned_by: string
          created_at?: string | null
          id?: string
          new_roles?: string[] | null
          old_roles?: string[] | null
          target_user_id: string
        }
        Update: {
          action?: string
          assigned_by?: string
          created_at?: string | null
          id?: string
          new_roles?: string[] | null
          old_roles?: string[] | null
          target_user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_set_user_access: {
        Args: {
          _status: Database["public"]["Enums"]["account_status"]
          _user_id: string
        }
        Returns: undefined
      }
      are_collaborators: {
        Args: { _user1: string; _user2: string }
        Returns: boolean
      }
      assign_user_roles: {
        Args: { _action?: string; _roles: string[]; _target_user_id: string }
        Returns: undefined
      }
      can_access_board: {
        Args: { _board_id: string; _user_id: string }
        Returns: boolean
      }
      can_edit_board: {
        Args: { _board_id: string; _user_id: string }
        Returns: boolean
      }
      get_board_collaborators: {
        Args: { _board_id: string }
        Returns: {
          avatar_url: string
          city: string
          country: string
          relationship: string
          role_name: string
          user_id: string
          username: string
        }[]
      }
      get_collaborator_info: {
        Args: { _user_id: string }
        Returns: {
          account_status: string
          avatar_url: string
          city: string
          country: string
          is_active: boolean
          user_id: string
          username: string
        }[]
      }
      get_safe_profile_info: {
        Args: { _user_id: string }
        Returns: {
          avatar_url: string
          city: string
          country: string
          user_id: string
          username: string
        }[]
      }
      get_user_contact_info: {
        Args: { _user_id: string }
        Returns: {
          church_name: string
          email: string
          phone_number: string
        }[]
      }
      get_user_primary_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_prayer_count: {
        Args: { _id: string }
        Returns: {
          country_code: string
          country_name: string
          created_at: string
          id: string
          prayer_count: number
          updated_at: string
        }
      }
      secure_contact_access: {
        Args: { _access_type?: string; _target_user_id: string }
        Returns: Json
      }
    }
    Enums: {
      account_status: "pending" | "approved" | "denied"
      app_role: "dev" | "admin" | "team_leader" | "volunteer" | "guest"
      board_member_role: "owner" | "admin" | "member" | "viewer"
      board_visibility: "private" | "team" | "public"
      card_priority: "low" | "medium" | "high"
      card_status: "todo" | "in_progress" | "review" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["pending", "approved", "denied"],
      app_role: ["dev", "admin", "team_leader", "volunteer", "guest"],
      board_member_role: ["owner", "admin", "member", "viewer"],
      board_visibility: ["private", "team", "public"],
      card_priority: ["low", "medium", "high"],
      card_status: ["todo", "in_progress", "review", "done"],
    },
  },
} as const
