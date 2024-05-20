import {useNavigate} from "react-router-dom"
import { handelLogOut } from "../usefuls/Usefuls"
import {Link,Outlet } from "react-router-dom"

  const MainAdminLayout = () => {
        const navigate = useNavigate()
         
        return <div className="container-fluid p-0" >
                <ul className="nav justify-content-end"  style={{boxShadow: "0px 2px 6px gray" }}>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">HOME</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/admin/readers">READER</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/admin/writers">WRITERS</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" onClick={async () => {
                                    await handelLogOut();
                                    navigate("/")   
                      }}>LOG OUT</Link>
                  </li>
                  </ul>
                  <Outlet/>            
               </div>
    }

  
    export default MainAdminLayout