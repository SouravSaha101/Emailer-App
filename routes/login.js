const mongoose = require("mongoose");
const Admin = mongoose.model("admin");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      let user = await Admin.findOne({ email: req.body.email });
      if (user && user.password === req.body.password) {
        res.status(200).json({ message: "Login Successful" });
      } else {
        res.status(401).json({ message: "Check the credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
