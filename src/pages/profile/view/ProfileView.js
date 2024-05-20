import { useEffect,useState } from "react";
import formHook from "../../../hooks/formHook";
import toggleHook from "../../../hooks/toggleHook";
import { updateUser,getUser } from "../../../managment/FireDb";
import {Loader} from "../../../usefuls/Usefuls"
import { useNavigate } from "react-router-dom";


export default props => {
      const navigate = useNavigate()
      const [userData,changeUserData] = useState({})
      const initVal = window.localStorage.getItem("id") === null ? "" : window.localStorage.getItem("id");
      const [isLoad,changeLoad] = toggleHook(true)
      const [firstName,changeFirstName,,changeFirstNormal] = formHook("");
      const [lastName,changeLastName,,changeLastNormal] = formHook("");
      const [email,changeEmail,,changeEmailNormal] = formHook("");
      const [password,changePassword,,changePasswordNormal] = formHook("");
      const [gender,changeGender,,changeGenderNormal] = formHook("other");
      const [userType,changeUserType,,changeUserTypeNormal] = formHook("");
      const [birtday,changeBirtday,,changeBirtdayNormal] = formHook("");
      const [educationState,changeEducationState,,changeEducationNormal] = formHook("other");
      
      useEffect(() => {
                 console.log("id : "+initVal)
                 getUser(initVal).then(data => {
                     console.dir(data)    
                     changeUserData(data);
                     changeFirstNormal(data.firstName);
                     changeLastNormal(data.lastName);
                     changeEmailNormal(data.email);
                     changePasswordNormal(data.password);
                     changeBirtdayNormal(data.birtday);
                     changeGenderNormal(data.gender);
                     changeUserTypeNormal(data.userType)
                     changeEducationNormal(data.educationState);
                     changeLoad(!isLoad)
                 })
                 
      },[])

      const handelSubmit = async (e) => {
             changeLoad(true)
             e.preventDefault();
             await updateUser(initVal,{firstName,lastName,email,password,gender,userType,birtday,educationState})
             if(userData !== userType){
                          navigate(`/${userType}/profile`)              
             }
             console.log("after  updateUser")
             changeLoad(false)     
             console.log("isLoad : "+isLoad)
       }  
       
      return isLoad ? <Loader /> : <div className="row justify-content-center">
      <div className="row mt-3">
            <div className="col text-center">
                   <h2 >PROFILE</h2>
            </div>
      </div>
      <form onSubmit={  (e) => { handelSubmit(e)} } className="row justify-content-center ">
          <div className="col-2"></div>
          <div className="col-4 mt-4 " >
                  <label htmlFor="firstName" className="form-label" >FIRST NAME</label>
                  <input onChange={e => {changeFirstName(e)}} id="firstName" name="firstName" value={firstName} type="text" className="form-control" /> 
          </div>
          <div className="col-4 mt-4 ">
                    <label htmlFor="lastName" className="form-label" >LAST NAME</label>
                    <input onChange={e => {changeLastName(e)}} type="text" id="lastName" name="lastName" value={lastName} className="form-control" />
          </div>
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-8 mt-4">
                   <label htmlFor="email" className="form-label" >EMAIL</label>
                   <input onChange={e => {changeEmail(e)}} disabled type="email" id="email" name="email" value={email} className="form-control" />
          </div>
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-8 mt-4">
                   <label htmlFor="password" className="form-label" >PASSWORD</label>
                   <input onChange={e => {changePassword(e)}} disabled type="password" id="password" name="password" value={password} className="form-control" />
          </div>
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-4 mt-4">
          <label className="form-label" htmlFor="gender" >GENDER</label>
          <select onChange={e => {changeGender(e)} } className="form-control" id="gender" name="gender" value={gender}>
          <option value="other">Other</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          </select>
          </div>
          <div className="col-4 mt-4">
                  <label className="form-label" htmlFor="birtday" >BIRTDAY</label>
                  <input onChange={ e => {changeBirtday(e)}} type="date"  className="form-control" id="birtday" name="birtday" value={birtday}/>
          </div>
          <div className="col-2"></div>
          <div className="col-2"></div>
          <div className="col-4 mt-4">
          <label className="form-label" htmlFor="userType" >USER TYPE</label>
          <select onChange={ e => {changeUserType(e)}} className="form-control" id="userType" name="userType" value={userType}>
          <option value="reader">Reader</option>
          <option value="writer">Writer</option>
          </select>
          </div>
          <div className="col-4 mt-4">
          <label className="form-label" htmlFor="educationState" >EDUCATION STATE</label>
          <select onChange={ e => {changeEducationState(e)}} className="form-control" id="educationState" name="educationState" value={educationState}>
          <option value="other">Other</option>
          <option value="primarySchool">Primary School</option>
          <option value="middleSchool">middle School</option>
          <option value="highSchool">High School</option>
          <option value="university">University</option>
          </select>
          </div>
          <div className="col-2"></div>
          <div className="col-1 mt-5 pl-5">
                 <button  className="btn btn-primary"><i className="fa-solid fa-check"></i></button>
          </div>
      </form>
</div>

}