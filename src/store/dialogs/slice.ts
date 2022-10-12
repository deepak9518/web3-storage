import { ObjectType } from 'src/utils/types';
import { DialogState } from './types';

const initialState: DialogState = {
  dialogType: null,
  dialogProps: {
    fileDetails: {},
    fileName: '',
  },
};


export const dialogReducer = (state = initialState, { type, payload }:ObjectType) => {
  switch (type) {
   case 'launchDialog': 
   return {
     ...payload
    };
    case 'closeDialog':
      return initialState;
  default:
    return state
  }
}


// export const { launchDialog, closeDialog } = dialogSlice.actions;

// export default dialogSlice.reducer;
