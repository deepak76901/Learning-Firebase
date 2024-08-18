// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByF2gr7BK0hTNgP7MOvOYPYeTD3pEiCZM",
  authDomain: "bookify-18df2.firebaseapp.com",
  projectId: "bookify-18df2",
  storageBucket: "bookify-18df2.appspot.com",
  messagingSenderId: "802417138390",
  appId: "1:802417138390:web:d0617fd2c75b3bc1170777",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateBookListing = async (name, isbnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `upload/images/${Date.now().toString().slice(-5)}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);

    return await addDoc(collection(firestore, "/books"), {
      name,
      price,
      isbn: isbnNumber,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      username: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const getAllBooks = () => getDocs(collection(firestore, "books"));

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupEmailAndPassword,
        signinEmailAndPassword,
        signinWithGoogle,
        handleCreateBookListing,
        getAllBooks,
        getImageUrl,
        getBookById,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
