import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'

const app = express();

// Connect to DB (wrapped to support serverless environments like Vercel)
const startServer = async () => {
    await connectDB();
};
startServer();

//Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

//Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

app.get('/', (req, res) => {
    res.send("Welcome to QuickBlog API");
});

// Only start listening locally (Vercel handles the port itself)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

export default app;