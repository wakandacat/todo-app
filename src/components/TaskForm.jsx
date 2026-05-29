import React, {useState, useEffect, useContext} from "react";
import '../styles/taskform.css';
import GlobalContext from "./GlobalContext";

function TaskForm(props){

    const {view, setView} = useContext(GlobalContext);
    const {globalTasks, setGlobalTasks} = useContext(GlobalContext);

    //if we are updating a task, prefill the form with the task data
    const [taskText, setTaskText] = useState(props.text || "");
    const [taskType, setTaskType] = useState(props.type || "None");

    function submitForm(){

        //we are updating, not adding a new task
        if(props.taskId){

            fetch(`${import.meta.env.VITE_API_URL}/tasks/${props.taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: taskText.toUpperCase(), type: taskType })
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
            });
        
        } else {
            //we are adding a new task

            fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: taskText.toUpperCase(), type: taskType })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Task added:', data);
                setTaskText("");
            })
            .catch(error => console.error('Error adding task:', error));

        }

        //switch back to view the table
        setView("viewTasks");
    }


    return (           
    <>
        <form onSubmit={(e) => {e.preventDefault(); submitForm();}}>
            <label htmlFor="taskText"><h3>Set mission:</h3></label>
            <input type="text" id="taskText" name="text" value={taskText}
                onChange={(e) => setTaskText(e.target.value)}></input>
            <label htmlFor="taskType"><h3>Set type:</h3></label>
            <select id="taskType" name="type" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                <option value="Daily">Daily</option>
                <option value="Urgent">Urgent</option>
                <option value="Stretch">Stretch</option>
                <option value="None">None</option>
            </select>
            <br/>
            <input type="submit" value="Submit" className="tableButton"></input>
        </form>
    </>
    );
}

export default TaskForm;