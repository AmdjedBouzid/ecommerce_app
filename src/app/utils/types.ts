export type Jwtpaylod = {
  id: number;
  isAdmin: boolean;
  email: string;
  password: string;
};

export type isLoginUserType = {
  Islogin: boolean;
  Uuser: Jwtpaylod;
};

export type User = {
  id: number;
  name: string;
  isAdmin: boolean;
  email: string;
  password: string;
};
export type UserDetails = {
  id: number;
  name: string;
  isAdmin: boolean;
  email: string;
  password: string;
  phone_number: string;
  img_profile: string;
  id_list: number;
  Bio: string;
};
