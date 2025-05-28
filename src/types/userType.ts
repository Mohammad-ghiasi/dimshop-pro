export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string | null;
  normalizedEmail: string | null;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  imagePath: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface UserWithRole {
  user: User;
  role: string;
}
