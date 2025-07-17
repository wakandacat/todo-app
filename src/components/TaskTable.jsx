import React, {useState, useEffect, useContext} from "react";
import Task from "./Task";
import GlobalContext from "./GlobalContext";
import '../styles/tasktable.css';

function TaskTable(){

    //filter for which tasks to show in the table
    const [typefilter, setTypeFilter] = useState("All Missions");
    const [completefilter, setCompleteFilter] = useState("All");

    const filterOptions = ["All Missions", "Daily", "Urgent", "Stretch", "None"];
    const completedOptions = ["All", "Completed", "Incomplete"];

    //grab the tasks from the global context
    const {globalTasks, setGlobalTasks} = useContext(GlobalContext);
    const {refetchData, setRefetchData} = useContext(GlobalContext);

    //get the tasks from the database
    useEffect(() => {

        fetch('http://localhost/todo-backend/get_tasks.php?type=' + typefilter + '&completed=' + completefilter) //add params to filter
        .then(response => response.json())
        .then(data => {
           //console.log(data);
            const taskObjects = data.map(task => ({
                id: parseInt(task.id), // convert id to integer
                text: task.task,
                completed: parseInt(task.completed),
                type: task.type
            }));

            setGlobalTasks(taskObjects);
            console.log(taskObjects);
        })
        .catch(err => console.error('Error fetching tasks:', err));

        
    }, [typefilter, completefilter, refetchData]); // refetch when filters change or tasks changed (added, deleted, updated)


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

    return(<>
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
                    {globalTasks.map((task) => (
                        <Task key={task.id} taskId={task.id} completed={task.completed} text={task.text} type={task.type}/>
                    ))}
                </tbody>
            </table>

            <div id="addTaskContainer">
                <button >+</button>
            </div>
        </>
    );
}

export default TaskTable;