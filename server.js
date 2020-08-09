const express = require('express');
const db = require('./database.js');
const shortid = require('shortid');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
  try {
    const users = db.getUsers();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved.' });
  }
});
server.get('/api/users/:id', (req, res) => {
  try {
    user = db.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved.' });
  }
});

server.post('/api/users', (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      return res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.',
      });
    } else {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  }
});

server.delete('/api/users/:id', (req, res) => {
  try {
    const user = db.getUserById(req.params.id);

    if (user) {
      db.deleteUser(user.id);
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: 'The user could not be removed',
    });
  }
});

server.put('/api/users/:id', (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (user) {
      if (!req.body.name || !req.body.bio) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      } else {
        const updatedUser = db.updateUser(user.id, {
          name: req.body.name || user.name,
          bio: req.body.bio || user.bio,
        });
        res.status(200).json(updatedUser);
      }
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The user information could not be modified.',
    });
  }
});

server.listen(5000, () => {
  console.log('server listening on port 5000');
});
