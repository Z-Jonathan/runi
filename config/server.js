const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Dummy data to simulate a database (replace this with a real database later)
let users = [];

// Registration route
app.post('/register', async (req, res) => {
    console.log("Register Route Triggered");
    const { email, password } = req.body;

    console.log({email, password});

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user to "database"
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    console.log(users);

    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database (in this case, in-memory array)
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({ token });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
