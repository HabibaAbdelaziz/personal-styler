// Main file
import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/databases';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

// Load environment variables from .env file
// dotenv -> helps us manage env vars (like secret keys)
dotenv.config();

// create express applic
const app: Express = express();

// Define port our server will run on
// If someone provides a port, we use PORT. Otherwise, use 3001
const port = process.env.PORT || 3001;


// ===Middleware===
app.use(cors());
// Telling express to understand JSON data
app.use(express.json());


// ===Routes===
app.use('/api/users', userRoutes);

// // Sample test route
// app.get('/test', (req: Request, res: Response) => {
//     res.json({ message: 'Hello from the Personal Styler API!'});
// });

// Connect to database then start server
connectDB().then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}). catch (err => {
    console.error('Failed to connect to MongoDB', err);
});

export default app;

// // Starting server
// app.listen(port, () => {
//     console.log(`[server]: Server is running at http://localhost:${port}`);
// });
