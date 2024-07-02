export interface SalesManager {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  registrationDate: string;
  totalSales: number;
  password?: string; // Optional if not needed in the frontend
}
