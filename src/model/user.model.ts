export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface I_LOGINREQUEST {
  email: string;
  password: string;
}

export interface I_METARESPONSE {
  status: string | number;
  message: string;
}

export interface I_USER_RESPONSE {
  id: number | string;
  username: string;
  password: string;
  name: string;
  email: string;
  token?: string;
}
