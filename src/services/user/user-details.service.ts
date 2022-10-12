import { API_USER } from '../../constants/api';
import { getRequest } from '../utils';
import { User } from '../../store/user/types';

const transformUserDetailsResponse = (userDetailsResponse: User, refreshToken: string) => {
  const { firstName, lastName, email, status, userId, walletName } = userDetailsResponse;

  return {
    refreshToken,
    data: {
      firstName,
      lastName,
      email,
      status,
      userId,
      walletName,
      balance: userDetailsResponse?.wallets[0]?.balance,
      blockchainHash: userDetailsResponse?.wallets[0]?.blockchainHash,
      blockchainStatus: userDetailsResponse?.wallets[0]?.blockchainStatus,
      isBlockchainVerified: userDetailsResponse?.wallets[0]?.isBlockchainVerified,
      kycProvider: userDetailsResponse?.wallets[0]?.kycProvider,
      publicKey: userDetailsResponse?.wallets[0]?.publicKey,
      storageProvider: userDetailsResponse?.wallets[0]?.storageProvider,
      transactionId: userDetailsResponse?.wallets[0]?.transactionId,
      updated: userDetailsResponse?.wallets[0]?.updated,
    },
  };
};

export interface IUserDetails {
  lastName: string;
  userId: string;
  status: string;
  firstName: string;
  walletName: string;
}

export const getUserDetails = async (userId: string): Promise<any> => {
  const response = await getRequest(`${API_USER}/${userId}`);
  return transformUserDetailsResponse(response?.data?.user, response?.data?.jwtRefreshToken);
};
