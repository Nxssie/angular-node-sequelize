export interface AuthResponse {
  user: {
    id: number;
    username: string;
    name: string;
    access_token: string;
    expires_in: string;
  };
}
