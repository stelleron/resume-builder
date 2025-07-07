// Imports
const express = require("express");
const { PrismaClient } = require('./generated/prisma'); 

// Basic init
const app = express();
app.use(express.json()); 
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
        include: { resume: true }, 
      })
      res.json(testuser);
    })

    // Resume data 
    .get('/resumedata', async (req, res) => {
      const users = await prisma.resumeData.findMany();
      res.json(users);
    })
    .post('/resumedata', async (req, res) => {
      const { name, phone, email, github, linkedin, userId } = req.body;

      try {
        const existingResume = await prisma.resumeData.findFirst({
          where: {
            user: {
              id: parseInt(userId)
            }
          }
        });

        if (existingResume) {
          return res.status(400).json({ error: 'User already has a resume' });
        }

        const newResume = await prisma.resumeData.create({
          data: {
            name,
            phone,
            email,
            github,
            linkedin,
            user: {
              connect: { id: parseInt(userId) }
            }
          }
        });

        res.status(201).json(newResume);
      } catch (error) {
        console.error("Error creating ResumeData:", error);
        res.status(500).json({ error: 'Failed to create resume' });
      }
    })
);

// Listen to indicate it's working
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
