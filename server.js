const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'users.txt');

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ message: 'Username and password are required' });
    }

    fs.appendFile(FILE_PATH, ${ username }: ${ password }\n, (err) => {
        if (err) {
            return res.json({ message: 'Error saving user details' });
        }
        res.json({ message: 'Sign up successful' });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ message: 'Username and password are required' });
    }

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.json({ message: 'Error reading user details' });
        }

        const users = data.split('\n').filter(Boolean).map(line => {
            const [user, pass] = line.split(':');
            return { username: user, password: pass };
        });

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.json({ message: 'Invalid username or password' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});