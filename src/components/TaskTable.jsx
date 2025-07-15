import React, {useState, useEffect} from "react";
import Task from "./Task";
import '../styles/tasktable.css';

function TaskTable(){

    //filter for which tasks to show in the table
    const [typefilter, setTypeFilter] = useState("All Missions");
    const [completefilter, setCompleteFilter] = useState("All");

    const filterOptions = ["All Missions", "Daily", "Urgent", "Stretch", "None"];
    const completedOptions = ["All", "Completed", "Incomplete"];

    //fetch tasks from the database according to the filter
    const [tasks, setTasks] = useState([{id: 0, text: "Loading tasks...", completed: false, type: "None"}]);

    //get the tasks from the database
    useEffect(() => {
        fetch('http://localhost/todo-backend/get_tasks.php?type=' + typefilter + '&completed=' + completefilter) //add params to filter
        .then(response => response.json())
        .then(data => {
           //console.log(data);
            const taskObjects = data.map(task => ({
                id: task.id,
                text: task.task,
                completed: task.completed === 1, // 1 is true in db
                type: task.type
            }));

            setTasks(taskObjects);
            //console.log(taskObjects);
        })
        .catch(err => console.error('Error fetching tasks:', err));
    }, [typefilter, completefilter]); // refetch when filters change


    function typeFilterButton(direction){

        const currentFilterIndex = filterOptions.indexOf(typefilter);

        if(direction === "left"){
            if(currentFilterIndex === 0){ //if we are at the first index, wrap around to the last one
                setTypeFilter(filterOptions[filterOptions.length - 1]);
            }
            else {
                setTypeFilter(filterOptions[currentFilterIndex - 1]);
            }
        } else {
            if(currentFilterIndex === filterOptions.length - 1){ //if we are at the last index, wrap around
                setTypeFilter(filterOptions[0]);
            }
            else {
                setTypeFilter(filterOptions[currentFilterIndex + 1]);
            }
        }
    }

    function completeFilterButton(direction){

        const currentFilterIndex = completedOptions.indexOf(completefilter);

        if(direction === "left"){
            if(currentFilterIndex === 0){ //if we are at the first index, wrap around to the last one
                setCompleteFilter(completedOptions[completedOptions.length - 1]);
            }
            else {
                setCompleteFilter(completedOptions[currentFilterIndex - 1]);
            }
        } else {
            if(currentFilterIndex === completedOptions.length - 1){ //if we are at the last index, wrap around
                setCompleteFilter(completedOptions[0]);
            }
            else {
                setCompleteFilter(completedOptions[currentFilterIndex + 1]);
            }
        }
    }

    return(
        <table id="taskTable">
            <thead>
                <tr>
                    <th style={{width: "15%"}}>
                        <button onClick={() => completeFilterButton("left")}>&#8592;</button> {/*remember to use arrow function syntax when onclicks have params otherwise it will call it immediately*/}
                        <p>{completefilter}</p>
                        <button onClick={() => completeFilterButton("right")}>&#8594;</button>
                    </th>
                    <th style={{width: "65%"}}>
                        <button onClick={() => typeFilterButton("left")}>&#8592;</button> 
                        <p>{typefilter}</p>
                        <button onClick={() => typeFilterButton("right")}>&#8594;</button>
                    </th>
                    <th style={{width: "10%"}}></th>
                    <th style={{width: "5%"}}></th>
                    <th style={{width: "5%"}}></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <Task key={task.id} completed={task.completed} text={task.text} type={task.type}/>
                ))}
            </tbody>
        </table>
    );
}

export default TaskTable;