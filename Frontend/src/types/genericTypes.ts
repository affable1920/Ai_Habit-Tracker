export interface Habit {
  title: string;
  completed?: boolean;
  description?: string;
  status?: "complete" | "incomplete";

  category?: string;
  priority?: number;
  frequency?: string;

  id?: string;
  tempId?: string;
  streak?: number;
}

export interface Query {
  max: number;
  page: number;
  status: string | null;
  searchQuery: string | null;
}

export interface User {
  email: string;
  username: string;
  password?: string;
}
