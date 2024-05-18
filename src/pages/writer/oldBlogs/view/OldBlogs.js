import BlogCard from "../components/BlogCard"
import { Loader } from "../../../../usefuls/Usefuls"
import toggleHook from "../../../../hooks/toggleHook"
import { useEffect,useState } from "react"
import { getAllBlogs , deleteBlog , updateBlog} from "../../../../managment/FireDb"


export default props => {
       
       const [isLoad,changeLoad] = toggleHook(true)   
       const [blogDataList,changeBlogDataList] = useState([])

       useEffect(() => {
                const userId = window.localStorage.getItem("id");
                const getData = async () => {
                          const tmpDataList =  await getAllBlogs(userId) 
                          changeBlogDataList(tmpDataList)
                          changeLoad(false)
                     }
                  getData()   
                
       },[])

       const handelDelete = async (blogId,blogType) => {
         changeLoad(true)
         await deleteBlog(blogId,blogType)
         changeBlogDataList(blogDataList.filter(blog => blog.id !== blogId))
         changeLoad(false)
                                                       }
       const handelUpdate = async (blogId,newBlogData) => {
                changeLoad(true)
                await updateBlog(blogId,newBlogData)
                changeBlogDataList(blogDataList.map(blog => {
                             if(blog.id === blogId)
                              {
                                  return {...blog,...newBlogData}
                              }
                                  return blog
                }))
                changeLoad(false) 
       }                                                
     
    
      const generateBlogCard = (dataList) => {
                     return dataList.map(data => {
                        return <BlogCard key={data.id} props ={data} handelDelete = {() => {handelDelete(data.id,data.blogType)}} handelUpdate = {handelUpdate}/>
                     })                
      }

      return  isLoad ?  <Loader /> : <> {generateBlogCard(blogDataList)} </>
             
}