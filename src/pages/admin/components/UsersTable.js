import UserRow from "./UserRow"
import { Loader } from "../../../usefuls/Usefuls"
import toggleHook from "../../../hooks/toggleHook"
import { useEffect , useState } from "react"
import { getAllUsers,deleteUser,updateUser } from "../../../managment/FireDb"


export default ({props}) => {
    const {userType} = props
    const [isLoader,changeLoader] = toggleHook(true)
    const [userDataList,changeUserDataList] = useState([]) 
    
    useEffect(() => {
          const getData =  async () => {
               const tmpList =  await getAllUsers(userType)   
               changeUserDataList(tmpList)  
               changeLoader(false)
          }   
           getData()
        
    } , [])

    const handelDeleteUser = async (userId,email,password) => {
          changeLoader(true)
          await  deleteUser(userId,email,password)
          changeUserDataList(userDataList.filter(user => user.id !== userId))
          changeLoader(false); 
    }

    const handelEditUser = async (userId,newData) => {
              await updateUser(userId,newData); 
              changeUserDataList(userDataList.map(user => {
                         if(user.id === userId)
                              {
                              return newData;
                              }
                              return user;
              }))
    }

    const generateRow = () => {

                return  userDataList.map((data,i) => <UserRow key={data.id} props = {{...data,index:i+1}} deleteUser={() => { handelDeleteUser(data.id,data.email,data.password) }} editUser = {handelEditUser} />) 
                                       
                                }

     return isLoader ? < Loader /> : <table className="table">
     <thead>
 <tr>
   <th scope="col"></th>
   <th scope="col">FIRST NAME</th>
   <th scope="col">LAST NAME</th>
   <th scope="col">E-MAIL</th>
   <th scope="col">PASSWORD</th>
   <th scope="col">GENDER</th>
   <th scope="col">BIRTDAY</th>
   <th scope="col">EDUCATION</th>
   <th scope="col"></th>
   <th scope="col"></th>
 </tr>
</thead>
<tbody>
          {generateRow()}
</tbody>
</table>



}