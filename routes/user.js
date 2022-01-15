const express = require('express')
const router = express.Router()

const {PrismaClient} = require("@prisma/client")

const {user} = new PrismaClient()

router.get("/getUser/:username", async (req, res)=>{
    const username = req.params.username
    const findUser = await user.findUnique({
        where:{
            username
        },
        select:{
            id:true,
            name:true,
            username:true,
            email:true,
            phone:true,
            college:true,
            password:true,
            confirm_password:true
        }
    })
    if(!findUser){
        return res.status(400).json({
            msg: "User does not exist"
        })
    }
    return res.json(findUser)
})


router.get("/getAllUser/:username", async (req, res) => {
    const username = req.params.username

    const findUser = await user.findUnique({
        where:{
            username
        },
        select:{
            college:true,
        }
    })

    if(!username){
        return res.status(400).json({
            msg:"USer does not exist"
        })
    }
    const getAllUsersData = await user.findMany({
        where:{
            college:findUser.college
        }
    })
    res.json(getAllUsersData)
})



// router.get("/get/:username/:profileUser", async (req, res) => {
//     const profileUser = req.params.profileUser
//     const username = req.params.username


// })



module.exports = router