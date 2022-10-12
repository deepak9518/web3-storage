export interface User {
  name: string;
  created: number;
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: string;
  countryCode: string;
  userId: string;
  walletId: string;
  walletName: string;
  walletStatus: string;
  verified: boolean;
  balance: string;
  blockchainHash: string;
  blockchainStatus: string;
  isBlockchainVerified: string;
  kycProvider: string;
  publicKey: string;
  storageProvider: string;
  transactionId: string;
  updated: string;
  wallets: [
    {
      balance: string;
      blockchainHash: string;
      blockchainStatus: string;
      isBlockchainVerified: string;
      kycProvider: string;
      publicKey: string;
      storageProvider: string;
      transactionId: string;
      updated: string;
    }
  ];
}

export interface Wallet {
  balance: string;
  blockchainHash: string;
  blockchainStatus: string;
  created: string;
  isBlockchainVerified: string;
  kycProvider: string;
  publicKey: string;
  storageProvider: string;
  transactionId: string;
  updated: string;
  walletId: string;
}

export type UserState = {
  user: User;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  status: string;
  userId: string;
  accountId: string;
  error: string | undefined;
};

export interface RequestUser {
  email?: string;
  phone?: string;
  type: string;
  accountId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  walletStatus?: string;
  walletId?: string;
  walletName?: string; // need to be removed after all the api has been referred to walletId variable
  status?: string;
  created?: number;
  verified?: boolean;
  countryCode?: string;
}

export interface ISignupServiceRequestProps {
  requestData: RequestUser;
}

export interface ISignUpServiceResponse {
  data: {
    jwtAccessToken: string;
    jwtRefreshToken: string;
    user: User;
  };
}

export interface ILoginRequest {
  accountId: string;
}

export interface ILoginResponse {
  message: string;
  channelType: string;
  email?: string;
  phone?: string;
  countryCode?: string;
}
