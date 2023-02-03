// các chức năng
// có 3 biến: preNum, operation, curNum, expression: biểu thức(khi thực hiện xong phép tính)
// khi bấm vào phím nào thì thực hiện xử lý khi bấm vào
// với chữ số: thực hiện xử lý chữ số
  // nếu có sẵn số 0 thì không phải thêm vào
  // nếu có sẵn dấu chấm thì không phải thêm dấu chấm vào
  // thực hiện thêm chữ số vào dòng hiện tại
// với phép tính: thực hiện xử lý phép tính
  // 1. thêm phép tính khi chưa có phép tính
    // gắn giá trị preNum = curNum
    // trả về curNum = ""
  // 1. thực hiện phép tính evalute
    // chuyển đến hàm thực hiện phép tính
    // hàm trả về curNum = kết quả hàm evalute
    // hàm trả về biểu thức expression = preNum + operation + curNum + "="
// với nút ac, del, =
  // 1. với = thì thực hiện phép tính evalute 
  // 1. với ac thì xóa toàn bộ trả về các biến đều rỗng
  // 1. với del thì xóa 1 kí tự cuối ở curNum hoặc operation
// các bước thực hiện
// tạo function component cho các chữ số 
// tạo function component cho các phím tính toán =, -, ×, ÷,
import {useReducer} from 'react';
import KeyboardCalc from './KeyboardCalc';
import KeyboardNum from './KeyboardNum';
import  "./App.css";
const initState = {
  preNum:"",
  operation: "",
  curNum: "",
  check: false
}
let historyCalc = [];
const ACTIONS = {
  ADD_DIGIT: "add number in curNum",
  DELETE_ALL: "delete all of state",
  DELETE_CUR: "delete one digit or operation",
  CHOOSE_OPERATION: "chose operation to add state.operation or evalute",
  EVALUATE_OPERATION: "evaluate operation or set digit"
}
const OPERATIONS = {
  add: "+",
  subtract: "-",
  multi: "×",
  devide: "÷"
}
const reducer =(state, {action, payload})=>{
  if(state.preNum !== "" && 
     state.operation !== "" &&
     (state.curNum !== null || state.curNum !== "")
    ){
    state.check = true;
  }
  else state.check = false;
  switch(action) {
    case ACTIONS.ADD_DIGIT:
      if(state.curNum === "0" && payload === "0") return state;
      if(payload === "." && state.curNum.includes(".")) return state;
      return { 
        ...state,
        curNum: `${state.curNum || ""}${payload}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.operation === "" && state.curNum !== "") return {
        ...state,
        preNum: state.curNum,
        operation: payload,
        curNum: "",
      }
      if(state.operation === "" && state.preNum !== "") return {
        ...state,
        operation: payload,
      }
      if(state.check) {
        return evalute(state, payload)
      }
    break;
    case ACTIONS.DELETE_ALL:
      return {curNum:"",operation:"",preNum:""}
    case ACTIONS.DELETE_CUR:
      if(state.curNum === "") 
        return {
          ...state,
          operation: ""
        }
      if(state.curNum !== "") {
        return {
          ...state,
          curNum: state.curNum.slice(0,-1)
        }
      }
      return state;
    case ACTIONS.EVALUATE_OPERATION:
      if(state.preNum === "") {
        return {
          ...state,
          preNum: state.curNum,
          curNum: ""
        }
      }
      if(state.check) return evalute(state, payload)
    default:
      return state;
    }
  }
const evalute = (state, payload)=>{
  let result = 0;
  let operation = "";
  let preNumber = parseFloat(state.preNum);
  let currentNumber = parseFloat(state.curNum);
  if(isNaN(preNumber)){preNumber = 0}
  if(isNaN(currentNumber)){currentNumber = 0}

    switch(state.operation) {
      case OPERATIONS.add:
        result = preNumber + currentNumber;
        operation = payload;
        break
      case OPERATIONS.subtract:
        result = preNumber - currentNumber;
        operation = payload;
        break
      case OPERATIONS.multi:
        result = preNumber * currentNumber;
        operation = payload;
        break
      case OPERATIONS.devide:
        result = preNumber / currentNumber;
        operation = payload;
        break
    }
    if(payload === "=") operation = "";
    console.log("historyCalc: ", historyCalc)
    let curCalc = {pre:preNumber, op: state.operation, cur:currentNumber, result: result}
    console.log(curCalc)
    historyCalc.push(curCalc)
    return {
      preNum: result.toString(),
      operation: operation,
      curNum:"",
      check: false
    }
  
}
let state = {};
function App() {
  const [stateReducer, dispatch] = useReducer(reducer, initState);
  state = stateReducer;
let {preNum, operation, curNum} = stateReducer;
// if(preNum || curNum.isNaN()) { preNum = 0; curNum = 0; }
  return (
    <div className="cover">
      <div className="app-grid">
      <div className="output grid-item">
          <div className="preLine">{preNum} {operation}</div>
          <div className="currentLine">{curNum}</div>
        </div>
      <div className="keyboard grid-item">
        <button
         className="key-item ac"
         onClick={()=>dispatch({action:ACTIONS.DELETE_ALL, payload:"AC"})}>
           AC
        </button>
        <button
         className="key-item del"
         onClick={()=>dispatch({action:ACTIONS.DELETE_CUR, payload:"DEL"})}>
           DEL
        </button>
        
        <KeyboardCalc classN="key-item divice" keyb="÷" dispatch={dispatch} />
        <KeyboardNum classN="key-item one" keyb="1"  dispatch={dispatch} />
        <KeyboardNum classN="key-item two" keyb="2"  dispatch={dispatch} />
        <KeyboardNum classN="key-item three" keyb="3"  dispatch={dispatch} />
        <KeyboardCalc classN="key-item multi" keyb="×"  dispatch={dispatch} />
        <KeyboardNum classN="key-item four" keyb="4"  dispatch={dispatch} />
        <KeyboardNum classN="key-item five" keyb="5"  dispatch={dispatch} />
        <KeyboardNum classN="key-item six" keyb="6"  dispatch={dispatch} />
        <KeyboardCalc classN="key-item add" keyb="+"  dispatch={dispatch} />
        <KeyboardNum classN="key-item seven" keyb="7"  dispatch={dispatch} />
        <KeyboardNum classN="key-item eight" keyb="8"  dispatch={dispatch} />
        <KeyboardNum classN="key-item nine" keyb="9"  dispatch={dispatch} />
        <KeyboardCalc classN="key-item subtract" keyb="-"  dispatch={dispatch} />
        <KeyboardNum classN="key-item dot" keyb="."  dispatch={dispatch} />
        <KeyboardNum classN="key-item zero" keyb="0"  dispatch={dispatch} />
        <KeyboardCalc classN="key-item evalute" keyb="="  dispatch={dispatch} />
      </div>
    </div>
    <div className="history">
      <h3>history calc</h3>
      {/* <p>{historyCalc.length > 1?(historyCalc.pop()&&"hi"):"hello"}</p> */}
      <ul className="history-list">
        { 
        historyCalc.map(({pre, op, cur, result}, id)=>{
          return (
            <li key={id} 
            onMouseOver={(result)=>{curNum = result; return null}}>{pre} {op} {cur} = {result}</li>
          )
        })}
      </ul>
    </div>
      </div>
  )
}
export {ACTIONS, state};
export default  App;