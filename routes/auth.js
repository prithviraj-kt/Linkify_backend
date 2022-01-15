const express = require("express")
const router = express.Router()
const {PrismaClient} = require("@prisma/client")

const {user} = new PrismaClient();

router.post("/addUser", async (req, res) => {
    const {name,username, email, phone, college, password, confirm_password} = req.body
    const userExist = await user.findUnique({
        where:{
            username
        },
        select:{
            username:true
        }
    })
    if(userExist){
        return res.status(400).json({
            msg: "User already exist"
        })
    }

    const newUser = await user.create({
        data:{
            name,
            username,
            email,
            phone,
            college,
            password,
            confirm_password
        }
    })

    res.json(newUser)

})


router.get("/login", async (req, res) => {
    const {username, password} = req.body
    const findUser = await user.findUnique({
        where:{
            username
        },
        select:{
            password:true
        }
    })
    if(!findUser){
        return res.status(400).json({
            msg:"User does not exist"
        })
    }
    if(password == findUser.password){
        return res.status(200).json({
            meg:"Login successful"
        })
    }else{
        return res.status(400).json({
            msg:"login failed"
        })
    }
})

module.exports = router

/*id        String   @id
  username  String   @db.VarChar(30) @unique
  email String
  phone String
  college   String
  password  String
  confirm_password String */