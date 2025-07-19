import React, {useContext} from "react";
import GlobalContext from "./GlobalContext";
import '../styles/toggleview.css';

function ToggleView(){

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
                <h2>NEW MISSION</h2>
                <button className="tableButton" onClick={() => toggleView()}>+</button>
            </>)
            : 
            (<>
                <h2>CANCEL</h2>
                <button className="tableButton" onClick={() => toggleView()}>&#8592;</button>
            </>)
        }

        </div>
    );
}

export default ToggleView;