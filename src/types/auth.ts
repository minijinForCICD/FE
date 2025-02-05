export interface User {
    id: number;
    email: string;
    username: string;
    avatar?: string;
    role: 'user' | 'admin';
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  }  
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
    role: 'user' | 'admin';
  }
  