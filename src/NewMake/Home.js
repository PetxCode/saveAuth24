import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../base";

const bestUser = app.firestore().collection("bestUser");
const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [task, setTask] = useState("");

  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const SignUpUser = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await bestUser.doc(newUser.user.uid).set({
      name,
      email,
      password,
      bio,
    });
  };

  const signInUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };
  const signOutUser = async () => {
    await app.auth().signOut();
  };

  const addTask = async (docs) => {
    const newUser = app.auth().currentUser;

    if (newUser) {
      await bestUser.doc(newUser.uid).collection("Task").doc(docs).set({
        task,
      });
    }
  };

  const readData = async () => {
    const user = app.auth().currentUser;

    if (user) {
      await bestUser
        .doc(user.uid)
        .collection("Task")
        .onSnapshot((snapshot) => {
          const ten = [];
          snapshot.forEach((doc) => {
            ten.push(doc.data());
          });
          setUserData(ten);
        });
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        bestUser
          .doc(user.uid)
          .get()
          .then((doc) => {
            setCurrentUser(doc.data());
          });
      }
    });
    SignUpUser();
    signOutUser();
    signInUser();
    addTask();
    readData();
  }, []);

  return (
    <div>
      <br />
      <br />
      <h2>This is Home Page</h2>
      <br />
      <br />
      <br />
      <div
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="Bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <div
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button onClick={SignUpUser}>Sign Up</Button>
          <Button
            onClick={() => {
              signInUser();
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              signOutUser();
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div> {currentUser && currentUser.name} </div>
      <div> {currentUser && currentUser.bio} </div>
      <br />
      <br />
      <input
        style={{
          width: "300px",
          margin: "10px 0",
        }}
        placeholder="Task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <br />{" "}
      <Button
        onClick={() => {
          // app.auth().signOut();
          addTask();
          setTask("");
        }}
      >
        Add Task
      </Button>
      <br />
      <br />
      <br />
      <div>
        {userData.map(({ task, id }) => (
          <div key={id}>
            <h3>{task}</h3>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
