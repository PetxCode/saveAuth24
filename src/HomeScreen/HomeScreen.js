import React, { useState, useEffect } from "react";
import { app } from "../base";

const newUser = app.firestore().collection("user");

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [post, setPost] = useState("");

  const [show, setShow] = useState(null);
  const [showAll, setShowAll] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const register = async () => {
    const theUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(theUser);

    await newUser.doc(theUser.user.uid).set({
      name,
      email,
      password,
    });
  };

  const addData = (docs) => {
    const user = app.auth().currentUser;

    if (user) {
      newUser
        .doc(user.uid)
        .collection("Activities")
        .doc(docs)
        .set({
          post,
        })
        .then((ref) => {
          console.log(ref);
        });
    }
  };

  const readData = async () => {
    const user = await app.auth().currentUser;
    if (user) {
      newUser
        .doc(user.uid)
        .collection("Activities")
        .get()
        .then((doc) => {
          setShowAll(doc.data());
          console.log("Show all Data", showAll);
        })
        .catch((err) => console.log(err));

      // .onSnapshot((snapshot) => {
      //   const item = [];
      //   snapshot.forEach((doc) => {
      //     item.push(doc.data);
      //   });
      //   setShowAll(item);
      //   console.log("Show all Data", showAll);
      // });
    }

    // await newUser
    //   .doc(user.uid)
    //   .collection("Activities")
    //   .doc(docs.id)
    //   .add({
    //     post,
    //   })
    //   .then((ref) => {
    //     console.log(ref);
    //   });
  };

  const getData = async () => {
    const user = await app.auth().currentUser;

    if (user) {
      newUser
        .doc(user.uid)
        .collection("Activities")

        .onSnapshot((snapshot) => {
          const item = [];
          snapshot.forEach((doc) => {
            item.push(doc.data());
          });
          setShowAll(item);
          console.log("Show all Data", showAll);
        });
    }
  };

  // const getData = async () => {
  //   const user = await app.auth().currentUser;
  // };

  useEffect(() => {
    // const postData = async (user) => {
    //   newUser.doc(user.uid).add({
    //     post,
    //   });
    // };
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        newUser
          .doc(user.uid)
          .get()
          .then((doc) => {
            setShow(doc.data());
            console.log(show);
          });
      }
    });
    addData();
    getData();
    // readData();
  }, []);
  return (
    <div>
      <br />
      <br />
      <br />
      <div>This is the home Page</div>
      <div>
        <br />
        <br />
        <br />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <br />
      <div>
        <button onClick={register}>Sign Up</button>
        <button
          onClick={() => {
            app.auth().signInWithEmailAndPassword(email, password);
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            app.auth().signOut();
          }}
        >
          Sign Out
        </button>
      </div>
      <br />
      <br />
      <br />
      <div> {show && show.name} </div>

      <br />
      <br />
      <br />
      <div>
        <input
          placeholder="Post"
          value={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addData();
          }}
        >
          {" "}
          Add
        </button>
      </div>
      <div>
        {showAll.map(({ post, id }) => (
          <div key={id}>
            <h3>{post}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
