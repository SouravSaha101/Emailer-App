const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const keys = require("../config/keys");
sgMail.setApiKey(keys.sendGridKey);

module.exports = (app) => {
  app.post("/api/batch-email", async (req, res) => {
    try {
      let users = await User.find({});
      let emailList = [];
      for (let i = 0; i < users.length; i++) {
        emailList.push(users[i].email);
      }
      if (!users) {
        return res.status(200).json({ message: "No one has registered" });
      } else {
        let { subject, text, html } = req.body;
        const msg = {
          to: emailList,
          from: keys.sendGridEmail,
          subject: subject.toString(),
          text: text.toString(),
          html: `<p>${html.toString()}</p>`,
        };
        sgMail
          .sendMultiple(msg)
          .then(() => {
            res.status(200).json({
              message:
                "Email is sucessfully sent, Don't forget to check your spam too :p",
            });
          })
          .catch((error) => {
            res.status(500).json({ message: error });
          });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
};
