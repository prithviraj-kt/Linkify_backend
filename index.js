const express = require('express')
const app = express()

const port = 5000;

app.use(express.json())

app.use("/",require("./routes/auth"))
app.use("/",require("./routes/user"))
app.use("/",require("./routes/post"))

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})