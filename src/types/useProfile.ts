export interface UserProfile {
  user: {
    id?: string;
    imagePath?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
  };
  address: {
    id?: string;
    _Address?: string;
    userId?: string;
    postCode?: string;
  };
}
export interface UserProfileUpdata {
  imagePath?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ValidatedFields {
  id: string;
  firstName: string;
  email: string;
  phoneNumber: string;
}

export interface userAddressForm {
  address: string;
  postCode: string;
}
export interface singleAddress {
  id: number;
  _Address?: string;
  userId?: string;
  postCode?: string;
}
export interface editAddressForm {
  id: number;
  address?: string;
  postCode?: string;
}
