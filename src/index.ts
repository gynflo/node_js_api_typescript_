import { PrismaClient } from ".prisma/client";
import { urlencoded } from "body-parser";
import "dotenv/config";
import express from "express";

const port = process.env.PORT;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(urlencoded({ extended: true }));

//CRUD

// Create a post
app.post("/posts", async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: { authorId: 1, ...req.body },
    });
    res.status(201).json({ post });
  } catch (error: any) {
    next(error.message);
  }
});

//Get all posts
app.get("/posts", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ posts });
  } catch (error: any) {
    next(error.message);
  }
});

//Get one post by ID
app.get("/posts/:id", async (req, res, next) => {
  try {
    const postById = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ postById });
  } catch (error: any) {
    next(error.message);
  }
});

//Get a user's post
app.get("/users/:id/posts", async (req, res, next) => {
  try {
    const postsByUserId = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    });
    const posts = await postsByUserId?.posts;
    res.status(200).json({ posts });
  } catch (error: any) {
    next(error.massage);
  }
});

//Update one post by ID
app.patch("/posts/:id", async (req, res, next) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.status(203).json({ updatedPost });
  } catch (error: any) {
    next(error.message);
  }
});

//Delete one post by ID
app.delete("/posts/:id", async (req, res, next) => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send("Post Deleted");
  } catch (error: any) {
    next(error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
