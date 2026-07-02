import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogAdmin, getAllCommentsAdmin, getDashboardData } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);

adminRouter.get('/comments', auth, getAllCommentsAdmin);
adminRouter.get('/blogs', auth, getAllBlogAdmin);
adminRouter.post('/deleteComment', auth , deleteCommentById);
adminRouter.post('/approveComment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getDashboardData);



export default adminRouter;