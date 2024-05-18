import ProfileView from "./pages/profile/view/ProfileView"
import SignInView  from "./pages/signIn/view/SignInView";
import LogInView from "./pages/logIn/view/LogInView"
import MainAdminLayout from "./layouts/MainAdminLayout";
import MainReaderLayout from "./layouts/MainReaderLayout";
import MainWriterLayout from "./layouts/MainWriterLayout";
import {Routes,Route} from "react-router-dom"
import AdminView from "./pages/admin/view/AdminView";
import WriterView from "./pages/writer/view/WriterView";
import ReaderView from "./pages/reader/view/ReaderView";
import OldBlogs from "./pages/writer/oldBlogs/view/OldBlogs";
import UserReader from "./pages/admin/readers/view/UserReader";
import UserWriter from "./pages/admin/writers/view/UserWriter";

function App() {
  return ( 
         <Routes>
               <Route path="/" element={<SignInView/>}/>
               <Route path="/logIn" element = {<LogInView/>} />
               <Route path="/admin" element={<MainAdminLayout/>}>
                      <Route index element={< AdminView />} />
                      <Route path="writers" element={<UserWriter />}/>
                      <Route path="readers" element={<UserReader />}/>
               </Route>
               <Route path="/writer" element={<MainWriterLayout/>}>
                      <Route index element= {<WriterView />} />
                      <Route path="profile" element={<ProfileView />}/>
                      <Route path="oldBlogs" element={<OldBlogs />}/>
               </Route>
               <Route path="/reader" element={<MainReaderLayout/>}>
                      <Route index element={< ReaderView />} />
                      <Route path="profile" element={<ProfileView />}/>
               </Route>
         </Routes>
  );
}

export default App;
