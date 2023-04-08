const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  // code to retrieve list of users from database or other source
  res.send(users);
});

module.exports = router;
