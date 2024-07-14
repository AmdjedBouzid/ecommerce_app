export type UserToken = {
  id: number;
  name: string;
  isAdmin: boolean;
  email: string;
  IsSuperAdmin: boolean;
  phone_number: string;
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
  IsSuperAdmin: boolean;
};
export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  counter: number;
  category: string;
}

export type BuyProduct = {
  id: number;
  amount: number;
};

export type request = {
  id_user: number;
  id_product: number;
  amount: number;
  date_request: string;
  date_accept: string;
  Is_Accepted: boolean;
  In_witing: boolean;
  Is_Regected: boolean;
  date_regect: string;
};

export type RorR = {
  email: string;
  img_Profile: string;
  id_product: number;
  name_product: string;
  img_product: string;
  amount: number;
  date_request: string;
};
