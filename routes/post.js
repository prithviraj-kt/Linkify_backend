const express = require("express");
// const req = require("express/lib/request")
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const { user, post } = new PrismaClient();

router.post("/addpost/:username", async (req, res) => {
  const username = req.params.username;
  const userExist = await user.findUnique({
    where: {
      username,
    },
    select: {
      college: true,
      username: true,
      id: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "User does not exist exists",
    });
  }

  const { title, description } = req.body;
  const newPost = await post.create({
    data: {
      college: userExist.college,
      username: userExist.username,
      title,
      description,
      user_id: userExist.id,
    },
  });

  res.json(newPost);
});

router.put("/update/:username/:id", async (req, res) => {
  const username = req.params.username;
  const id = parseInt(req.params.id);
  const userExist = await user.findUnique({
    where: {
      username,
    },
  });
  if (!userExist) {
    return res.status(400).json({
      msg: "User does not exist exists",
    });
  }
  const postExist = await post.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      id: true,
    },
  });

  if (!postExist) {
    return res.status(400).json({
      msg: "Post does not exist exists",
    });
  }
  if (postExist.username === username) {
    const updatePost = await post.update({
      where: {
        id,
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.json(updatePost);
  } else {
    res.json({ msg: "Contents cannot be changed..." });
  }
});

router.get("/getpost/:username", async (req, res) => {
  const username = req.params.username;
  const userExist = await user.findUnique({
    where: {
      username,
    },
    select: {
      college: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "User does not exist exists",
    });
  }

  const getAllPost = await post.findMany({
    where: {
      college: userExist.college,
    },
  });

  res.json(getAllPost);
});

router.delete("/delete/:username/:id", async (req, res) => {
  const username = req.params.username;
  const id = parseInt(req.params.id);
  const existUser = await user.findUnique({
    where: {
      username,
    },
  });
  if (!existUser) {
    return res.status(400).json({
      msg: " User does not exist",
    });
  }
  const existPost = await post.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
    },
  });
  if (!existPost) {
    return res.status(400).json({
      msg: " Post does not exist",
    });
  }
  if (username === existPost.username) {
    const deletePost = await post.delete({
      where: {
        id,
      },
    });
    res.json({
      deletePost,
      msg: "Post deleted",
    });
  } else {
    res.json({
      msg: "Cannot delete post",
    });
  }
});

router.get("/get/:username", async (req, res) => {
  const username = req.params.username;

  const existUser = await user.findUnique({
    where: {
      username,
    },
  });

  if (!existUser) {
    return res.status(400).json({
      msg: "User does not exist",
    });
  }

  const allPost = await post.findMany({
    where: {
      username,
    },
    select: {
      title: true,
      description: true,
    },
  });

  res.json(allPost);
});

module.exports = router;
