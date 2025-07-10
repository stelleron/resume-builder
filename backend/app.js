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
    include: {sections: {
      include: {
        experiences: true
      }
    }},
  })
  res.json(user);
}

async function createResume(req, res) {
  const { name, phone, email, github, linkedin, userId} = req.body;
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
  const { name, phone, email, github, linkedin} = req.body;

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

// == Resume sections
async function getAllSections(req, res) {
  const sections = await prisma.resumeSection.findMany();
  res.json(sections);
}

async function getSectionByID(req, res) {
  const sectionId = parseInt(req.params.id);
  const sections = await prisma.resumeSection.findUnique({
    where: {id : sectionId,},
    include: {experiences: true},
  })
  res.json(sections);
}

async function createSection(req, res) {
  const { name, visible, resumeDataId } = req.body;
  try {
    const newSection = await prisma.resumeSection.create({
      data: {
        name,
        visible,
        resumeData: {
          connect: {
            id: parseInt(resumeDataId)
          }
        }
      }
    });
    res.status(201).json(newSection);
  } catch (error) {
    console.error("Error creating ResumeSection:", error);
    res.status(500).json({ error: 'Failed to create resume section' });
  }
}

async function deleteSection(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deleted = await prisma.resumeSection.delete({
      where: { id }
    });
    res.status(200).json({ message: 'Section deleted', id: deleted.id });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ error: 'Failed to delete section' });
  }
}

async function editSection(req, res) {
  const sectionId = parseInt(req.params.id);
  const {name, visible} = req.body;

  try {
    const updatedSection = await prisma.resumeSection.update({
      where: { id: sectionId },
      data: {name, visible}
    });
    console.log("Updated section:", updatedSection);
    res.status(200).json(updatedSection);
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ error: "Failed to update section" });
  }
}

// == Resume experience
async function getAllExperiences(req, res) {
  const experiences = await prisma.resumeExperience.findMany();
  res.json(experiences);
}

async function getExperienceByID(req, res) {
  const experienceId = parseInt(req.params.id);
  const experience = await prisma.resumeExperience.findUnique({
    where: {id : experienceId,},
  })
  res.json(experience);
}

async function createExperience(req, res) {
  const {title, subTitle, timePeriod, location, skillsUsed, bulletPoints, visible, sectionId} = req.body;
  try {
    const newExperience = await prisma.resumeExperience.create({
      data: {
        title, subTitle, timePeriod, location, skillsUsed, bulletPoints, visible,
        section: {
          connect: {
            id: parseInt(sectionId)
          }
        }
      }
    });
    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error creating ResumeExperience:", error);
    res.status(500).json({ error: 'Failed to create resume experience' });
  }
}

async function deleteExperience(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deleted = await prisma.resumeExperience.delete({
      where: { id }
    });
    res.status(200).json({ message: 'Experience deleted', id: deleted.id });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
}

async function editExperience(req, res) {
  const experienceId = parseInt(req.params.id);
  const {title, subTitle, timePeriod, location, skillsUsed, bulletPoints, visible} = req.body;

  try {
    const updatedExperience = await prisma.resumeExperience.update({
      where: { id: experienceId },
      data: {title, subTitle, timePeriod, location, skillsUsed, bulletPoints, visible,}
    });
    console.log("Updated experience:", updatedExperience);
    res.status(200).json(updatedExperience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: "Failed to update experience" });
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

    // Resume secitons
    .get('/sections', getAllSections)
    .get('/sections/:id', getSectionByID)
    .post('/sections', createSection)
    .delete('/sections/:id', deleteSection)
    .put('/sections/:id', editSection)

    // Resume secitons
    .get('/experiences', getAllExperiences)
    .get('/experiences/:id', getExperienceByID)
    .post('/experiences', createExperience)
    .delete('/experiences/:id', deleteExperience)
    .put('/experiences/:id', editExperience)
);

// Listen to indicate it's working
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
