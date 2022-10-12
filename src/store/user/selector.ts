import { ReduxState } from '../rootReducer';

export const getUserDataSelector = (state: ReduxState) => state.user;
