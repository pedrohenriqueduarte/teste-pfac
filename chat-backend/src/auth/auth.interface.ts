import { User } from '@prisma/client';

export type AuthToken = {
  accessToken: string;
  user: User;
};

export type JwtPayload = {
  sub: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
};
