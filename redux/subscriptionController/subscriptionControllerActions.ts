import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import ActionType from './subscriptionControllerActionTypes';

interface IActionSetSubscription {
  type: ActionType.SET_SUBSCRIPTION;
  payload: boolean;
}

interface IActionSubscribe {
  type: ActionType.SUBSCRIBE;
}

interface IActionUnsubscribe {
  type: ActionType.UNSUBSCRIBE;
}

interface IActionResetStatus {
  type: ActionType.RESET_STATUS;
}

type ChangeErrors = Extract<
TerminalErrorCodes,
'DISCONNECTED' | 'CHAIN_CHANGED' | 'ACCOUNT_CHANGED'
>;

interface IActionChangeStatus {
  type: ActionType.STATUS_CHANGED;
  payload: ChangeErrors;
}

const setSubscription = (s: boolean): IActionSetSubscription => ({
  type: ActionType.SET_SUBSCRIPTION,
  payload: s,
});

const subscribe = (): IActionSubscribe => ({
  type: ActionType.SUBSCRIBE,
});

const unsubscribe = (): IActionUnsubscribe => ({
  type: ActionType.UNSUBSCRIBE,
});

const resetStatus = (): IActionResetStatus => ({
  type: ActionType.RESET_STATUS,
});

const changeStatus = (s: ChangeErrors): IActionChangeStatus => ({
  type: ActionType.STATUS_CHANGED,
  payload: s,
});

export type SubscriptionActions =
  | IActionSubscribe
  | IActionUnsubscribe
  | IActionResetStatus
  | IActionChangeStatus
  | IActionSetSubscription;

export type {
  IActionSubscribe,
  IActionUnsubscribe,
  IActionResetStatus,
  IActionChangeStatus,
  IActionSetSubscription,
};
export {
  subscribe, unsubscribe, resetStatus, changeStatus, setSubscription,
};
