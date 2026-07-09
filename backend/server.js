import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import submitRoutes from './routes/submitRoutes.js';
import redeemRoutes from './routes/redeemRoutes.js';
import rewardRoutes from "./routes/rewardRoutes.js";

dotenv.config();
connectDB();

const app= express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5174", // Your React app URL
    credentials: true,
  })
);


app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/problems',problemRoutes);
app.use('/api/submissions',submitRoutes);
app.use('/api/redeems',redeemRoutes);
app.use('/api/rewards',rewardRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is Running at ${PORT}`)
});

