import { User } from 'utils/API/join/join';
import { TerminalErrorCodes } from 'utils/API/errors/TerminalError/TerminalError';
import { IClaimObject } from 'utils/API/web3/make-claim';
import ActionType from './web3ActionTypes';

interface IActionSetClaimObject {
  type: ActionType.SET_CLAIM_OBJECT;
  payload: IClaimObject | null;
}

interface IActionSetUser {
  type: ActionType.SET_USER;
  payload: User | null;
}

interface IActionSetAddress {
  type: ActionType.SET_ADDRESS;
  payload: string | null;
}

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

const setClaimObject = (payload: IClaimObject | null): IActionSetClaimObject => ({
  type: ActionType.SET_CLAIM_OBJECT,
  payload,
});

const setUser = (payload: User | null): IActionSetUser => ({
  type: ActionType.SET_USER,
  payload,
});

const setAddress = (payload: string | null): IActionSetAddress => ({
  type: ActionType.SET_ADDRESS,
  payload,
});

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

export type Web3Actions =
  | IActionSetClaimObject
  | IActionSetUser
  | IActionSetAddress
  | IActionSubscribe
  | IActionUnsubscribe
  | IActionconnectWeb3
  | IActionWeb3Disconnected
  | IActionSetSubscription
  | IActionSetConnection;
export type {
  IActionSetClaimObject,
  IActionSetUser,
  IActionSetAddress,
  IActionSubscribe,
  IActionUnsubscribe,
  IActionconnectWeb3,
  IActionWeb3Disconnected,
  IActionSetSubscription,
  IActionSetConnection,
};
export {
  setClaimObject,
  setUser,
  setAddress,
  subscribe,
  unsubscribe,
  connectWeb3,
  disconnectedWeb3,
  setSubscription,
  setConnection,
};
