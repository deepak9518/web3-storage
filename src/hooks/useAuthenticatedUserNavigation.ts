// import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useAppSelector } from './useReduxTypedHooks';
/**
 * React hook to navigate back to sign up page if the user is not Authenticated
 */
function useAuthenticatedUserNavigation() {
  // const router = useRouter();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      // router.push('/signup');
    }
  }, [token]);
}

export default useAuthenticatedUserNavigation;
