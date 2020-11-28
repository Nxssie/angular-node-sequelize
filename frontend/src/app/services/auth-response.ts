export interface AuthResponse {
  user: {
      id: number;
      password: string;
      name: string;
      username: string;
      isAdmin: boolean;
  },
  access_token: string
}