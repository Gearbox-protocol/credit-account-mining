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

const setClaimObject = (payload: IClaimObject | null): IActionSetClaimObject => ({
  type: ActionTypeLoading.SET_CLAIM_OBJECT,
  payload,
});

const setUser = (payload: User | null): IActionSetUser => ({
  type: ActionTypeLoading.SET_USER,
  payload,
});

export type UserActions = IActionSetClaimObject | IActionSetUser;
export type { IActionSetClaimObject, IActionSetUser };
export { setClaimObject, setUser };
