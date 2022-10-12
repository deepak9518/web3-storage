import { searchWallets } from 'src/services/wallets/wallet.service';
import { useMutation } from 'react-query';

export function useSearchWallets() {
  return useMutation((searchQuery: string) => searchWallets(searchQuery));
}
