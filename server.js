import express from 'express';
import dotenv from 'dotenv';
import chatbotRoute from './routes/chatbot.js';
import cors from 'cors';



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // allow all origins (for dev)
// Mount chatbot route
app.use('/api/chatbot', chatbotRoute);

app.listen(5003, () => console.log('Server running on port 5000'));
