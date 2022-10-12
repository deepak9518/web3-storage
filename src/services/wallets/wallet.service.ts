import { API_FIAT_NEAR, API_WALLET_BALANCE } from '../../constants/api';
import { SearchWallets } from '../../store/data/types';
import { getRequest } from '../utils';

export const searchWallets = async (searchQuery: string): Promise<SearchWallets[]> => {
  const response = await getRequest(`/searchwallets/${searchQuery}`);
  const walletsData = response?.data?.body?.hits?.hits;
  return walletsData;
};

export const getWalletsBalance = async (walletId: string) => {
  const response = await getRequest(API_WALLET_BALANCE(walletId));
  const walletsData = response?.data;
  return walletsData;
};

export const getFiatNear = async () => {
  const response = await getRequest(API_FIAT_NEAR());
  const data = response?.data;
  return data;
};
