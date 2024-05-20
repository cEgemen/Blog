import toggleHook from "../../../hooks/toggleHook";
import formHook from "../../../hooks/formHook"
export default ({props,deleteUser,editUser}) => {
        const [isEdit,changeEditState] = toggleHook(false)
        const {firstName,lastName,email,password,gender,birtday,educationState,index,id,userType} = props;
        const [firstNameData,changeFirstNameData,,changeNormalFirstNameData]  = formHook(firstName);
        const [lastNameData,changeLastNameData,,changeNormalLastNameData]  = formHook(lastName);
        const [genderData,changeGenderData,,changeNormalGenderData]  = formHook(gender);
        const [birtdayData,changeBirtdayData,,changeNormalBirtdayData]  = formHook(birtday);
        const [educationStateData,changeEducationStateData,,changeNormalEducationStateData]  = formHook(educationState);
         
        const handelEdit = async () => {
                await editUser(id,{firstName:firstNameData,lastName:lastNameData,
                    gender:genderData,birtday:birtdayData,educationState:educationStateData,id,password,email,userType})
                changeEditState(false)    
        }

        const handelBack = async () => {
              changeNormalFirstNameData(firstName)
              changeNormalLastNameData(lastName)
              changeNormalGenderData(gender)
              changeNormalBirtdayData(birtday)
              changeNormalEducationStateData(educationState)
              changeEditState(!isEdit)
        }

        return <tr>
                   <th>{index}</th>
                   <td>{isEdit ? <input className="form-control" id="firstName" name="firstName" value={firstNameData} onChange={e => {changeFirstNameData(e)}} /> : firstName.toUpperCase()}</td>
                   <td>{isEdit ? <input className="form-control " id="lastName" name="lastName" value={lastNameData} onChange={e => {changeLastNameData(e)}} />  : lastName.toUpperCase()}</td>
                   <td>{isEdit ?  <input className="form-control " value={email} disabled /> : email}</td>
                   <td>{isEdit ? <input className="form-control " value={password} disabled /> :  password}</td>
                   <td> {isEdit ? 
                             <select className="form-control " id="gender" name="gender" value={genderData} onChange={e => {changeGenderData(e)}}>
                                         <option value="other">Other</option>
                                         <option value="female">Female</option>
                                         <option value="male">Male</option>
                             </select>
                    : gender.toUpperCase()}</td>
                   <td>{isEdit ? <input className="form-control " id="birtday" name="birtday" value={birtdayData} onChange={e => {changeBirtdayData(e)}} /> : birtday}</td>
                   <td>{isEdit ? 
                               <select className="form-control" id="educationState" name="educationState" value={educationStateData} onChange={e => {changeEducationStateData(e)}}>
                               <option value="other">Other</option>
                               <option value="primarySchool">Primary School</option>
                               <option value="middleSchool">middle School</option>
                               <option value="highSchool">High School</option>
                               <option value="university">University</option>
                               </select>
                    : educationState.toUpperCase()}</td>
                   {isEdit ?
                    <>
                       <td>
                       <i onClick={handelEdit} className="fa-solid fa-check"/>
                       </td>
                       <td>
                       <i onClick={handelBack} class="fa-solid fa-circle-arrow-left"/>
                       </td>
                    </>
                    : 
                    <>
                      <td>
                      <i onClick={() => {changeEditState(true)}} className="fa-regular fa-pen-to-square"/>
                      </td>
                      <td>
                      <i onClick={deleteUser} className="fa-solid fa-trash" />   
                      </td>
                    </> } 
               </tr>
}