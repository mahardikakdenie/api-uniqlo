export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export class UserReponse {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  token?: string;
}
