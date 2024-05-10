import { Router } from "express";
import { object, string } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { User, Account } from "../db.js";
import { authMiddleware } from "../middleware.js";

const router = Router();

const signupBody = object({
  username: string().email(),
  firstName: string(),
  lastName: string(),
  password: string(),
});

const signinBody = object({
  username: string().email(),
  password: string(),
});

const updateBody = object({
  password: string().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).send({
        message: "Email already exist/Incorrect Inputs",
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username,
    });
    // console.log(existingUser);
    if (existingUser) {
      return res.status(400).send({
        message: "Email already exist",
      });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    res.send({
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Errorrrr" });
  }
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.send({
      token: token,
    });
    return;
  }

  res.status(411).send({
    message: "Error while logging in",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  console.log(filter);
  if (!filter) {
    const users=await User.find({});
    return res.send({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  }
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: `^${filter}`, $options: 'i' },
      },
      {
        lastName: { $regex: `^${filter}`, $options: 'i' },
      },
    ],
  });

  res.send({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export { router };
