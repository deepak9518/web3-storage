import {
  refreshToken,
  validateToken,
} from "../../services/user/validate-token.service";
import { getUserDetails } from "../../services/user/user-details.service";
import { UserState, User } from "./types";
import { getWalletsBalance } from "../../services/wallets/wallet.service";
import { ObjectType } from "src/utils/types";

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    lastName: "",
    userId: "",
    status: "",
    firstName: "",
    walletName: "",
    countryCode: "",
    created: -1,
    isEmailVerified: false,
    isPhoneVerified: false,
    phone: "",
    type: "",
    verified: false,
    walletId: "",
    walletStatus: "",
    balance: "",
    blockchainHash: "",
    blockchainStatus: "",
    isBlockchainVerified: "",
    kycProvider: "",
    publicKey: "",
    storageProvider: "",
    transactionId: "",
    updated: "",
    wallets: [
      {
        balance: "",
        blockchainHash: "",
        blockchainStatus: "",
        isBlockchainVerified: "",
        kycProvider: "",
        publicKey: "",
        storageProvider: "",
        transactionId: "",
        updated: "",
      },
    ],
  },

  token: "",
  refreshToken: "",
  isAuthenticated: false,
  status: "",
  userId: "",
  accountId: "",
  error: "",
};

interface IUserDetailsParam {
  userId: string;
}

export const validateTokenThunk = async (token: string) => {
  return await validateToken(token);
};

export const userDetailsThunk = async ({ userId }: IUserDetailsParam) => {
  return await getUserDetails(userId);
};

export const refreshTokenThunk = async () => {
  return await refreshToken();
};

export const userWalletsBalanceThunk = async ({
  walletId,
}: {
  walletId: string;
}) => {
  return await getWalletsBalance(walletId);
};

export const userReducer = (
  state = initialState,
  { type, payload }: ObjectType
) => {
  switch (type) {
    case "setAuthenticated":
      return {
        ...state,
        isAuthenticated: payload,
      };
    case "setUser":
      return {
        ...state,
        user: payload,
      };
    case "setToken":
      return {
        ...state,
        token: payload,
      };
    case "setUserId":
      return {
        ...state,
        userId: payload,
      };
    case "setAccountId":
      return {
        ...state,
        accountId: payload || "",
      };
    case "setWalletId":
      return {
        ...state,
        user: { ...state.user, walletName: payload },
      };
    case "clearError":
      return {
        ...state,
        error: "",
      };
    case "resetUser":
      return initialState;

    default:
      return state;
  }
};

// export const { setAuthenticated, resetUser, setUser, setToken, setUserId, setWalletId, clearError, setAccountId } =
//   userSlice.actions;

// export default userSlice.reducer;
