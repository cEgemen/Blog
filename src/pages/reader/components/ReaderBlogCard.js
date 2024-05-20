import "../../../styles/ReaderStyle.css"

export default ({props,handelLike,handelDisLike,isLiked}) => {
      const {name,date,title,content,id,like} = props  
      
      const hanLike = async () => {
                const likedId = window.localStorage.getItem("id");  
                await handelLike(id,{...props,like:[...like,likedId]})
      }

      const hanDisLike = async () => {
                const disLikedId = window.localStorage.getItem("id");
                await handelDisLike(id,{...props,like:[...like.filter(likerId => {
                              if(likerId !== disLikedId)
                                {      
                                     return true
                                }
                                     return false 
                })]}) 

      }

      return <>
                    <div className="card Reader-div mt-3 Reader-Shadow  text-center">
                       <div className="row m-0  card-header">
                         <div className="col-6">Publisher : {name} </div><div className="col-6">Publish Date : {date}</div>
                       </div>
                       <div className="card-body ">
                         <input className="form-control" value={title} disabled/>
                         <textarea className="form-control mt-1" value={content} disabled  style={{resize:"none"}} rows={7}/> 
                       </div>
                       <div className="card-footer row justify-content-end m-0 text-body-secondary">
                                <div className="col-2">
                                        <div className="row ">
                                          <div className="col-4 "> {!isLiked ? <i onClick={hanLike} className="fa-regular fa-heart " /> : <i onClick={hanDisLike} className="fa-solid fa-heart text-danger" />}</div>
                                          <div className="col-4">{like.length}</div>
                                          <div className="col-4"></div>
                                          
                                        </div>   
                                </div>
                       </div>
                    </div>
             </>

}