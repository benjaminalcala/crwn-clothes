import {AnyAction} from 'redux';
import {UserData} from "../../utils/firebase/firebase.utils";

import  {signInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess} from './user.action';

export type UserState = {
  readonly currentUser: null | UserData;
  readonly error: null | Error;
  readonly isLoading: boolean
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  error: null,
  isLoading: false
}

export const userReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};

