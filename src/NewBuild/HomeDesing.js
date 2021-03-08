import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./ContextAPI/GlobalState";

const HomeDesing = () => {
  const { RegisterUser, SignInUser, signOutUser, Pressing } = useContext(
    AppContext
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      <div>This is the New Home</div>
      <br />
      <div
        style={{
          dislay: "flex",
          flexDirection: "column",
          width: "300px",
          // backgroundColor: "dodgerblue",
        }}
      >
        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={() => {
              console.log("Just Pressed");
              RegisterUser();
            }}
          >
            Sign Up
          </Button>
          <Button onClick={SignInUser}>Sign In</Button>
          <Button onClick={Pressing}>Sign Out</Button>
        </div>
      </div>
    </div>
  );
};

export default HomeDesing;
