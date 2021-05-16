const mongoose = require("mongoose");
const Admin = mongoose.model("admin");

module.exports = (app) => {
  app.get("/api/logout", async (req, res) => {
    try {
      if (
        req.body.email == "souravsaha101@gmail.com" &&
        req.body.password == "1234"
      ) {
        res.status(200).json({ message: "Login Successful" });
      } else {
        res.status(401).json({ message: "Check the credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
