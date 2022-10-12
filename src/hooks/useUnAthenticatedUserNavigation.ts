// import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useAppSelector } from './useReduxTypedHooks';

/**
 * Hook to navigate user to main screen if he is already logged in
 * Include this hook at top of Unathenticated/Public pages
 */
function useUnAthenticatedUserNavigation() {
  // const router = useRouter();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      // router.replace('/dashboard');
    }
  }, [token]);
}

export default useUnAthenticatedUserNavigation;
