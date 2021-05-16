const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
const singleMailTemplate = require("../services/emailTemplate/singleMailTemplate");
sgMail.setApiKey(keys.sendGridKey);
module.exports = (app) => {
  app.post("/api/send-email", async (req, res) => {
    try {
      const msg = {
        to: req.body.email,
        from: keys.sendGridEmail,
        subject: "Welcome to Our Servie",
        text: "Welcome Email",
        html: singleMailTemplate(req.body.name),
      };
      sgMail
        .send(msg)
        .then(() => {
          res.status(200).json({
            message:
              "Email is sucessfully sent, Don't forget to check your spam too :p",
          });
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    } catch (err) {
      res.status(500).json({ message: "Cannot send the email" });
    }
  });
};
