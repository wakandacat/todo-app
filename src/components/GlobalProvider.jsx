import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

//create a global provider so everything can access and update the tasks

const GlobalProvider = ({children}) => {

    const [globalTasks, setGlobalTasks] = useState([{id: 0, text: "Loading tasks...", completed: false, type: "None"}]); //array of all tasks
    const [refetchData, setRefetchData] = useState(0); //to fetech tasks again when theyve been added, updated, deleted
    const [view, setView] = useState("viewTasks"); //viewTasks shows the table of tasks, modifyTasks shows the form to modify or add tasks

    return (
        <GlobalContext.Provider value={{globalTasks, setGlobalTasks, refetchData, setRefetchData, view, setView}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;