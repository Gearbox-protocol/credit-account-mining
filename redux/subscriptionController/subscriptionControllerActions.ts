import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import ActionType from './subscriptionControllerActionTypes';

interface ISubscriptionSubscriber {
  type: ActionType.SUBSCRIBE;
}

interface ISubscriptionUnsubscribe {
  type: ActionType.UNSUBSCRIBE;
}

interface ISubscriptionResetStatus {
  type: ActionType.RESET_STATUS;
}

type ChangeErrors = Extract<
  TerminalErrorCodes,
  'DISCONNECTED' | 'CHAIN_CHANGED' | 'ACCOUNT_CHANGED'
>;

interface ISubscriptionChangeStatus {
  type: ActionType.CHANGE_STATUS;
  payload: ChangeErrors;
}

const subscriptionSubscriber = (): ISubscriptionSubscriber => ({
  type: ActionType.SUBSCRIBE,
});

const subscriptionUnsubscribe = (): ISubscriptionUnsubscribe => ({
  type: ActionType.UNSUBSCRIBE,
});

const subscriptionResetStatus = (): ISubscriptionResetStatus => ({
  type: ActionType.RESET_STATUS,
});

const subscriptionChangeStatus = (s: ChangeErrors): ISubscriptionChangeStatus => ({
  type: ActionType.CHANGE_STATUS,
  payload: s,
});

export type SubscriptionActions =
  | ISubscriptionSubscriber
  | ISubscriptionUnsubscribe
  | ISubscriptionResetStatus
  | ISubscriptionChangeStatus;

export type {
  ISubscriptionSubscriber,
  ISubscriptionUnsubscribe,
  ISubscriptionResetStatus,
  ISubscriptionChangeStatus,
};
export {
  subscriptionSubscriber,
  subscriptionUnsubscribe,
  subscriptionResetStatus,
  subscriptionChangeStatus,
};
