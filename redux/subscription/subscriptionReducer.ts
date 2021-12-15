import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { SubscriptionActions } from './subscriptionActions';
import ActionType from './subscriptionActionTypes';

interface ISubscriptionState extends DefaultRootState {
  metamaskSubscribed: boolean;
  web3Connected: boolean;
}

const subscriptionDefaultState = { metamaskSubscribed: false, web3Connected: false };

const controllerReducer: Reducer<ISubscriptionState, SubscriptionActions> = (
  state = subscriptionDefaultState,
  action,
) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};

export type { ISubscriptionState };
export { subscriptionDefaultState };
export default controllerReducer;
