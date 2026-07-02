import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const BlogList = () => {

    let [Menu,setMenu] = useState("All");
    const {blogs , input} =  useAppContext();

    const filteredBlogs  = ()=>{
      if (input === ''){
        return blogs;
      }
     return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }


  return (
    <div>

       {/* this is for the categories filter section block */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item)=>(
            <div key={item} className='relative'>

                <button className={`cursor-pointer text-gray-500  ${Menu == item ?'text-white px-4 pt-0.5':''}`} onClick={()=>setMenu(item)}>
                    {item}
                    {Menu == item?<motion.div layoutId='underline'
                    transition={{type:'spring',stiffness:500,damping:30}}
                     className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded rounded-full'>
                    </motion.div>:''}
                     
                </button>
            </div>
        ))}
      </div>

      {/*Blog cards used to move to a particular blogs  */}
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-4 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog)=> Menu === 'All'? true : blog.category ===Menu ).map((blog)=><BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList
