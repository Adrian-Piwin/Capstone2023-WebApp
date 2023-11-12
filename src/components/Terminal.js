import React, { useState } from 'react';
import { apiURL } from "../constants";
import DBService from "../services/DBService";

export function Terminal() {
    const [command, setCommand] = useState('');
    const [outputs, setOutputs] = useState([]);

    const dbService = new DBService(apiURL);

    var items = Array.from({ length: outputs.length }, (_, i) => {
        return <label key={i}>{outputs[i]}</label>
    });

    const handleChange = (e) => {
        setCommand(e.target.value);
    };

    const handleExecuteCommand = async () => {
        try {
            var response;
            if (~command.indexOf("post"))
            {
                // The command contains "post"
                response = await dbService.postRequest(command.replace("post ", ""));
            }
            else if (~command.indexOf("get"))
            {
                // The command contains "get"
                response = await dbService.getRequest(command.replace("get ", ""));
            }else{
                setOutputs([...outputs, 'Commnd must start with get or post']);
                return;
            }

            // Display the results in the terminal
            setOutputs([...outputs, response]);
            setCommand("");
        } catch (error) {
            console.error('Error:', error);
            setOutputs([...outputs, 'An error occurred']);
        }
    };

    return (
        <div className='contentContainer' style={{width: "800px", maxWidth: "800px"}}>
            <div className="terminal" style={{height: "800px", overflow: "auto", display: "flex", flexDirection: "column", gap: "10px"}}>
                {items}
            </div>
            <div className='subContent'>
                <input
                    type="text"
                    value={command}
                    onChange={handleChange}
                    placeholder="Enter a command..."
                />
                <button onClick={handleExecuteCommand}>Execute</button>
            </div>
        </div>
    );
};
