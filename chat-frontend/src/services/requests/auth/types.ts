export interface User {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface Token extends User {
  accessToken: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}
