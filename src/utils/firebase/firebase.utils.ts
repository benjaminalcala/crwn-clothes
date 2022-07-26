import { initializeApp } from "firebase/app";
import {getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";

import { Category } from "../../store/categories/categories.types";

import {
getFirestore,
doc,
getDoc,
setDoc,
collection,
writeBatch,
query,
getDocs,
QueryDocumentSnapshot
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

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (
  collectionKey: string, 
  objectsToAdd: T[]
  ) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object);
  })

  await batch.commit();
  
}


export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocFromUserAuth = async (
  userAuth: User, 
  additionalInformation = {} as AdditionalInformation
  ): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating the user', err)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async(email: string, password: string)  => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async() => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth,callback);
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth)=> {
      unsubscribe();
      resolve(userAuth);
    }, (error) => {
      reject(error)
    })
  })

}