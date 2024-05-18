import ReaderBlogCard  from "../components/ReaderBlogCard"
import formHook from "../../../hooks/formHook"
import { useEffect , useState} from "react"
import { Loader } from "../../../usefuls/Usefuls"
import toggleHook from "../../../hooks/toggleHook"
import { getBlogs,updateBlog } from "../../../managment/FireDb"

export default props => {
             const [blogType,changeBlogType,resetBlogType] = formHook("general")
             const [isLoad,changeLoad] = toggleHook(true)
             const [blogList,changeBlogs] = useState([]) 
             useEffect(() => {
                    const getData = async () => {
                                  const tmpList =  await  getBlogs(blogType)    
                                  changeBlogs(tmpList)
                                  changeLoad(false)
                                }
                       getData()            
              },[blogType])

              const generateReaderBlogCard = () => {
                   const userId  = window.localStorage.getItem("id")
                   return  blogList.map(blog =>   < ReaderBlogCard key={blog.id} props={blog} handelLike={handelLike} handelDisLike={handelDisLike} isLiked={blog.like.join(" ").includes(userId)} />
                                                    )
              }

              const handelLike = async (blogId,newBlogData) => {
                          await updateBlog(blogId,newBlogData);
                          changeBlogs(blogList.map(blog => {
                                      if(blog.id === blogId)
                                        {
                                          return newBlogData
                                        }
                                        return blog
                          }))
              }

              const handelDisLike = async (blogId,newBlogData) => {
                          await updateBlog(blogId,newBlogData);
                          changeBlogs(blogList.map(blog => {
                                      if(blog.id === blogId)
                                        {
                                           return newBlogData;
                                        }
                                          return blog 
                          }))
              }

             return isLoad ? < Loader /> : <>
                  <div className="row justify-content-center m-0 mt-3 p-0">
                  <select className="col-4 form-control" id="blogType" name="blogType" value={blogType} onChange={ e => {
                    changeBlogType(e)
                    changeLoad(true)
                    }}>
                                        <option value="general">General</option>
                                        <option value="sport">Sport</option>
                                        <option value="food">Food</option>
                                        <option value="finance">Finance</option>
                                        <option value="political">Political</option>
                                        <option value="game">Game</option>
                               </select>
                  </div>
                          {generateReaderBlogCard()}
                    </>
}