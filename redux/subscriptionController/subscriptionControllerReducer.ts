import { Reducer } from 'redux';
import { DefaultRootState } from 'react-redux';
import { SubscriptionActions } from './subscriptionControllerActions';
import ActionType from './subscriptionControllerActionTypes';

interface ISubscriptionState extends DefaultRootState {
  isSubscribed: boolean;
  statusChanged: boolean;
}

const subscriptionDefaultState = { isSubscribed: false, statusChanged: false };

const controllerReducer: Reducer<ISubscriptionState, SubscriptionActions> = (
  state = subscriptionDefaultState,
  action,
) => {
  switch (action.type) {
    case ActionType.SET_SUBSCRIPTION: {
      return {
        ...state,
        statusChanged: false,
        isSubscribed: action.payload,
      };
    }
    case ActionType.RESET_STATUS:
      return {
        ...state,
        statusChanged: false,
      };
    case ActionType.STATUS_CHANGED:
      return {
        ...state,
        statusChanged: true,
      };
    default: {
      return state;
    }
  }
};

export type { ISubscriptionState };
export { subscriptionDefaultState };
export default controllerReducer;
