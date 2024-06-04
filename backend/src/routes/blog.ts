import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { CreateBlogInput, UpdateBlogInput } from "@priyanshu711/common";
import { Hono } from "hono";
import { verify } from "hono/jwt";
// import { UpdateBlogInput, CreateBlogInput } from "@priyanshu711/common";
// import { CreateBlogInput } from "./../../../common/src/index";

export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();
//middleware
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization")?.split(" ")[1] || "";
  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ error });
  }
});
//create blog
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = CreateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ error: "incorrect inputs" });
  }
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const blog = await prisma.blog.create({ data: { title: body.title, content: body.content, authorId: c.get("userId") } });

  return c.json({ id: blog.id });
});
//update blog
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = UpdateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "incorrect inputs" });
  }
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const blog = await prisma.blog.update({
    where: { id: body.id },
    data: { title: body.title, content: body.content, published: body.published },
  });
  return c.json({ blog });
});

// view many blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: { title: true, content: true, id: true, author: { select: { name: true } } },
  });
  return c.json({ blogs });
});
//view blog
blogRouter.get("/:id", async (c) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: { id: blogId },
      select: { title: true, content: true, id: true, author: { select: { name: true } } },
    });
    return c.json({ blog });
  } catch (error) {
    return c.json({ error });
  }
});

// blogRouter.delete("/", async (c) => {
//   const body = await c.req.json();
//   const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
//   try {
//     const blog = await prisma.blog.deleteMany({});

//     return c.json({ blog });
//   } catch (error) {
//     return c.json({ error });
//   }
// });
