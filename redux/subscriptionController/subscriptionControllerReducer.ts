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
    case ActionType.SUBSCRIBE: {
      if (state.isSubscribed) {
        return {
          ...state,
          statusChanged: false,
        };
      }
      return {
        ...state,
        isSubscribed: true,
      };
    }
    case ActionType.UNSUBSCRIBE:
      return {
        ...state,
        isSubscribed: false,
        statusChanged: false,
      };
    case ActionType.RESET_STATUS:
      return {
        ...state,
        statusChanged: false,
      };
    case ActionType.CHANGE_STATUS:
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
