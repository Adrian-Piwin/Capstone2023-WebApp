import * as React from "react";

import { useState } from "react";
import { CampusConfig } from "./components/CampusConfig";
import { SignIn } from "./components/SignIn";
import { Terminal } from "./components/Terminal";

export function App() {
  const [scene, setScene] = useState(1);
  const [lobbyID, setLobbyID] = useState("");

  const logIn = (userLobbyID, username) => {
    setLobbyID(userLobbyID);

    if (username == "admin")
      setScene(3);
    else
      setScene(2);
  };

  return (
    <div id="app">
      <h1>Campus Quest</h1>

      {scene == 1 ?
        <SignIn onLoginSuccess={logIn} style={{display: scene == 1 ? "block" : "none"}}></SignIn> :
        scene == 2 ? 
        <CampusConfig lobbyID={lobbyID} style={{display: scene == 2 ? "block" : "none"}}></CampusConfig> :
        <Terminal />
      }
      
    </div>
  );
}
