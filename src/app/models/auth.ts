export interface LoginResponse{
  user: User,
  token: string
}

export interface loginRequest{
  email: string,
  password: string,
}

export interface User{
  name: string,
  email: string
}




