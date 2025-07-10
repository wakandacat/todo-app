import React from "react";
import '../styles/task.css';

function Task(props){

    return(
        <tr className="task">
            {props.completed ? (<td><button className="tableButton checked"><p>&#10003;</p></button></td>) : (<td><button className="tableButton"><p></p></button></td>)}
            <td><h3>{props.text}</h3></td>
            <td><h3>{props.type}</h3></td>
            <td><button className="tableButton">&#8593;</button></td>
            <td><button className="tableButton">X</button></td>
        </tr>
    );
}

export default Task;