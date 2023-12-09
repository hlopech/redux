import { z } from "zod";

export const User = z.object({
  id: z.string(),
  email: z.string().email({ message: "Input correct email" }),
  password: z
    .string()
    .min(8, { message: " Password length must be at least 8;  " })
    .regex(/[0-9]/, { message: "password must have 0-9;  " })
    .regex(/[a-z]/, { message: "password must have a-z;  " })    
    .regex(/[A-Z]/, { message: "password must have A-Z;  " }),
  createdAt: z.number(),
});

export const Note = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(1, { message: "Note title can not be empty" }),
  text: z.string(),
  createdAt: z.number(),
});
