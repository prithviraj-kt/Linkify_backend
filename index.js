const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.use("/",require("./routes/auth"))
app.use("/",require("./routes/user"))


app.listen(port, () => {
    console.log(`Port started at port ${port}`)
})