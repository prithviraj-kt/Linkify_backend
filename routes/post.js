const express = require("express")
const req = require("express/lib/request")
const router = express.Router()

const {PrismaClient} = require("@prisma/client")
const {user, post } = new PrismaClient();

router.post("/addpost/:username", async (req, res) => {
    const username = req.params.username
    const userExist = await user.findUnique({
        where:{
            username
        }, select:{
            college:true,
            username:true,
            id:true
        }
    })

    if(!userExist){
        return res.status(400).json({
            msg: "User does not exist exists"
        })
    }

    const {title, description} = req.body
    const newPost = await post.create({
        data:{
            college:userExist.college,
            username: userExist.username,
            title,
            description,
            user_id:userExist.id
        }
    })

    res.json(newPost)

})


router.get("/getpost/:username", async (req, res) => {
    const username = req.params.username
    const userExist = await user.findUnique({
        where:{
            username
        }, select:{
            college:true
        }
    })

    if(!userExist){
        return res.status(400).json({
            msg: "User does not exist exists"
        })
    }

    const getAllPost = await post.findMany({
        where:{
            college:userExist.college
        }
    })
    res.json(getAllPost)


})

module.exports = router