const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/save-user", async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) res.status(200).json({ message: "User is already registered" });
      if (!user) {
        let newUser = await User.create({
          email: req.body.email,
          name: req.body.name,
          phone: req.body.phone,
          createdOn: Date.now(),
        });
        res.status(201).json({ message: "User registered successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
