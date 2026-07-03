import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {

  const { id } = useParams();
  console.log("BLOG PAGE ID:", id);

  const {axios } = useAppContext();

  



  const [data, setData] = useState(null);

  const [Comments, setComments] = useState([]);

  const [Name, setName] = useState("");

  const [Content, setContent] = useState("");

  const fetchBlog = async () => {
   try {
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success? setData(data.blog) : toast.error(data.message);
   } catch (error) {
      toast.error(error.message);
   }
  }

  const fetchComment = async () => {
    try {
      console.log("SENDING BLOG ID:", id);
      const {data} = await axios.post('/api/blog/comments', {blogId : id});
      
      if(data.success){
        setComments(data.comments || [])
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/addComment' , {blog : id , name:Name , content: Content});
      if(data.success){
        toast.success("Comment Added Successfully");
        setName('');
        setContent('');
      } 
    } catch (error) { 
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlog();
    fetchComment();
  }, [])

  return data ? (
    <div className='relative'>

      {/*Background image of gradient color */}
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 ' />

      {/*Navbar component Mounted */}
      <Navbar />

      {/*This is the heading of blog  along with date and author */}
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary font-medium py-4'>Published On : {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/ font-medium text-primary'>Ritesh Ranbaware</p>
      </div>


      {/*This is the blog image and the blog description */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="BlogImage" className='rounded-3xl mb-5' />

        <div className='rich-text mx-auto max-w-3xl' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/*Show Comment Section*/}
        <div className='mx-auto mt-14 mb-10 max-w-3xl'>
          <p className='text-semibold mb-4'>Comments: ({Comments.length})</p>
          <div className='flex flex-col gap-4'>
            {Comments.map((item, index) => (
              <div key={index} className='bg-primary/2  relative border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex item-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="usericon" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs '>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>

          
          {/*Add Comment Section */}

          <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4 my-4'>Add your Comment</p>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input type="text" placeholder='Name' onChange={(event) => setName(event.target.value)} value={Name} required className='w-full p-2 border border-gray-300 rounded outline-none' />
              <textarea placeholder='Comment' onChange={(event) => setContent(event.target.value)} value={Content} required className='w-full p-2 border border-gray-300 rounded  outline-none h-48'></textarea>
              <button type='submit' className='border rounded p-2 px-8 border-primary text-white bg-primary hover:scale-102 transition-all cursor-pointer'>Add Comment</button>
            </form>
          </div>

          {/*Share Options */}
          <div className='my-24 max-w-3xl mx-auto'>
            <p className='font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
              <img src={assets.facebook_icon} alt="" className='hover:scale-110 transition-all cursor-pointer' />
              <img src={assets.twitter_icon} alt=""  className='hover:scale-110 transition-all cursor-pointer' />
              <img src={assets.googleplus_icon} alt=""  className='hover:scale-110 transition-all cursor-pointer' />
            </div>
          </div>

         


        </div>
      </div>
    <Footer/>
  </div> ) : <div>
    <Loader/>
  </div>
}

export default Blog
