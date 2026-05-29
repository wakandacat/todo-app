import React, {useEffect, useContext} from "react";
import '../styles/task.css';
import GlobalContext from "./GlobalContext";

function Task(props){

    const {globalTasks, setGlobalTasks} = useContext(GlobalContext);
    const {refetchData, setRefetchData} = useContext(GlobalContext);
    const {view, setView} = useContext(GlobalContext);
    const {updatingTask, setUpdatingTask} = useContext(GlobalContext);

    function updateTask(){

        let completedTime = null;

        //if we are changing from incomplete to complete
        if(!props.completed){

            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            completedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            console.log("Completed time:", completedTime);           
        }
        else {
            //if we are changing from complete to incomplete, set time_completed to null
            completedTime = null;
        }

        fetch(`${import.meta.env.VITE_API_URL}/tasks/${props.taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task: props.text,
                type: props.type,
                completed: props.completed ? 0 : 1,
                time_completed: completedTime
            })
        })
        .then(response => response.json())
        .then(data => {
            const taskObjects = {
                id: data.id,
                text: data.task,
                completed: data.completed,
                type: data.type,
                time_created: data.time_created,
                time_completed: data.time_completed
            };

            setGlobalTasks(prevTasks =>
                prevTasks.map(task => task.id === taskObjects.id ? taskObjects : task)
            );

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

        fetch(`${import.meta.env.VITE_API_URL}/tasks/${props.taskId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
            {props.time_completed === null ? (<td><h3>---</h3></td>) : (<td><h3>{props.time_completed}</h3></td>)}
            <td><h3>{props.type}</h3></td>
            <td><button className="tableButton" onClick={() => editTask()}>&#8593;</button></td> 
            <td><button className="tableButton" onClick={() => deleteTask()}>X</button></td>
        </tr>
    );
}

export default Task;