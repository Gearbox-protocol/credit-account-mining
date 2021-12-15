import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import ActionType from './subscriptionActionTypes';

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

interface IActionSetConnection {
  type: ActionType.SET_CONNECTION;
  payload: boolean;
}

type DisconnectEvents = Extract<
TerminalErrorCodes,
'DISCONNECTED' | 'CHAIN_CHANGED' | 'ACCOUNT_CHANGED'
>;

interface IActionconnectWeb3 {
  type: ActionType.CONNECT_WEB3;
}

interface IActionWeb3Disconnected {
  type: ActionType.DISCONNECTED_WEB3;
  payload: DisconnectEvents;
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

const setConnection = (s: boolean): IActionSetConnection => ({
  type: ActionType.SET_CONNECTION,
  payload: s,
});

const connectWeb3 = (): IActionconnectWeb3 => ({
  type: ActionType.CONNECT_WEB3,
});

const disconnectedWeb3 = (s: DisconnectEvents): IActionWeb3Disconnected => ({
  type: ActionType.DISCONNECTED_WEB3,
  payload: s,
});

export type SubscriptionActions =
  | IActionSubscribe
  | IActionUnsubscribe
  | IActionconnectWeb3
  | IActionWeb3Disconnected
  | IActionSetSubscription
  | IActionSetConnection;

export type {
  IActionSubscribe,
  IActionUnsubscribe,
  IActionconnectWeb3,
  IActionWeb3Disconnected,
  IActionSetSubscription,
  IActionSetConnection,
};
export {
  subscribe, unsubscribe, connectWeb3, disconnectedWeb3, setSubscription, setConnection,
};
