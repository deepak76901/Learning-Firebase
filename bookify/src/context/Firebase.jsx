// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);

export const useFirebase = useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};
