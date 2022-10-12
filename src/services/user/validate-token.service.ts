import { API_REFRESH_TOKEN, VALIDATE_TOKEN } from '../../constants/api';
import { User } from '../../store/user/types';
import store from '../../store';
import { postRequest } from '../utils';

export const validateToken = async (
  token: string
): Promise<{
  data: User;
  isAuthenticated: boolean;
}> => {
  try {
    const resp = await postRequest(VALIDATE_TOKEN, { token: token });
    return { data: resp?.data?.data, isAuthenticated: resp?.data?.authenticated };
  } catch (err) {
    throw new Error('validateToken API call Failed');
  }
};

export const refreshToken = async () => {
  const { user, refreshToken } = store.getState().user;
  try {
    const resp = await postRequest(API_REFRESH_TOKEN, {
      refreshToken: refreshToken as string,
      walletName: user?.walletName,
    });
    return resp?.data;
  } catch (err) {
    throw new Error('Refresh token Failed');
  }
};
