// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(express.json());  // Parse incoming requests as JSON
app.use(cors());  // Enable CORS

// Replace with your actual connection string
const mongoURI = "mongodb+srv://dgavra840:Z024CMpUemcEiw8T@cluster0.xjrvb.mongodb.net/";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hoko App connected to MongoDB Atlas!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Define a User model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', UserSchema);
  
  // Route to create a new user
  app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });
  
