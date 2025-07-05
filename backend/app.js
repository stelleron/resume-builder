const express = require("express");
const { getAllUsernames } = require("./db/queries");

const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());

app.use('/api', express.Router()
.get('/usernames', async (req, res) => {
  try {
    const users = await getAllUsernames();
    res.json(users);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).send("Internal Server Error");
  }
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
