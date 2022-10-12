// import { DataItemType } from "src/pages/dashboard";
import { getFiatNear } from "src/services/wallets/wallet.service";
import { CommonState } from "./type";
import { ObjectType } from "src/utils/types";

const initialState: CommonState = {
  activeDirectory: "",
  isDetailsShow: false,
  isFolderView: false,
  folderPath: "",
  currency: {
    eur: "",
    usd: "",
  },
};

export const userFiatNearDetailsThunk = async () => {
  return await getFiatNear();
};

export const commonReducer = (
  state = initialState,
  { type, payload }: ObjectType
) => {
  switch (type) {
    case "setActiveDirectory":
      return { ...state, activeDirectory: payload };

    case "toogleSetDetails":
      return { ...state, isDetailsShow: !state.isDetailsShow };

    case "setDataPreview":
      return { ...state, dataPreview: payload };

    case "setCopiedDataPreview":
      return { ...state, copiedDataPreview: payload };
    case "setFolderView":
      return { ...state, isFolderView: payload };
    case "setFolderPath":
      return { ...state, folderPath: payload };

    case "resetCommonState":
      return initialState;

    default:
      return state;
  }
};

// export const {
//   setActiveDirectory,
//   resetCommonState,
//   toogleSetDetails,
//   setDataPreview,
//   setCopiedDataPreview,
//   setFolderView,
//   setFolderPath,
// } = commonSlice.actions;

// export default commonSlice.reducer;
