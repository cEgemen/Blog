import {Link,Outlet } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { handelLogOut } from "../usefuls/Usefuls"
import { updateUser } from "../managment/FireDb"

   const  MainWriterLayout  = () =>  {
       const navigate = useNavigate()   
       
       const handelChange =async (e) => {
               if(e.target.value === "reader")
                  {
                     const id = window.localStorage.getItem("id")
                     await updateUser(id,{userType:"reader"})
                     navigate("/reader")
                  }
       }

        return <div className="container-fluid p-0">
                <ul className="nav justify-content-end" style={{boxShadow: "0px 2px 6px gray" }}>
                <li className="nav-item">
                        <div style={{width:"95px",marginRight:"64vw"}}>
                        <select className="form-control border-0" id="userType" name="userType"  onChange={handelChange} >
                            <option value="reader">Reader</option>
                            <option value="writer" selected>Writer</option>
                         </select>
                        </div>
                  </li>
                  <li className="nav-item">
                       <Link className="nav-link" to="/writer">HOME</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/writer/oldBlogs">OLD BLOGS</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/writer/profile">PROFILE</Link>
                  </li>
                  <li className="nav-item">
                      <Link onClick={async () => {
                            await handelLogOut()
                            navigate("/")     
                      }} className="nav-link">LOG OUT</Link>
                  </li>
                  </ul>
                  <Outlet/>            
               </div>
  }

  export default MainWriterLayout