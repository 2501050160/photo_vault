
export interface UserConfig {
  id: string;
  name: string;
  username: string;
  password: string;
  driveLink: string;
  imageUrl: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserConfig | null;
}
