import React, { useEffect } from "react";
import { AddIcon, EyeIcon, ImportIcon, SignOutIcon } from "src/assets/svg";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxTypedHooks";
import { getUserDataSelector } from "src/store/user";

import * as Styled from "./UserDropdownMenu.styles";
import { UserBadge } from "../UserBadge";
import { QueryClient } from "react-query";
import { userWalletsBalanceThunk } from "src/store/user/slice";
import { userFiatNearDetailsThunk } from "src/store/common/slice";

export const UserDropdownMenu = () => {
  const queryClient = new QueryClient();
  const { user } = useAppSelector(getUserDataSelector);
  const { currency } = useAppSelector((state) => state.common);
  // const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch({ type: "resetUser" });

    dispatch({ type: "resetDataFiles" });
    dispatch({ type: "setToken", payload: "" });
    queryClient.invalidateQueries("token");
    localStorage.removeItem("persist:root");
    // router.replace('/signup');
  };

  useEffect(() => {
    // dispatch(userWalletsBalanceThunk({ walletId: user?.walletName }));
    // dispatch(userFiatNearDetailsThunk());
  }, []);

  const nearToUsdBalance = currency?.usd
    ? Number(user?.balance) * Number(currency.usd)
    : "";

  return (
    <Styled.MenuContainer>
      <Styled.CustomUserIcon width={40.86} height={39} />
      <Styled.NearBalance>{user.walletName}</Styled.NearBalance>
      <Styled.FiatValue>
        ${" "}
        {nearToUsdBalance
          ? String(nearToUsdBalance.toFixed(2))
          : user?.balance
          ? user?.balance
          : "0.00"}
      </Styled.FiatValue>
      {/* <Styled.StorageUsage>
        You are using <Styled.StorageUsageHighlight>5GB</Styled.StorageUsageHighlight> out of{' '}
        <Styled.StorageUsageHighlight>15GB (30%)</Styled.StorageUsageHighlight>
      </Styled.StorageUsage> */}
      <Styled.MyAccountsBlock>
        <Styled.MyAccountsLabel>My Accounts</Styled.MyAccountsLabel>
        <UserBadge
          name={user.walletName}
          balance={user?.balance ? user?.balance : "0.00"}
          avatar="/"
        />
      </Styled.MyAccountsBlock>
      <Styled.ActionBlock>
        {/*   <Styled.Action>
          <AddIcon />
          Add Account
        </Styled.Action>
        <Styled.Action>
          <ImportIcon />
          Import Account
        </Styled.Action>*/}
        <Styled.Action onClick={handleSignOut}>
          <SignOutIcon />
          Sign Out
        </Styled.Action>
      </Styled.ActionBlock>
    </Styled.MenuContainer>
  );
};
