import { logOut } from "../managment/FireAuth"
import "../styles/Loader.css"

const handelLogOut = async () => {
      await logOut()
      window.localStorage.setItem("id","");
}

const Loader = () => {
      return   <div  className="loader-container text-center">
      <h1>LOADING ...</h1>
</div>
}

const getDate = () => {
       const date = new Date().toLocaleDateString();
       return date

}

export {handelLogOut,Loader,getDate}