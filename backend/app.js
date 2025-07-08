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

// Functions
// == Userdata
async function getAllUsers(req, res) {
  const users = await prisma.userData.findMany();
  res.json(users);
}

async function getUserByID(req, res) {
  const userId = parseInt(req.params.id);
  const user = await prisma.userData.findUnique({
    where: {id : userId,},
    include: { resume: true }, 
  })
  res.json(user);
}

async function createUser(req, res) {
  const { username, password } = req.body;
  const newUser = await prisma.userData.create({
    data: { username, password },
  });
  res.status(201).json(newUser);
}

// == Test user
async function getTestData(req, res) {
  const testuser = await prisma.userData.findUnique({
    where: {id : 1,},
    include: { resume: true }, 
  })
  res.json(testuser);
}

// == Resume data
async function getAllResumes(req, res) {
  const users = await prisma.resumeData.findMany();
  res.json(users);
}

async function getResumeByID(req, res) {
  const resumeId = parseInt(req.params.id);
  const user = await prisma.resumeData.findUnique({
    where: {id : resumeId,},
    include: {sections: true},
  })
  res.json(user);
}

async function createResume(req, res) {
  const { name, phone, email, github, linkedin, userId } = req.body;
  try {
    const existingResume = await prisma.resumeData.findFirst({
      where: { user: {id: parseInt(userId)}}
    });
    if (existingResume) {
      return res.status(400).json({ error: 'User already has a resume' });
    }
    const newResume = await prisma.resumeData.create({
      data: {name, phone, email, github, linkedin,
        user: {connect: { id: parseInt(userId) }}
      }
    });
    res.status(201).json(newResume);
  } catch (error) {
    console.error("Error creating ResumeData:", error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
}

async function editResume(req, res) {
  const resumeId = parseInt(req.params.id);
  const { name, phone, email, github, linkedin } = req.body;

  try {
    const updatedResume = await prisma.resumeData.update({
      where: { id: resumeId },
      data: {name, phone, email, github, linkedin}
    });
    console.log("Updated resume:", updatedResume);
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Failed to update resume" });
  }
}


// Router
app.use('/api', express.Router()
    // Userdata
    .get('/userdata', getAllUsers)
    .get('/userdata/:id', getUserByID)
    .post('/userdata', createUser)

    // For testing - before adding accounts
    .get('/testdata', getTestData)

    // Resume data 
    .get('/resumedata', getAllResumes)
    .get('/resumedata/:id', getResumeByID)
    .post('/resumedata', createResume)
    .put('/resumedata/:id', editResume)
);

// Listen to indicate it's working
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
