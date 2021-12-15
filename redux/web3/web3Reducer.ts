import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { User } from 'utils/API/join/join';
import { IClaimObject } from 'utils/API/web3/make-claim';
import { Web3Actions } from './web3Action';
import ActionType from './web3ActionTypes';

interface IWeb3State extends DefaultRootState {
  claimObject: IClaimObject | null;
  user: User | null;
  address: string | null;
  metamaskSubscribed: boolean;
  web3Connected: boolean;
}

const web3DefaultState: IWeb3State = {
  claimObject: null,
  user: null,
  address: null,
  metamaskSubscribed: false,
  web3Connected: false,
};

const userReducer: Reducer<IWeb3State, Web3Actions> = (state = web3DefaultState, action) => {
  switch (action.type) {
    case ActionType.SET_CLAIM_OBJECT:
      return { ...state, claimObject: action.payload };
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.SET_ADDRESS:
      return { ...state, address: action.payload };
    case ActionType.SET_SUBSCRIPTION: {
      return {
        ...state,
        metamaskSubscribed: action.payload,
      };
    }
    case ActionType.SET_CONNECTION:
      return {
        ...state,
        web3Connected: action.payload,
      };
    default:
      return state;
  }
};

export type { IWeb3State };
export { web3DefaultState };
export default userReducer;
