import { IClaimObject, User } from 'utils/API/join/join';
import ActionTypeLoading from './userActionTypes';

interface IActionSetClaimObject {
  type: ActionTypeLoading.SET_CLAIM_OBJECT;
  payload: IClaimObject | null;
}

interface IActionSetUser {
  type: ActionTypeLoading.SET_USER;
  payload: User | null;
}

interface IActionSetAddress {
  type: ActionTypeLoading.SET_ADDRESS;
  payload: string | null;
}

const setClaimObject = (payload: IClaimObject | null): IActionSetClaimObject => ({
  type: ActionTypeLoading.SET_CLAIM_OBJECT,
  payload,
});

const setUser = (payload: User | null): IActionSetUser => ({
  type: ActionTypeLoading.SET_USER,
  payload,
});

const setAddress = (payload: string | null): IActionSetAddress => ({
  type: ActionTypeLoading.SET_ADDRESS,
  payload,
});

export type UserActions = IActionSetClaimObject | IActionSetUser | IActionSetAddress;
export type { IActionSetClaimObject, IActionSetUser, IActionSetAddress };
export { setClaimObject, setUser, setAddress };
