import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { IClaimObject, User } from 'utils/API/join/join';
import { UserActions } from './userAction';
import ActionType from './userActionTypes';

interface IUserState extends DefaultRootState {
  claimObject: IClaimObject | null;
  user: User | null;
  address: string | null;
}

const userDefaultState: IUserState = {
  claimObject: null,
  user: null,
  address: null,
};

const userReducer: Reducer<IUserState, UserActions> = (state = userDefaultState, action) => {
  switch (action.type) {
    case ActionType.SET_CLAIM_OBJECT:
      return { ...state, claimObject: action.payload };
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export type { IUserState };
export { userDefaultState };
export default userReducer;
