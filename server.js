import express from 'express';
import dotenv from 'dotenv';
import chatbotRoute from './routes/chatbot.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());

// Allow only your frontend URL
app.use(cors({
  origin: 'https://fixit-ai-help-desk.onrender.com'
}));

// Mount chatbot route
app.use('/api/chatbot', chatbotRoute);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
