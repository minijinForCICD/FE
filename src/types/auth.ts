export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }

  export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  