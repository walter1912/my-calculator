import { ACTIONS } from "./App";
export default function KeyboardNum({dispatch, classN, keyb}) {
    return (
        <button
        className={classN}
        onClick={()=>dispatch({action: ACTIONS.ADD_DIGIT,payload: keyb})}
        >
            {keyb}
        </button>
    )
}
