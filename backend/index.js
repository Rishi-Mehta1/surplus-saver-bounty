import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/surplus-saver';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User schema/model
const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  ecoPoints: { type: Number, default: 0 },
  reservations: { type: [Object], default: [] },
});
const User = mongoose.model('User', userSchema);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Surplus Saver backend is running!' });
});

// Create or update user
app.post('/users', async (req, res) => {
  const { clerkId, email } = req.body;
  if (!clerkId) return res.status(400).json({ error: 'clerkId is required' });
  let user = await User.findOne({ clerkId });
  if (!user) {
    user = new User({ clerkId, email });
  } else if (email && user.email !== email) {
    user.email = email;
  }
  await user.save();
  res.json(user);
});

// Get user by Clerk ID
app.get('/users/:clerkId', async (req, res) => {
  const user = await User.findOne({ clerkId: req.params.clerkId });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Add a reservation to a user
app.post('/users/:clerkId/reservations', async (req, res) => {
  const { clerkId } = req.params;
  const reservation = req.body;
  let user = await User.findOne({ clerkId });
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.reservations.push(reservation);
  await user.save();
  res.json(user.reservations);
});

// Get all reservations for a user
app.get('/users/:clerkId/reservations', async (req, res) => {
  const { clerkId } = req.params;
  const user = await User.findOne({ clerkId });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.reservations);
});

app.post('/chat', async (req, res) => {
  const { message, userId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  try {
    const model = 'gemini-2.5-flash';
    const contents = [
      { role: 'user', parts: [{ text: message }] },
    ];
    const config = {
      thinkingConfig: { thinkingBudget: -1 },
      responseMimeType: 'text/plain',
    };
    const response = await ai.models.generateContentStream({ model, config, contents });
    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }
    res.json({ reply: result });
  } catch (err) {
    res.status(500).json({ error: 'Gemini error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 