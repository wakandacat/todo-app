import React, {useEffect, useContext} from "react";
import '../styles/task.css';
import GlobalContext from "./GlobalContext";

function Task(props){

    const {globalTasks, setGlobalTasks} = useContext(GlobalContext);
    const {refetchData, setRefetchData} = useContext(GlobalContext);

    function completeTask(){

        //send the data in a json format to the backend
        fetch("http://localhost/todo-backend/update_task.php", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded" //form data so we can use POST
            },
            body: new URLSearchParams({
                id: props.taskId,
                completed: props.completed ? 0 : 1,
            })
        })
        .then(response => response.text())
        .then(data => {
            //console.log("Raw PHP response:", data);
           //console.log(data);
            const taskObjects = {
                id: parseInt(data.id), // convert id to integer
                text: data.task,
                completed: parseInt(data.completed),
                type: data.type
            };

            //update the global tasks with the changed values
            setGlobalTasks(prevTasks =>
                prevTasks.map(task => task.id === taskObjects.id ? taskObjects : task)
            );

            //let the TaskTable know that it needs to refetch the data
            setRefetchData(prev => prev + 1);

        });
    }

    return(
        <tr className="task">
            {props.completed ? (<td><button onClick={() => completeTask()} className="tableButton checked"><p>&#10003;</p></button></td>) : (<td><button onClick={() => completeTask()} className="tableButton"><p></p></button></td>)}
            <td><h3>{props.text}</h3></td>
            <td><h3>{props.type}</h3></td>
            <td><button className="tableButton">&#8593;</button></td>
            <td><button className="tableButton">X</button></td>
        </tr>
    );
}

export default Task;