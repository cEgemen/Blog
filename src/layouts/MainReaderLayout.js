import {useNavigate}  from "react-router-dom"
import {Link,Outlet } from "react-router-dom"
import { handelLogOut } from "../usefuls/Usefuls"
import { updateUser } from "../managment/FireDb"


  const  MainReaderLayout  = () =>  {
        const navigate = useNavigate()  
        
        const handelCange = async (e) => {
                if(e.target.value === "writer")
                  {
                      const id = window.localStorage.getItem("id")
                      await updateUser(id,{userType:"writer"})
                      navigate("/writer")
                  }
        }

        return <div className="container-fluid p-0" >
                <ul className="nav justify-content-end"  style={{boxShadow: "0px 2px 6px gray" }}>
                  <li className="nav-item">
                        <div style={{width:"95px",marginRight:"72vw"}}>
                        <select className="form-control border-0" id="userType" name="userType"  onChange={handelCange}>
                            <option value="reader" selected>Reader</option>
                            <option value="writer">Writer</option>
                         </select>
                        </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link "  to="/reader">HOME</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/reader/profile">PROFILE</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" onClick={ async () => {
                                         await handelLogOut();
                                         navigate("/")    
                     }}>LOG OUT</Link>
                  </li>
                  </ul>
                  <Outlet/>            
               </div>
    }


    export default MainReaderLayout