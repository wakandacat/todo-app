import React, {useContext} from "react";
import GlobalContext from "./GlobalContext";
import '../styles/toggleview.css';

function ToggleView(){

    ///REVAMP THIS TO HAVE 3 VALUES (check globalprovider too) - viewTasks, modifyTasks, viewArchived

    const {view, setView} = useContext(GlobalContext);

    function toggleView() {
        if(view === "viewTasks") {
            setView("modifyTasks");
        } else {
            setView("viewTasks");
        }    
    }

    return (
        <div id="newTaskContainer">       
        {view === "viewTasks" ? 
            (<>
                <button className="toggleButton" onClick={() => toggleView()}>NEW MISSION +</button>
            </>)
            : 
            (<>
                <button className="toggleButton" onClick={() => toggleView()}>CANCEL &#8592;</button>
            </>)
        }
        <button className="toggleButton" onClick={() => toggleView()}>ARCHIVED</button>

        </div>
    );
}

export default ToggleView;