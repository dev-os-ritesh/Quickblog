import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/Admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {

  const [Blogs, setBlogs] = useState([]);

  const {axios } = useAppContext();


  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs');
      if(data.success){
        setBlogs(data.blogs);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className=' border border-white max-w-225 rounded-full px-4 py-2 bg-white shadow text-black-600'>All Blogs</h1>


      <div className='relative h-5/6  mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase' >
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'>Blog Title</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
              <th scope='col' className='px-2 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Blogs.map((blog, index) => {
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogData={fetchBlogs} index={index + 1} />
            })}
          </tbody>
        </table>


      </div>
    </div>
  )
}

export default ListBlog
