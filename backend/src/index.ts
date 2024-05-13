import { Hono } from "hono";

const app = new Hono();

//user signup
app.post("/api/v1/user/signup", (c) => {
  return c.text("Hello Hono!");
});
//user signin
app.post("/api/v1/user/signin", (c) => {
  return c.text("Hello Hono!");
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
