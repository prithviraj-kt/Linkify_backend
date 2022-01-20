const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const { user } = new PrismaClient();

router.get("/getUser/:username", async (req, res) => {
  const username = req.params.username;
  const findUser = await user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      position:true,
      college: true,
      password: true,
      confirm_password: true,
    },
  });
  if (!findUser) {
    return res.status(400).json({
      msg: "User does not exist",
    });
  }
  return res.json(findUser);
});

router.put("/update/:username", async (req, res) => {
  const { name, email, phone, college, password, confirm_password } = req.body;
  const username = req.params.username;
  const userExist = await user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      college: true,
      password: true,
      confirm_password: true,
    },
  });

  if (!userExist) {
    return res.status(200).json({
      msg: "User does not exist",
    });
  }

  const updateUser = await user.update({
    where: {
      username,
    },
    data: {
      name,
      email,
      phone,
      college,
      password,
      confirm_password,
    },
  });
  res.json(updateUser);

});

router.get("/getAllUser/:username", async (req, res) => {
  const username = req.params.username;

  const findUser = await user.findUnique({
    where: {
      username,
    },
    select: {
      college: true,
      position:true,

    },
  });

  if (!findUser) {
    return res.status(400).json({
      msg: "USer does not exist",
    });
  }
  const getAllUsersData = await user.findMany({
    where: {
      college: findUser.college,
    },
  });
  res.json(getAllUsersData);
});

module.exports = router;
