import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';



//Admin Login Functionality 
export const adminLogin = async (req,res) =>{
    try{
        
        const {Email,Password} = req.body;   //get the email and password from the input form


        //if the email and password is not equal to the already stored email and password , do this 
        if(Email !== process.env.ADMIN_EMAIL || Password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Invalid Credentials"});
        }

        //if the email and pass matches the stored email and pass , send a jwt token 
        const token = jwt.sign({Email}, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({success:true , token});


    }catch(error){

        //if any of the process fails, show the error 
        res.json({success:false, message:error.message})
    }
}

export const getAllBlogAdmin = async (req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt :-1});
        res.json({success:true , blogs});
        
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const getAllCommentsAdmin = async (req,res)=>{
    try {
        const comments  = await Comment.find({}).populate('blog').sort({createdAt:-1});
        res.json({success:true , comments});
    } catch (error) {
        res.json({success:false , message:error.message});
    }
}

export const getDashboardData = async(req,res)=>{
    try {
       const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
       const blogs  = await Blog.countDocuments();
       const comments = await Comment.countDocuments();
       const drafts = await Blog.countDocuments({isPublished:false});

       const dashboardData = {
            blogs,comments,drafts,recentBlogs
       }

       res.json({success:true , dashboardData});
    } catch (error) {
         res.json({success:false , message:error.message});
    }
}

export const deleteCommentById = async (req,res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success:true , message:"Comment Deleted Successfully"}); 
    } catch (error) {
         res.json({success:false , message:error.message});
    }
}


export const approveCommentById = async (req,res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id , {isApproved:true});
        res.json({success:true , message:"Comment Approved Successfully"}); 
    } catch (error) {
        res.json({success:false , message:error.message});
    }
}