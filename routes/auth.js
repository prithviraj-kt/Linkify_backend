const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const { user, login } = new PrismaClient();
const bcrypt = require("bcryptjs");
router.post("/addUser", async (req, res) => {
  const { name, username, email, phone, college, password, confirm_password } =
    req.body;
  const userExist = await user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (userExist) {
    return res.status(400).json({
      msg: "User already exist",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await user.create({
    data: {
      name,
      username,
      email,
      phone,
      college,
      password,
      confirm_password,
    },
  });

//   const loginDetails = await login.create({
//       data:{
//           username,
//           password:securedPassword
//       }
//   })

  res.json(newUser);
});

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  const findUser = await user.findUnique({
    where: {
      username,
    },
    select: {
      password: true,
    },
  });
  if (!findUser) {
    return res.status(400).json({
      msg: "User does not exist",
    });
  }
  if (password == findUser.password) {
    return res.status(200).json({
      meg: "Login successful",
    });
  } else {
    return res.status(400).json({
      msg: "login failed",
    });
  }
});

module.exports = router;
