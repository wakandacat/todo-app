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

        fetch(`${import.meta.env.VITE_API_URL}/tasks?type=${typefilter}&completed=${completefilter}`) //add params to filter
        .then(response => response.json())
        .then(data => {
           //console.log(data);
            const taskObjects = data.map(task => ({
                id: parseInt(task.id), // convert id to integer
                text: task.task,
                completed: parseInt(task.completed),
                type: task.type,
                time_created: task.time_created,
                time_completed: task.time_completed,
                archived: parseInt(task.archived)
            }));

            setGlobalTasks(taskObjects);
            console.log(taskObjects);
        })
        .catch(err => console.error('Error fetching tasks:', err));

        
    }, [typefilter, completefilter, refetchData]); // refetch when filters change or tasks changed (added, deleted, updated)


    return(<>
            {/* Game-style filter bar: category tabs (top) + status tabs, then the active selection as a heading */}
            <div id="filterBar">
                <div className="filterGroup">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            className={"filterTab" + (typefilter === option ? " activeFilter" : "")}
                            onClick={() => setTypeFilter(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                <div className="filterGroup">
                    {completedOptions.map((option) => (
                        <button
                            key={option}
                            className={"filterTab" + (completefilter === option ? " activeFilter" : "")}
                            onClick={() => setCompleteFilter(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                <h2 id="activeFilterLabel">
                    {typefilter}{completefilter !== "All" ? ` // ${completefilter}` : ""}
                </h2>
            </div>

            <table id="taskTable">
                <thead>
                    <tr>
                        <th style={{width: "5%"}}>&#10003;</th>
                        <th style={{width: "45%"}}>Mission Title</th>
                        <th style={{width: "15%"}}>Created</th>
                        <th style={{width: "15%"}}>Completed</th>
                        <th style={{width: "10%"}}>Type</th>
                        <th style={{width: "5%"}}>Edit</th>
                        <th style={{width: "5%"}}>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {globalTasks.map((task) => (
                        <Task key={task.id} taskId={task.id} completed={task.completed} time_created={task.time_created} time_completed={task.time_completed} text={task.text} type={task.type}/>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TaskTable;