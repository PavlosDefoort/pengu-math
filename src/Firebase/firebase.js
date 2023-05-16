import { getApp, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import Tests from "../data/Tests/tests.json";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  Timestamp,
  GeoPoint,
  updateDoc,
  setDoc,
  doc,
  FieldValue,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFRisGTXc2wq3ty1iTfYVfqjlCVIxw42M",
  authDomain: "pengumath.firebaseapp.com",
  projectId: "pengumath",
  storageBucket: "pengumath.appspot.com",
  messagingSenderId: "85369243093",
  appId: "1:85369243093:web:0cd62421f1aa62b8a1a95c",
  measurementId: "G-WXG5DTXCTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get a Firestore instance
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// sign in with Google
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const newUser = {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      profilePicture: user.photoURL,
    };
    updateUserDocument(newUser);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

function updateUserDocument(newUser) {
  const usersCollection = collection(firestore, "users");
  const userDocument = doc(usersCollection, newUser.uid);

  setDoc(userDocument, newUser, { merge: true });
}

function setupUserDocuments(newUser) {
  const userCollection = collection(firestore, "userQuizzes");
  const userDocument = doc(userCollection, newUser.uid);
  setDoc(userDocument, { attemptedTests: [] }, { merge: true });
}

async function updateUserQuizzesDocument(questions, info) {
  await new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated."));
      }
      unsubscribe();
    });
  });

  const userId = auth.currentUser.uid;
  const userQuizzesCollection = collection(firestore, "userQuizzes");
  const userQuizzesDocument = doc(userQuizzesCollection, userId);
  const timestamp = new Date(Date.now());

  const questionArray = await getScores();
  // initialize test object
  const test = {
    name: info.title,
    startTime: timestamp,
    questions: questions,
    complete: false,
    active: true,
    testID: generateId(),
  };
  questionArray.push(test);

  const question = {
    attemptedTests: questionArray,
  };
  await setDoc(userQuizzesDocument, question, { merge: true });
}

// Query for scores ordered by score
const getScores = async () => {
  const q = query(collection(firestore, "userQuizzes"));
  const querySnapshot = await getDocs(q);
  const userId = auth.currentUser.uid;

  const userDoc = querySnapshot.docs.find((doc) => doc.id === userId);
  if (userDoc) {
    return userDoc.data().attemptedTests || [];
  } else {
    return [];
  }
};

function generateId() {
  const randomId = Math.random().toString(36).substr(2, 9);
  return randomId;
}

// function that updates the status to false
async function updateStatus(testID) {
  // get the user id

  const userId = auth.currentUser.uid;
  // get the userQuizzes collection
  const userQuizzesCollection = collection(firestore, "userQuizzes");
  // get the userQuizzes document
  const userQuizzesDocument = doc(userQuizzesCollection, userId);
  // get the attemptedTests array
  const questionArray = await getScores();
  // find the test object

  const test = questionArray.find((test) => test.testID === testID);
  // update the test object

  test.active = false;

  // update the attemptedTests array

  const question = {
    attemptedTests: questionArray,
  };
  // update the userQuizzes document
  await setDoc(userQuizzesDocument, question, { merge: true });
}

export default app;
// Export types that exists in Firestore
export {
  signInWithGoogle,
  auth,
  firestore,
  updateUserQuizzesDocument,
  getScores,
  updateStatus,
  generateId,
};
