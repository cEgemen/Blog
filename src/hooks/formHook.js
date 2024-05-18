import {useState} from "react"

export default initalValue => {

     const [state,setState] = useState(initalValue);

     const handelChangeWithEvent = e => {
            setState(e.target.value)
     }

     const handelChange = (value) => {
             setState(value)
     }

     const reset = () => {setState("")}
 
     return [state,handelChangeWithEvent,reset,handelChange] 
}