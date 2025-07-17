import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

//create a global provider so everything can access and update the tasks

const GlobalProvider = ({children}) => {

    const [globalTasks, setGlobalTasks] = useState([{id: 0, text: "Loading tasks...", completed: false, type: "None"}]);
    const [refetchData, setRefetchData] = useState(0);

    return (
        <GlobalContext.Provider value={{globalTasks, setGlobalTasks, refetchData, setRefetchData}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;