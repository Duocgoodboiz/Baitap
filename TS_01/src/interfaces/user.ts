// Import các interface con từ các file khác
import { Contact, Preferences, Metadata } from "./common";
import { Project } from "./project";
import { Order } from "./order";

// Định nghĩa chính cho User
export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  isActive: boolean;
  pointBalance: number;
  age: number | null;
  roles: string[];
  createdAt: Date;
  lastLogin: Date;
  contact: Contact;
  preferences: Preferences;
  scores: number[];
  projects: Project[];
  orders: Order[];
  metadata: Metadata;
  tags: string[];
  token: string;
  logInfo(): void;
  redeemPoints(points: number): number;
}
