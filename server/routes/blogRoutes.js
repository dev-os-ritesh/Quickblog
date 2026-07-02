import express from 'express'
import { addBlog, addComment, deleteBlog, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'),auth,addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:BlogId',getBlogById );
blogRouter.post('/delete' , auth, deleteBlog);
blogRouter.post('/togglePublish' , auth,togglePublish);

blogRouter.post('/addComment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate' , auth , generateContent);

export default blogRouter;