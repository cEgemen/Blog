import Pie from "../components/Pie";
import Bar  from "../components/Bar"
import { Loader } from "../../../usefuls/Usefuls";
import toggleHook from "../../../hooks/toggleHook";
import { useEffect,useState } from "react";
import { getBlogsCount,getUsersCount } from "../../../managment/FireDb";

export default props => {
       const [isLoad,changeLoad] = toggleHook(true)
       const [userCount,changeUserCount] = useState({})
       const [blogCount,changeBlogCount] = useState({})
       useEffect(() => {
             const  getData = async () => {
                     const tmpUserCount = await getUsersCount();
                     const tmpBlogCount = await getBlogsCount() 
                     changeUserCount(tmpUserCount);
                     changeBlogCount(tmpBlogCount)
                     changeLoad(false)
             } 
                    getData()    
       },[])
       
       const generateArray = (mapData) => {
            const tmpList = [];
                for(const dataKey in mapData)
                     {
                             tmpList.push(mapData[dataKey])
                     }
                    return tmpList; 
       }

       const generateBar = (userMapData,blogMapData) => {
              const tmpList = [];
              var list = 0;
              for(const dataKey in userMapData)
                     {
                             list += userMapData[dataKey]
                     }
                tmpList.push(list);     
                list = 0;
                for(const dataKey in blogMapData)
                     {
                             list += blogMapData[dataKey]
                     }
                 tmpList.push(list)    
                return tmpList;            
       }

       return  isLoad ? < Loader /> :  <div className="row" style={{height:"90vh"}}>
                        <div className="col-4 align-self-center">
                                <Pie props= {{label:"USERS PIE",labels:["Admin","Reader","Writer"],dataList:generateArray(userCount)}}/>  
                        </div>
                        <div className="col-4 align-self-center">
                                <Bar   props = {{label:"USERS-BLOGS BAR",labels:["USERS","BLOGS"],dataList:generateBar(userCount,blogCount)}}/>
                        </div>
                        <div className="col-4 align-self-center">
                                <Pie props= {{label:"BLOGS PIE",labels:["General","Sport","Food","Finance","Political","Game"],dataList:generateArray(blogCount)}}/>
                        </div>
               </div>
}