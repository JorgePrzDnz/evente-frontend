export interface LoginResponse{
  user: User,
  token: string
}

export interface loginRequest{
  email: string,
  password: string,
}

export interface registerRequest{
  name: string,
  surname: string,
  email: string,
  password: string,
  password_confirmation: string,
}

export interface RegisterResponse{
  user: User,
  token: string
}

export interface User{
  name: string,
  email: string
}

export interface updateProfileRequest{
  name: string,
  surname: string,
  password: string,
}

export interface UpdateProfileResponse{
  status: string,
  user: User
}



