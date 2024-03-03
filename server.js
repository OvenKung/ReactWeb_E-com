import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.mhh4jux.mongodb.net/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection failed:', error);
});

const User = mongoose.model('User', {
  email: String,
  password: String,
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email does not exist' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password is incorrect' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }
  
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ error: 'Email does not exist' });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Old password is incorrect' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      existingUser.password = hashedPassword;
      await existingUser.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});