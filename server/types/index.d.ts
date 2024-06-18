import { JsonValue } from '@prisma/client/runtime/library';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: User;
    otp: string;
  }
}

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string;
  address: JsonValue;
  lastLoginIp: string | null;
  password: string;
  passwordResetToken: string | null;
  passwordResetTokenExpiration: Date | null;
  created_at: Date;
  updated_at: Date;
}
