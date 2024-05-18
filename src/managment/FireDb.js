import {db} from "../confic/Firebase"
import { doc, setDoc , updateDoc , getDoc,collection, query, where, getDocs , deleteDoc  } from "firebase/firestore"; 
import { deleteUsers } from "./FireAuth";

const COLLECTION_USER_NAME = "USERS";

const addUser = async (userInfo) => {
    console.dir(userInfo)
    await setDoc(doc(db,COLLECTION_USER_NAME,userInfo.id),userInfo)
} 

const addBlog = async (blogInfo) => {
          console.dir(blogInfo)
          await setDoc(doc(db,blogInfo.blogType,blogInfo.id),blogInfo)         
}

const updateUser = async (id,userInfo) => {  
  const docRef = doc(db, COLLECTION_USER_NAME, id);
  await updateDoc(docRef, {
      ...userInfo
  });     
}

const updateBlog = async (id,blogInfo) => {
            
  const docRef = doc(db, blogInfo.blogType, id);
  await updateDoc(docRef, {
      ...blogInfo
  });     

}

const getUser = async (id) => {
  const docRef = doc(db, COLLECTION_USER_NAME,id);
  const docSnap = await getDoc(docRef);
    return docSnap.data()
}

const getAllUsers= async(userType) => {
  const usersList = [];
  const q = query(collection(db,COLLECTION_USER_NAME), where("userType", "==", userType));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
              usersList.push(doc.data())
          });
      return usersList
 }

const getAllBlogs = async(id) => {
 const typeList = ["general","sport","food","finance","political","game"]
 const blogDataList = [];
         for(const type of typeList)
          {
            const q = query(collection(db,type), where("userId", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                    blogDataList.push(doc.data())
            });
          }
     return blogDataList
}

const getBlogs = async (blogType) => {
    const blogDataList = [];
    const querySnapshot = await getDocs(collection(db, blogType));
    querySnapshot.forEach((doc) => {
           console.dir(doc.data())
           blogDataList.push(doc.data())
    });
return blogDataList  
          
}

const getBlogsCount = async () => {
  const typeList = ["general","sport","food","finance","political","game"]
  let general = 0; let sport = 0;let food = 0;let finance = 0;let political = 0; let game = 0;
  for(const type of typeList)
           {
            const querySnapshot = await getDocs(collection(db, type));
            querySnapshot.forEach((doc) => { 
                      switch(type)
                      {
                           case typeList[0]:
                                general += 1;
                                break;
                           case typeList[1]:
                                 sport +=1;
                                 break;
                           case  typeList[2]:
                                  food +=1;
                                  break;
                            case  typeList[3]:
                                   finance +=1;
                                   break;
                            case   typeList[4]:
                                   political +=1;
                                   break;
                            case   typeList[5]:
                                    game +=1;
                                    break;                             
                      }
            });
           }
      return {"generalCount":general,"sportCount":sport,"foodCount":food,"financeCount":finance,"politicalCount":political,"gameType":game}
}

const getUsersCount = async () => {
      let writer = 0;
      let reader = 0;
      let admin =  0;

      const querySnapshot = await getDocs(collection(db,COLLECTION_USER_NAME));
      querySnapshot.forEach((doc) => {
                 const {userType} = doc.data()
                 console.log("userType : "+userType)
                 if(userType === "admin")
                  {
                      admin +=1;
                  }
                  else if(userType === "writer")
                    {
                       writer +=1;
                    }
                  else{
                        reader +=1;
                  }  
      });
      
      return {"adminCount":admin,"readerCount":reader,"writerCount":writer,}
}

const deleteBlog = async (blogId,blogType) => {

        await deleteDoc(doc(db,blogType,blogId));

} 

const deleteUser = async (userId,email,password) => {
  const typeList = ["general","sport","food","finance","political","game"]
  await deleteDoc(doc(db,COLLECTION_USER_NAME,userId));
  for(const type of typeList)
    {
      const querySnapshot = await getDocs(collection(db, type));
      querySnapshot.forEach(async (doc) => {
              const data = doc.data();
              if(userId === data.userId)
                {
                   await deleteBlog(data.id,type);
                }
              else if(data.like.join(" ").includes(userId))
                 {
                    await updateBlog(data.id,{...data,like:[...data.like.filter(likerId => {
                                  if(likerId !== userId)
                                    {
                                       return true;
                                    }
                                       return false;
                    })]})
                 }  
      });
    }
  await deleteUsers({email,password})

} 

export {addUser,addBlog,updateUser,updateBlog,getUser,getAllUsers,getAllBlogs,getBlogs,getUsersCount,getBlogsCount,deleteUser,deleteBlog}