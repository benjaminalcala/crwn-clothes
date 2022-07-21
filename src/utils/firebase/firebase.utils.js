import { initializeApp } from "firebase/app";
import {getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
getFirestore,
doc,
getDoc,
setDoc
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBQO-kBvA-0PMr2CL6fNzfb_ZfPqW-CXTQ",
  authDomain: "crwn-clothes-2c054.firebaseapp.com",
  projectId: "crwn-clothes-2c054",
  storageBucket: "crwn-clothes-2c054.appspot.com",
  messagingSenderId: "477492921872",
  appId: "1:477492921872:web:bdd4b913c6c2e8ec95ac95"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters(
  {prompt: 'select_account'}
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromUserAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db,'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {email, displayName } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
        ...additionalInformation
      })
    } catch (err){
      console.log('error creating the user', err.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async(email, password)  => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);

}