export interface Habit {
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  frequency?: string;

  id?: string;
  tempId?: string;
}

export interface Query {
  max: number;
  page: number;
  status: string | null;
  searchQuery: string | null;
}
