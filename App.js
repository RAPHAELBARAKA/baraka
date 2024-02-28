const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const port = process.env.PORT || 5000;
mongoose.connect="mongodb+srv://baraka1:baraka@atlascluster.bvthvji.mongodb.net/Project 0?retryWrites=true&w=majority"

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
