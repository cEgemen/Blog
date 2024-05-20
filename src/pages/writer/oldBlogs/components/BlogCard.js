import "../../../../styles/WriterStyle.css"
import toggleHook from "../../../../hooks/toggleHook"
import formHook from "../../../../hooks/formHook"


export default ({props,handelDelete,handelUpdate}) => {
       const {like,date,blogType,title,content,id} = props
       const [isEdit,changeEdit] = toggleHook(false)
       const [titleData,changeTitleData,,changeNormalTitleData] = formHook(title)
       const [contentData,changeContentData,,changeNormalContentData] = formHook(content)
       
       const update = () => {
              const newBlogData = {...props,title:titleData,content:contentData}
              handelUpdate(id,newBlogData)
       }

       const handelEdit = () => {
             changeEdit(() => {
                      return !isEdit;
             })
       }

       const handelBack = () => {
                changeNormalTitleData(title);
                changeNormalContentData(content)
                changeEdit(false)
       }
       
       return    <>
                  <div className="card text-center Writer-div Writer-Shadow mt-3">
                    <div className="card-header row m-0 p-0">
    <div className="col-3">Like : {like.length}</div> <div className="col-6">Blog Type : {blogType.toUpperCase()}</div> <div className="col-3 ">Publish Date : {date}</div>    
                    </div>
                    <div className="card-body">
                    <input className="form-control " type="text" onChange={e => { changeTitleData(e) }} id="title" name="title" value={titleData} disabled={!isEdit} />
                    <textarea className="form-control  mt-1" onChange={e => {changeContentData(e)}} id="content" name="content" value={contentData} rows={7} style={{resize:"none"}} disabled={!isEdit}/> 
                    </div>
                    <div className="card-footer text-body-secondary  row justify-content-center m-0 p-0">
                              {isEdit ? <>
                                   <div className="col-6"> 
                                                <button className="btn btn-success"><i onClick={update} className="fa-solid fa-check"/></button>
                                   </div> 
                                   <div className="col-6"> 
                                                 <button onClick = {handelBack} className="btn btn-dark"><i class="fa-solid fa-circle-arrow-left"/></button>
                                   </div>
                                       </> : <>
                                     <div className="col-6 Writer-Container">
                                        <button className="btn btn-warning"> <i onClick={handelEdit} className="fa-regular fa-pen-to-square"/></button>
                               </div>
                               <div className="col-6  Writer-Container">
                                         <button className="btn btn-danger"> <i onClick={() => {handelDelete()}} className="fa-solid fa-trash"/></button>
                               </div> 
                              
                                     </>}
                    </div>
                 </div>
             </>
                  
} 