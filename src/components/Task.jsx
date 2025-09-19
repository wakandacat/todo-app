import React, {useEffect, useContext} from "react";
import '../styles/task.css';
import GlobalContext from "./GlobalContext";

function Task(props){

    const {globalTasks, setGlobalTasks} = useContext(GlobalContext);
    const {refetchData, setRefetchData} = useContext(GlobalContext);
    const {view, setView} = useContext(GlobalContext);
    const {updatingTask, setUpdatingTask} = useContext(GlobalContext);

    function updateTask(){

        //send the data in a json format to the backend
        fetch("http://localhost/todo-backend/update_task.php", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded" //form data so we can use POST
            },
            body: new URLSearchParams({
                id: props.taskId,
                task: props.text,
                type: props.type,
                completed: props.completed ? 0 : 1,
                time_created: props.time_created
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
                type: data.type,
                time_created: data.time_created
            };

            //update the global tasks with the changed values
            setGlobalTasks(prevTasks =>
                prevTasks.map(task => task.id === taskObjects.id ? taskObjects : task)
            );

            //let the TaskTable know that it needs to refetch the data
            setRefetchData(prev => prev + 1);

        });
    }

    //update button calls update_task.php with updated data
    function editTask(){

        setUpdatingTask({id: props.taskId, text: props.text, completed: props.completed, type: props.type, time_created: props.time_created});

        setView("modifyTasks");
    }

    //delete button calls delete_task.php with the id of the task to delete
    function deleteTask(){

        //send the data in a json format to the backend
        fetch("http://localhost/todo-backend/delete_task.php", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded" //form data so we can use POST
            },
            body: new URLSearchParams({
                id: props.taskId, //only send the id of the task to delete
            })
        })
        .then(response => response.text())
        .then(data => {
           console.log(data);

            //let the TaskTable know that it needs to refetch the data
            setRefetchData(prev => prev + 1);

        });

    }
    

    //tasks that are completed should be Archived at midnight and disappear from the table
    //if the task is daily than create a new task with the same content
    //if task is not completed than leave it be

    return(
        <tr className="task">
            {props.completed ? (<td><button onClick={() => updateTask()} className="tableButton checked"><p>&#10003;</p></button></td>) : (<td><button onClick={() => updateTask()} className="tableButton"><p></p></button></td>)}
            <td><h3>{props.taskId}&emsp;{props.text}</h3></td>
            <td><h3>{props.time_created}</h3></td>
            <td><h3>{props.type}</h3></td>
            <td><button className="tableButton" onClick={() => editTask()}>&#8593;</button></td> 
            <td><button className="tableButton" onClick={() => deleteTask()}>X</button></td>
        </tr>
    );
}

export default Task;