const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const keys = require("../config/keys");
sgMail.setApiKey(keys.sendGridKey);

module.exports = (app) => {
  app.post("/api/batch-email", async (req, res) => {
    try {
      console.log("enter");
      let users = await User.find({});
      console.log(users);
      let emailList = [];
      for (let i = 0; i < users.length; i++) {
        emailList.push(users[i].email);
      }
      let emailobj = {};
      for (let i = 0; i < emailList.length; i++) {
        var obj = { email: emailList[i] };
        Object.assign(emailobj, obj);
      }
      if (!users) {
        return res.status(200).json({ message: "No one has registered" });
      } else {
        // const msg = {
        //   to: req.body.email,
        //   from: keys.sendGridEmail,
        //   subject: "Welcome to Our Servie",
        //   text: "Welcome Email",
        //   html: "<strong>THNAK YOU FOR REGISTERING WITH US</strong>",
        // };
        // sgMail
        //   .send(msg)
        //   .then(() => {
        //     res.status(200).json({
        //       message:
        //         "Email is sucessfully sent, Don't forget to check your spam too :p",
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(500).json({ message: error });
        //   });
        return res.status(200).json({ message: "No one has registered" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
