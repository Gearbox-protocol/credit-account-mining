import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import ActionType from './subscriptionControllerActionTypes';

interface ISetSubscription {
  type: ActionType.SET_SUBSCRIPTION;
  payload: boolean;
}

interface ISubscribe {
  type: ActionType.SUBSCRIBE;
}

interface IUnsubscribe {
  type: ActionType.UNSUBSCRIBE;
}

interface IResetStatus {
  type: ActionType.RESET_STATUS;
}

type ChangeErrors = Extract<
TerminalErrorCodes,
'DISCONNECTED' | 'CHAIN_CHANGED' | 'ACCOUNT_CHANGED'
>;

interface IChangeStatus {
  type: ActionType.STATUS_CHANGED;
  payload: ChangeErrors;
}

const setSubscription = (s: boolean): ISetSubscription => ({
  type: ActionType.SET_SUBSCRIPTION,
  payload: s,
});

const subscribe = (): ISubscribe => ({
  type: ActionType.SUBSCRIBE,
});

const unsubscribe = (): IUnsubscribe => ({
  type: ActionType.UNSUBSCRIBE,
});

const resetStatus = (): IResetStatus => ({
  type: ActionType.RESET_STATUS,
});

const changeStatus = (s: ChangeErrors): IChangeStatus => ({
  type: ActionType.STATUS_CHANGED,
  payload: s,
});

export type SubscriptionActions =
  | ISubscribe
  | IUnsubscribe
  | IResetStatus
  | IChangeStatus
  | ISetSubscription;

export type {
  ISubscribe, IUnsubscribe, IResetStatus, IChangeStatus, ISetSubscription,
};
export {
  subscribe, unsubscribe, resetStatus, changeStatus, setSubscription,
};
