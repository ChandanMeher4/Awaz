import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/dbConnection.js'
import router from './routes/user.routes.js'
import postRouter from "./routes/post.routes.js";
import aiRouter from "./routes/ai.routes.js";


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL.endsWith('/') ? process.env.FRONTEND_URL.slice(0, -1) : process.env.FRONTEND_URL);
if (process.env.ADMIN_URL) allowedOrigins.push(process.env.ADMIN_URL.endsWith('/') ? process.env.ADMIN_URL.slice(0, -1) : process.env.ADMIN_URL);

app.use(cors({
  origin: allowedOrigins, 
  methods:['GET','POST','PUT','DELETE','PATCH'],
  credentials: true
}));
connectDB()

app.use('/user/api',router)
app.use('/user/post',postRouter)
app.use('/api/chat', aiRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
  