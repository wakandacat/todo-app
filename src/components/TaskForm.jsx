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

            //send the data in a json format to the backend
            fetch("http://localhost/todo-backend/update_task.php", {
                method: "POST",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded" //form data so we can use POST
                },
                body: new URLSearchParams({
                    id: props.taskId,
                    task: taskText.toUpperCase(),
                    type: taskType,
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

            });
        
        } else {
            //we are adding a new task

            // Prepare the data to be sent
            const formData = new FormData();
            formData.append('text', taskText.toUpperCase());
            formData.append('type', taskType); // Default type, can be changed as needed

            // Send the POST request to add a new task
            fetch('http://localhost/todo-backend/add_task.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                console.log('Task added:', data);
                setTaskText(""); // Clear the input field after submission
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