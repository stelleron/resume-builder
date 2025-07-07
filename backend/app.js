// Imports
const express = require("express");
const { PrismaClient } = require('./generated/prisma'); 

// Basic init
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// CORS for using from Svelte
const cors = require('cors');
app.use(cors());

// Router
app.use('/api', express.Router()
    // Userdata
   .get('/userdata', async (req, res) => {
      const users = await prisma.userData.findMany();
      res.json(users);
    })
   .post('/userdata', async (req, res) => {
      const { username, password } = req.body;
      const newUser = await prisma.userData.create({
        data: { username, password },
      });
      res.status(201).json(newUser);
    })

    // For testing - before adding accounts
    .get('/testdata', async (req, res) => {
      const testuser = await prisma.userData.findUnique({
        where: {id : 1,},
      })
      res.json(testuser);
    })
);

// Listen to indicate it's working
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
