import { User } from 'utils/API/join/join';
import { IClaimObject } from 'utils/API/web3/make-claim';
import ActionTypeWeb3 from './web3ActionTypes';

interface IActionSetClaimObject {
  type: ActionTypeWeb3.SET_CLAIM_OBJECT;
  payload: IClaimObject | null;
}

interface IActionSetUser {
  type: ActionTypeWeb3.SET_USER;
  payload: User | null;
}

interface IActionSetAddress {
  type: ActionTypeWeb3.SET_ADDRESS;
  payload: string | null;
}

const setClaimObject = (payload: IClaimObject | null): IActionSetClaimObject => ({
  type: ActionTypeWeb3.SET_CLAIM_OBJECT,
  payload,
});

const setUser = (payload: User | null): IActionSetUser => ({
  type: ActionTypeWeb3.SET_USER,
  payload,
});

const setAddress = (payload: string | null): IActionSetAddress => ({
  type: ActionTypeWeb3.SET_ADDRESS,
  payload,
});

export type Web3Actions = IActionSetClaimObject | IActionSetUser | IActionSetAddress;
export type { IActionSetClaimObject, IActionSetUser, IActionSetAddress };
export { setClaimObject, setUser, setAddress };
