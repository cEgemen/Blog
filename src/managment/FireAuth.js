import {auth} from "../confic/Firebase"
import {createUserWithEmailAndPassword,deleteUser,signInWithEmailAndPassword,signOut} from "firebase/auth"


const signIn = async (name , email , password) => {
     const user =  await createUserWithEmailAndPassword(auth,email,password)
     console.log("user.id : "+user.user.uid);
     return user.user.uid;
}

const logIn =async (email,password) => {
       const user =  await signInWithEmailAndPassword(auth,email,password);
        console.log("user : "+user.user);
        return user.user.uid;
}

const logOut = async () => {
          await signOut(auth);
}

const deleteUsers = async ({email,password}) => {
    await logIn(email,password)
    const user = auth.currentUser
   await deleteUser(user).then(() => {
           console.log("user is deleted")
     }).catch((error) => {
           console.log("delete user errorr : "+error.toString())
     });
}


export {signIn,logIn,logOut,deleteUsers}