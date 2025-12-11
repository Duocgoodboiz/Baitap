export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export type PublicUser = Omit<User, "email">;

// Roles & Permissions
export type UserRole = "admin" | "user" | "guest";
export type Permission = "read" | "write" | "delete" | "admin";

export type RolePermissions = Record<UserRole, Permission[]>;

export const ROLE_PERMISSIONS: RolePermissions = {
  admin: ["read", "write", "delete", "admin"],
  user: ["read", "write"],
  guest: ["read"],
};
