import React from "react";
import { useState, useEffect } from "react";
import '../styles/topbar.css';

function TopBar() {

    const [dateTime, setDateTime] = useState(new Date().toLocaleString('en-US', {'dateStyle':'medium', 'timeStyle': 'long', 'hour12': 'false'}));

    useEffect(() => {
        //update the time every second
        setInterval(() => {
            setDateTime(new Date().toLocaleString('en-US', {'dateStyle':'medium', 'timeStyle': 'long', 'hour12': 'false'}));
        }, 1000);
    });

    return(<>
        <div id="topBar">
            <h1 id="title">MISSION LIST</h1>
            <h3 id="dateTime">{dateTime}</h3>
        </div>
    </>);
}

export default TopBar;