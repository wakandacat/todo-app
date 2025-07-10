import React from "react";
import Task from "./Task";
import '../styles/tasktable.css';

function TaskTable(){

    //fetch all tasks from the database

    return(
        <table id="taskTable">
            <thead>
                <tr>
                    <th style={{width: "5%"}}></th>
                    <th style={{width: "75%"}}>All Missions</th>
                    <th style={{width: "10%"}}></th>
                    <th style={{width: "5%"}}></th>
                    <th style={{width: "5%"}}></th>
                </tr>
            </thead>
            <tbody>
                <Task completed={false} text="Brush your teeth" type="DAILY"/>
                <Task completed={false} text="PLAY OVERWATCH" type="URGENT"/>
                <Task completed={true} text="Take a walk" type="NONE"/>
                <Task completed={false} text="read yo book" type="STRETCH"/>
            </tbody>
        </table>
    );
}

export default TaskTable;