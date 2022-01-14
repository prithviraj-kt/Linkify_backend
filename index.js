const express = require("express");
var cors = require('cors')
const db = require("./models");
var app = express()

const port = process.config.ENV||8000;
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const postRouter = require("./routes/Posts")
app.use("/", postRouter)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

