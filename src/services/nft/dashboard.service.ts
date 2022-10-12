import { API_DASHBOARD_DATA } from 'constants/api';
import { getRequest } from '../utils';

export interface IDashboardData {
  name: string;
  role: string;
  title: string;
}
export const getDashboardData = async (): Promise<IDashboardData[]> => {
  const res = await getRequest(API_DASHBOARD_DATA);
  if (res != null) {
    return res.data;
  }
  return [];
};
