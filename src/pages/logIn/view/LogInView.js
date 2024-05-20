import formHook from "../../../hooks/formHook";
import toggleHook from "../../../hooks/toggleHook";
import { Link, useNavigate} from "react-router-dom";
import logInImg from "../../../images/logIn.png"
import {logIn} from "../../../managment/FireAuth"
import { getUser } from "../../../managment/FireDb";
import { Loader } from "../../../usefuls/Usefuls";

export default props => {
      const navigate = useNavigate()
      const [isLoad,changeLoad] = toggleHook(false)
      const [email,changeEmail,resetEmail] = formHook("");
      const [password,changePassword,resetPassword] = formHook("");

       const toPage = userType => {
               switch(userType)
               {
                    case "writer":
                         navigate("/writer")
                         break;
                    case "reader":
                          navigate("/reader")
                          break
                    case  "admin":
                          navigate("/admin")           
               }
       }
      
       const handelSubmit = async (e) => {
        e.preventDefault();
        if(email === "" || password === "")
          {
                alert("YOU MUST FILL ALL FIELDS");
          }
         else{
                   try{
                      changeLoad(true)  
                      const userUid = await logIn(email,password); 
                       console.log("userUid : "+userUid)
                       window.localStorage.setItem("id",userUid)
                       const {userType} =  await getUser(userUid)
                       toPage(userType)
                   }
                   catch(e)
                   {
                       changeLoad(false)
                       console.log("errorr : "+e.toString())
                       alert("DONT HAVE AN ACCOUNT")
                   }
         } 
        
         

       }

        return isLoad ? < Loader /> : <div className="row justify-content-center mr-2">
        <div className="col-6 align-self-center ">
              <img src={`${logInImg}`} alt="logInImg" className="img-fluid" style={{marginTop:"10vh"}}></img>
        </div>
        <div className="col-6">
                  <div className="row mt-3">
                        <div className="col text-center">
                               <h2 >LOG IN</h2>
                        </div>
                  </div>
                  <form onSubmit={handelSubmit} className="row justify-content-center">
                      <div className="col-2"></div>
                      <div className="col-8 " style={{marginTop:"20vh"}}>
                               <label htmlFor="email" className="form-label" >EMAIL</label>
                               <input onChange={e => {changeEmail(e)}} type="email" id="email" name="email" value={email} className="form-control" />
                      </div>
                      <div className="col-2"></div>
                      <div className="col-2"></div>
                      <div className="col-8 mt-5">
                               <label htmlFor="password" className="form-label" >PASSWORD</label>
                               <input onChange={e => {changePassword(e)}} type="password" id="password" name="password" value={password} className="form-control" />
                      </div>
                      <div className="col-2"></div>
                     
                      <div className="col-2 mt-5 pl-3">
                             <button className="btn btn-primary">LOG IN</button>
                      </div>
                      <div className="col-12 mt-5  bg-primary"></div>
                  </form>
                  <div className="row justify-content-center">
                          <div className="col-4 mt-5 p-0 bg-danger">
                                <Link to="/"><button className="btn btn-primary">DON'T ANY AN HAVE ACCOUNT</button></Link>
                          </div>
                  </div>
        </div>

    </div>

}