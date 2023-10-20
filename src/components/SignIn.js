import * as React from "react";
import { useState, useEffect } from "react";
import { apiURL } from "../constants";
import DBService from "../services/DBService";

export function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signInMsg, setSignInMsg] = useState("");
    const dbService = new DBService(apiURL);

    function handleSubmit(e) {
        e.preventDefault();
        
        handleLogin();
      }

    const handleLogin = async () => {
        var response = await dbService.login(username, password);
        if (response.success){
            props.onLoginSuccess(response.lobbyID);
        }
        else{
            setSignInMsg(response.msg)
        }
      };

    return (
        <form className="contentContainer" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input id="usernameInput" placeholder="Username" onChange={evt => setUsername(evt.target.value)}></input>
            <input id="passwordInput" type="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)}></input>
            <button type="submit">Submit</button>
            <p className="sendMsg">{signInMsg} &#8203;</p>
        </form>
    )
}