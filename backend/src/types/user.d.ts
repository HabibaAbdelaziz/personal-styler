export interface IUser {
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    stylePreferences?: {
        colors: string[];
        styles: string[];
    };
}