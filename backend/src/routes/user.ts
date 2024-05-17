// import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { SigninInput, SignupInput } from "@priyanshu711/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = SignupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "incorrect inputs" });
  }
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({ data: { email: body.email, password: body.password, name: body.name } });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(411);
    return c.json({ error });
  }
});
//user signin
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = SigninInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "incorrect inputs" });
  }
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({ where: { email: body.email, password: body.password } });
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(411);
    return c.text("invalid");
  }
});
