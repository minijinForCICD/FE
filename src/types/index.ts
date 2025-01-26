export interface User {
 id: string;
 email: string;
 username: string;
}

export type AuthState = {
 user: User | null;
 isAuthenticated: boolean;
};
