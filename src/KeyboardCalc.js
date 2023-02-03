import { ACTIONS,state } from "./App";
import { useState } from "react";

export default function KeyboardCalc({classN, keyb, dispatch}) {
    // const [historyCalc, setHistoryCalc] = useState([]);
    // history = historyCalc;
    let action = ACTIONS.CHOOSE_OPERATION;
    if (keyb === "=") action = ACTIONS.EVALUATE_OPERATION;
    return (
        <button
        key={keyb}
        className={classN}
        onClick={()=>dispatch({action:action, payload:keyb})}>
            {keyb}
        </button>
    )
}

