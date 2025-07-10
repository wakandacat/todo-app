import React from "react";
import { useState, useEffect } from "react";
import '../styles/topbar.css';

function TopBar() {

    const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-US', {'dateStyle':'medium', 'timeStyle': 'long', 'hour12': false}));

    useEffect(() => {
        //update the time every second
        setInterval(() => {
            setDateTime(new Date().toLocaleString('en-US', {'dateStyle':'medium', 'timeStyle': 'long', 'hour12': false}));
        }, 1000);
    });

    return(<>
        <div id="topBar">
            <div style={{display: "flex", flexDirection: "column"}}>
                <h6 className="topBarInfo">iDROID VER 3.02</h6>
                <h1 id="title">MISSION LIST</h1>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h3 className="topBarInfo">{dateTime}</h3>
                <h3 className="topBarInfo">MOTHER BASE (SEYCHELLES WATERS)</h3>
            </div>
        </div>
    </>);
}

export default TopBar;