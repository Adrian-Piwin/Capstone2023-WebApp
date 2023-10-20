import * as React from "react";

import { useState } from "react";
import { CampusConfig } from "./components/CampusConfig";
import { SignIn } from "./components/SignIn";


export function App() {
  const [scene, setScene] = useState(1);
  const [lobbyID, setLobbyID] = useState("");

  const logIn = (userLobbyID) => {
    setLobbyID(userLobbyID);
    setScene(2);
  };

  return (
    <div id="app">
      <h1>Campus Quest</h1>

      {scene == 1 ?
        <SignIn onLoginSuccess={logIn} style={{display: scene == 1 ? "block" : "none"}}></SignIn> :
        <CampusConfig lobbyID={lobbyID} style={{display: scene == 2 ? "block" : "none"}}></CampusConfig>
      }
      
    </div>
  );
}
