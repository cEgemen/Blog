import formHook from "../../../hooks/formHook"
import  "../../../styles/WriterStyle.css"
import { getUser,addBlog } from "../../../managment/FireDb";
import { useEffect , useState } from "react";
import { getDate } from "../../../usefuls/Usefuls";
import { v4 as uuidv4 } from 'uuid';

 export default props => {
      const [userData,changeUserData] = useState({})
      const [title,changeTitle,resetTitle] = formHook("")      
      const [content,changeContent,resetContent] = formHook("")  
      const [blogType,changeBlogType,resetBlogType,resetBlogTypeWithoutEvent] = formHook("general")
     
       const handelReset = ()  => {
             resetTitle()
             resetContent()
             resetBlogTypeWithoutEvent("general")
       } 

        const handelShare = async () => {   
            await addBlog({name:`${userData.firstName} ${userData.lastName}`,blogType,title,content,like:[],date:getDate(),userId:userData.id,id:uuidv4()})
            handelReset()
       } 

       useEffect(() => {
                    let tmpData = {};
                    const getData = async () => {
                     tmpData = await getUser(window.localStorage.getItem("id"))
                    changeUserData(tmpData)
                }  
                getData()

       },[])

       return <div className="Writer-Root ">
                      <div style={{paddingTop:"20vh"}}>
                      <div className="row  Writer-div ">
                      <div className="col-8 p-0 pr-2" >
                       <label htmlFor="title" className="form-label" >BLOG TITLE</label>
                       <input className="form-control Writer-Shadow" placeholder="TITLE" type="text" id="title" name="title" value={title} onChange={e => {changeTitle(e)}}></input>
                       </div>
                       <div className="col-4 p-0">
                               <label htmlFor="blogType" className="form-label">BLOG TYPE</label>
                               <select className="form-control Writer-Shadow" id="blogType" name="blogType" value={blogType} onChange={ e => {changeBlogType(e)}}>
                                        <option value="general">General</option>
                                        <option value="sport">Sport</option>
                                        <option value="food">Food</option>
                                        <option value="finance">Finance</option>
                                        <option value="political">Political</option>
                                        <option value="game">Game</option>
                               </select>
                       </div>
                      </div>
                       <div className="Writer-div">
                            <label htmlFor="content" className="form-label mt-3">BLOG CONTENT</label>
                            <textarea className="form-control Writer-Shadow" id="content" name="content" placeholder="CONTENT" value={content} onChange={e => {changeContent(e)}} rows={7} style={{resize : "none"}}/>
                       </div>
                       < div className="Writer-div row mt-3 bg">
                               <div className="col-6 p-0 Writer-Container">
                                          <button onClick={handelReset} className="Writer-Shadow btn btn-outline-warning">Reset</button>
                               </div>
                               <div className="col-6 p-0 Writer-Container">
                                          <button onClick={handelShare} className="Writer-Shadow btn btn-outline-success">Share</button>
                               </div>
                       </div>
                      </div>
       </div>
 }