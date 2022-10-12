/* eslint-disable camelcase */
import { SIGN_UP_API } from '../../constants/api';
import { postRequest } from '../utils';

export interface ISignupServiceProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export const signupService = async ({
  email,
  firstName,
  lastName,
  password,
}: ISignupServiceProps): Promise<{
  token: string;
  userId: string;
  walletId: string;
}> => {
  try {
    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };
    const resp = await postRequest(SIGN_UP_API, data);
    return { token: resp?.data?.token, userId: resp?.data?.userId, walletId: resp?.data?.walletId };
  } catch (err) {
    throw new Error('signup API call Failed');
  }
};
