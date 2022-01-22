import 'firebase/auth';
import { getApps, getApp as firebaseGetApp, initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

let _app: FirebaseApp | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getApp() {
  if (_app) return _app;

  if (getApps.length > 0) {
    return (_app = firebaseGetApp());
  } else {
    _app = initializeApp(firebaseConfig);
    return _app;
  }
}

export async function getFirebaseUser(): Promise<User | null> {
  return new Promise(resolve => {
    const auth = getAuth(getApp());
    onAuthStateChanged(auth, user => resolve(user));
  });
}

export async function createFirebaseUserWithEmail(email: string, password: string) {
  const auth = getAuth(getApp());
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  return credential.user;
}

export async function signInFirebaseWithEmail(email: string, password: string) {
  const auth = getAuth(getApp());
  const credential = await signInWithEmailAndPassword(auth, email, password);

  return credential.user;
}

export async function signInFirebaseWithTwitter() {
  const auth = getAuth(getApp());
  const provider = new TwitterAuthProvider();

  const credential = await signInWithPopup(auth, provider);

  return credential.user;
}

export async function signOutFirebase() {
  const auth = getAuth(getApp());
  await signOut(auth);
}
