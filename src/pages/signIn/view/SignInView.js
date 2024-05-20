import { Link, useNavigate, useNavigation} from "react-router-dom"
import formHook  from "../../../hooks/formHook"
import signInImg from  "../../../images/signIn.png"
import {signIn} from  "../../../managment/FireAuth"
import {addUser} from "../../../managment/FireDb"
import toggleHook from "../../../hooks/toggleHook"
import {Loader} from "../../../usefuls/Usefuls"
import { useEffect , useState} from "react"

export default props => {
      const navigate = useNavigate() 
      const initVal = window.localStorage.getItem("id") === null ? "" : window.localStorage.getItem("id");
      const [isLoad,changeLoad] = toggleHook()
      const [firstName,changeFirstName,resetFirstName]  = formHook("");
      const [lastName,changeLastName,resetLastName]  = formHook("");
      const [email,changeEmail,resetEmail]  = formHook("");
      const [password,changePassword,resetPassword]  = formHook("");
      const [gender,changeGender,resetGender]  = formHook("other");
      const [birtday,changeBirtday,resetBirtday]  = formHook("");
      const [userType,changeUserType,resetUserType]  = formHook("reader");
      const [educationState,changeEducationState,resetEducationState]  = formHook("other");
      
      const toPage = type => {
              switch(type)
              {
                    case "admin":
                         navigate("/admin")   
                         break;
                    case "reader":
                         navigate("/reader")
                         break;
                    case "writer":
                         navigate("/writer")
                         break;
              }
      }

       const handelSubmit = async (e) => {
            e.preventDefault()
            if(firstName === "" || lastName === "" || email === "" || password === "" || birtday === "")
                 {
                        alert("YOU MUST FILL ALL FIELDS")
                 }
                 else{
                             changeLoad(!isLoad)
                             const id =  await signIn(`${firstName}-${lastName}`,email,password)
                             await addUser({firstName,lastName,email,password,gender,userType,birtday,educationState,id})
                             window.localStorage.setItem("id",id)
                             toPage(userType)
                     } 
       } 
      
        return  isLoad ? 
                    <Loader />
         :
          <div className="row justify-content-center mr-2">
        <div className="col-6 align-self-center" >
                   <img src={`${signInImg}`} alt="signInImage" className="img-fluid" style={{marginTop:"22vh"}}></img>
        </div>
        <div className="col-6">
                  <div className="row mt-3">
                        <div className="col text-center">
                               <h2 >SIGN IN</h2>
                        </div>
                  </div>
                  <form onSubmit={e => { handelSubmit(e) }} className="row justify-content-center">
                      <div className="col-6 mt-3" >
                              <label htmlFor="firtsName" className="form-label" >FIRST NAME</label>
                              <input type="text" onChange={e =>{ changeFirstName(e)}} className="form-control" id="firstName" name="firstName" value={firstName} /> 
                      </div>
                      <div className="col-6 mt-3">
                                <label htmlFor="lastName"  className="form-label" >LAST NAME</label>
                                <input type="text" onChange={e => {changeLastName(e)}} className="form-control" id="lastName" name="lastName" value={lastName}/>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-8 mt-3">
                               <label htmlFor="email" className="form-label" >EMAIL</label>
                               <input type="email" onChange={e => {changeEmail(e)}} className="form-control" id="email" name="email" value={email} />
                      </div>
                      <div className="col-2"></div>
                      <div className="col-2"></div>
                      <div className="col-8 mt-3">
                               <label htmlFor="password" className="form-label" >PASSWORD</label>
                               <input type="password" onChange={e => {changePassword(e)}} className="form-control" id="password" name="password" value={password}/>
                      </div>
                      <div className="col-2"></div>
                      <div className="col-6 mt-3">
                      <label htmlFor="gender" className="form-label" >GENDER</label>
                      <select className="form-control" onChange={ e => {changeGender(e)}} id="gender" name="gender" aria-label="Gender">
                      <option value="other" >Other</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      </select>
                      </div>
                      <div className="col-6 mt-3">
                              <label htmlFor="birtday" className="form-label">BIRTDAY</label>
                              <input type="date" onChange={e => {changeBirtday(e)}}  className="form-control" id="birtday" name="birtday" value={birtday}/>
                      </div>
                      <div className="col-6 mt-3">
                      <label htmlFor="userType" className="form-label" >USER TYPE</label>
                      <select className="form-control" onChange={e => {changeUserType(e)}} id="userType" name="userType" value={userType}>
                      <option value="reader">Reader</option>
                      <option value="writer">Writer</option>
                      </select>
                      </div>
                      <div className="col-6 mt-3">
                      <label htmlFor="educationState" className="form-label" >EDUCATION STATE</label>
                      <select className="form-control" onChange={e => {changeEducationState(e)}} id="educationState" name="educationState" value={educationState}>
                      <option value="other">Other</option>
                      <option value="primarySchool">Primary School</option>
                      <option value="middleSchool">middle School</option>
                      <option value="highSchool">High School</option>
                      <option value="university">University</option>
                      </select> 
                      </div>
                      <div className="col-2 mt-3 pl-3">
                             <button className="btn btn-primary">SIGN IN</button>
                      </div>
                      <div className="col-12 mt-3 bg-primary"></div>
                  </form>
                  <div className="row justify-content-center">
                          <div className="col-4 mt-3 p-0 bg-danger">
                                <Link to="/logIn"><button className="btn btn-primary">ALREADY AN HAVE ACCOUNT</button></Link>
                          </div>
                  </div>
        </div>

    </div>


}