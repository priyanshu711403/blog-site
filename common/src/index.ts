import z from "zod";
// import { signupInput } from "./index";

export const SignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
// zod type inference

export const SigninInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateBlogInput = z.object({
  title: z.string().min(100),
  content: z.string(),
});

export const UpdateBlogInput = z.object({
  title: z.string().min(100),
  content: z.string(),
  id: z.string(),
  published: z.boolean(),
});

export type SignupInput = z.infer<typeof SignupInput>;
export type SigninInput = z.infer<typeof SigninInput>;
export type CreateBlogInput = z.infer<typeof CreateBlogInput>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>;
