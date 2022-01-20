const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000;

app.use(express.json())
app.use(cors())
app.use("/",require("./routes/auth"))
app.use("/",require("./routes/user"))
app.use("/",require("./routes/post"))

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})