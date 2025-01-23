export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface CreateUser {
  name: string;
  job: string;
}

export interface SearchFilter {
  searchQuery: string;
}
