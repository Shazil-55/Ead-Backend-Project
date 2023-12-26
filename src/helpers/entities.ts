export interface User {
  id: string;
  name: string;
  phoneNo: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  degree: string;
  dob: Date;
  gender: string;
  startDate: Date;
  endDate: string;
  city: string;
  interest: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Blocked = 'Blocked',
}

export enum UserTypes {
  Customer = 'Customer',
  Admin = 'Admin',
}
