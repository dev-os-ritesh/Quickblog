import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        console.log("req.file received:", imageFile ? `${imageFile.originalname} (${imageFile.size} bytes)` : "MISSING");

        //check if all fields are present
        if (!title || !imageFile || !description || !category) {
            return res.json({ success: false, message: "Missing Required Fields" });
        }

        //Upload to imagekit using files.upload (correct method in @imagekit/nodejs v7)
        const response = await imageKit.files.upload({
            file: imageFile.buffer.toString('base64'),
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        //optimization through url transformtion on imagekit

        // const optimizedImageUrl = imageKit.getUrl({
        //     path:response.filePath,
        //     transformation:[
        //         {quality:'auto',
        //          format: 'webp',
        //          width:'1280',

        //         }
        //     ]
        // });

        const image = `${response.url}?tr=q-auto,f-webp,w-1280`;

        // console.log("image :" ,image);
        // console.log("ispublished : ", isPublished);

        await Blog.create({ title, subTitle, description, category, image, isPublished });

        res.json({ success: true, message: "Blog added Successfully" });

    } catch (error) {
        console.error("Add Blog Error details:", error);
        res.json({ success: false, message: error.message });
    }
}


//Get All Blogs 
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//Get Single Blog
export const getBlogById = async (req, res) => {
    try {
        const { BlogId } = req.params;
        const blog = await Blog.findById(BlogId);

        if (!blog) {
            return res.json({ success: false, message: "Blog Not FOund" });
        }

        res.json({ success: true, blog })

    } catch (error) {

        res.json({ success: false, message: error.message });
    }
}

//Delete a Blog Post
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        //delete all comments related to blog
        await Comment.deleteMany({ blog: id });

        res.json({ success: true, message: "Blog Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//Toggle Published status
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);

        blog.isPublished = !blog.isPublished;



        await blog.save();
        res.json({ success: true, message: "Blog Status Updated" });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Add Commennts
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: "Comment Added for review" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Show Comments
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: true, message: error.message })
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + 'Generate a Blog content for this topic in simple text format');
        res.json({ success: true, content })
    } catch (error) {
        console.error("AI Generation Error details:", error);
        // Handle rate limit or other provider errors with a clean message
        if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('limit')) {
            return res.json({ success: false, message: "AI content generation limit reached. Please try again later." });
        }
        res.json({ success: false, message: error.message });
    }
}
