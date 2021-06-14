import 'firebase/auth';
import firebase from 'firebase/app';

let _app: firebase.app.App | null = null;

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

  if (firebase.apps.length > 0) {
    return (_app = firebase.app());
  } else {
    _app = firebase.initializeApp(firebaseConfig);
    return _app;
  }
}

export async function getFirebaseUser(): Promise<firebase.User | null> {
  return new Promise(resolve => {
    getApp()
      .auth()
      .onAuthStateChanged(user => {
        resolve(user);
      });
  });
}

export async function createFirebaseUserWithEmail(email: string, password: string) {
  const credential = await getApp().auth().createUserWithEmailAndPassword(email, password);

  return credential.user;
}

export async function signInFirebaseWithEmail(email: string, password: string) {
  const credential = await getApp().auth().signInWithEmailAndPassword(email, password);

  return credential.user;
}

export async function signInFirebaseWithTwitter() {
  const provider = new firebase.auth.TwitterAuthProvider();

  const credential = await getApp().auth().signInWithPopup(provider);

  return credential.user;
}

export async function signOutFirebase() {
  await getApp().auth().signOut();
}
