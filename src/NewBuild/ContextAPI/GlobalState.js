import { app } from "../../base";
import React, { createContext, useReducer, useEffect, useState } from "react";
import { AppReducer } from "./AppReducer.js";

// const initState = {
//   user: null,
// };

const dbUser = app.firestore().collection("dbUser");

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  const RegisterUser = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await dbUser
      .doc(newUser.user.uid)
      .get()
      .then((doc) => {
        setCurrentUser(doc.data());
      });
  };

  const SignInUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };
  const signOutUser = async () => {
    await app.auth().signOut();
  };

  const Pressing = () => {
    console.log("I love coding");
  };

  return (
    <AppContext.Provider
      value={{
        RegisterUser,
        SignInUser,
        signOutUser,
        Pressing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// const [state, dispatch] = useReducer(AppReducer, initState)
