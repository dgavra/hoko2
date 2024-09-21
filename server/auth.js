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
  