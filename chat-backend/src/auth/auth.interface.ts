export type AuthToken = {
  accessToken: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
};
