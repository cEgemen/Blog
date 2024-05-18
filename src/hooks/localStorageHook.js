import {useState,useEffect} from "react"

export default (key) => {
     const initVal = localStorage.getItem(key) === null ? "" : localStorage.getItem(key);
     const [storeData,setStoreData] = useState(initVal);
     
     const resetStoreData = () => {
           setStoreData("")
     } 

     const setLocalData = (data) => {
      setStoreData(() => {
         localStorage.setItem(key,data)
         console.log("data : "+data)
         return data
      })        
     }
     return [storeData,setLocalData,resetStoreData]; 
}