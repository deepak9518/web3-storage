import { listOfUsersOfFileAccess } from '../../services/file/file.service';
import { useQuery } from 'react-query';
import { API_LIST_OF_USERS_FILE_ACCESS } from 'constants/api';
export const useGetUsersFileAccessList = ({
  walletId,
  fileId,
  enabled,
}: {
  walletId: string;
  fileId: string;
  enabled: boolean;
}) => {
  return useQuery(
    API_LIST_OF_USERS_FILE_ACCESS(walletId, fileId),
    () => listOfUsersOfFileAccess({ walletId, fileId }),
    {
      enabled: enabled,
    }
  );
};
