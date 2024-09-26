// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const Router = require('./routes/index');
const User = require('./mongoose/user');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const { v4: genuuid } = require('uuid'); 

console.log('h');
console.log(User);
console.log('h');


// Initialize Express
const app = express();
app.use(cors({
  origin: 'https://hoko-three.vercel.app', // Frontend URL
  credentials: true,  // Allow credentials like cookies and headers
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Parse incoming requests as JSON
app.use(cookieParser("helloworld"));
// Replace with your actual connection string
const mongoURI = "mongodb+srv://dgavra840:Z024CMpUemcEiw8T@cluster0.xjrvb.mongodb.net/";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

  app.use(
  session({
      name: 'In_Session',
      genid: function(req) {
        return genuuid() // use UUIDs for session IDs
      },
      secret: "helloworld",
      saveUninitialized: true,
      resave: false,
      secure: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax', secure: true   },
      store: MongoStore.create({
          client: mongoose.connection.getClient(),
      }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Router);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hoko App connected to MongoDB Atlas!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  
  // Route to create a new user
  app.post(
    "/api/signup",
    async(request, response) => {
          const salt = await bcrypt.genSalt()
          const hashedPassword = await bcrypt.hash(request.body.password, salt)
          const user = {username: request.body.username, email: request.body.email, password: hashedPassword}
          const newUser = new User(user);
          console.log(newUser)
          try {
              const savedUser = await newUser.save();
              return response.status(201).send(savedUser);
          } catch (err) {
              console.log(err)
              return response.sendStatus(400);
          }
      }
  );
  
