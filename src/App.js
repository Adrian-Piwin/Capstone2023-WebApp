import * as React from "react";

import { useState } from "react";
import { POIList } from "./POIList";
import { loginUsername, loginPassword } from "./constants";


export function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInMsg, setSignInMsg] = useState("");
  const [scene, setScene] = useState(1);

  // Attempt signin
  function handleSubmit(e) {
    e.preventDefault();
    
    if (username == loginUsername && password == loginPassword)
      setScene(1)
    else
      setSignInMsg("Incorrect Login")
  }

  return (
    <div id="app">
      <div id="title">Campus Companion</div>

      <form id="signIn" style={{display: scene == 0 ? "flex" : "none"}} onSubmit={handleSubmit}>
        <div>Sign In</div>
        <input id="usernameInput" placeholder="Username" onChange={evt => setUsername(evt.target.value)}></input>
        <input id="passwordInput" type="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)}></input>
        <button type="submit">Submit</button>
        <p>{signInMsg} &#8203;</p>
      </form>

      <POIList style={{display: scene == 1 ? "block" : "none"}}></POIList>
      
    </div>
  );
}

