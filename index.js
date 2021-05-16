const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

require("./models/Users");
require("./models/Admin");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
require("./routes/saveEmail")(app);
require("./routes/sendEmail")(app);
require("./routes/login")(app);
require("./routes/batchEmail")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
