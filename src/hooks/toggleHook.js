import {useState} from "react"

export default (initValue=false) => {
        const [toggle,changeToggle] = useState(initValue);
        
        const handelToggle = (value) => {
                changeToggle(value)
        }
        
        return [toggle,handelToggle]
}