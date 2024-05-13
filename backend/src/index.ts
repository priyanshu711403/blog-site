import { Hono, HonoRequest } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { use } from "hono/jsx";
// import { env } from "hono/adapter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//middleware
app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("authorization")?.split(" ")[1] || "";

  const response = await verify(header, c.env.JWT_SECRET);
  if (response.id()) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});
//user signup
app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password, name } = await c.req.json();
  const user = await prisma.user.create({ data: { email, password, name } });
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
//user signin
app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { email } = await c.req.json();
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
//create blog
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
//update blog
app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
//view blog
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});
// view many blogs
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default app;
