import {takeLatest, all, call, put} from 'redux-saga/effects';
import { getCurrentUser, 
  createUserDocFromUserAuth, 
  signInWithGooglePopup, 
  signInAuthUserWithEmailAndPassword, 
  createAuthUserWithEmailAndPassword,
  signOutUser } from '../../utils/firebase/firebase.utils';
import { signInSuccess, signInFailed , signUpSuccess, signUpFailed, signOutFailed, signOutSuccess} from './user.action';
import { USER_ACTION_TYPES } from './user.types';




export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
  try{
    const snapshot = yield call(createUserDocFromUserAuth, userAuth, additionalDetails)
    yield put(signInSuccess({id: snapshot.id, ...snapshot.data()}))
  }catch(error){
    yield put(signInFailed(error))
  }

}

export function* signInWithGoogle(){
  try{
    const {user} = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  }catch(error){
    yield put(signInFailed(error))

  }
  
}

export function* signUp({payload: {email, password, displayName}}){
  try{
    const {user} =  yield call(createAuthUserWithEmailAndPassword,email, password);
    yield put(signUpSuccess(user, {displayName}));

  }catch(error){
    yield put(signUpFailed(error))
  }
    

}

export function* signOut(){
  try{
    yield call(signOutUser);
    yield put(signOutSuccess())

  }catch(error){
    yield put(signOutFailed(error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}){
  yield call(getSnapshotFromUserAuth, user, additionalDetails)

}

export function* signInWithEmail({payload: {email, password}}){
  try{
    const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  }catch(error){
    yield put(signInFailed(error))
  }
  
}

export function* isUserAuthenticated(){
  try{
    const userAuth = yield call(getCurrentUser);
    if(!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
    
  }catch(error){
    yield put(signInFailed(error))
  }
}

export function* onCheckUserSession(){
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignIn(){
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignIn(){
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)

 
}
export function* onSignUpStart(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
    
}

export function* onSignUpSuccess(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
    
}

export function* onSignOutStart(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
    
}



export function* userSagas(){
  yield all(
    [call(onCheckUserSession),
      call(onEmailSignIn),
      call(onGoogleSignIn),
      call(onSignUpStart),
      call(onSignUpSuccess),
      call(onSignOutStart)])
}