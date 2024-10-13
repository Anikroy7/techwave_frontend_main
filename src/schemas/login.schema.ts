import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 or more characters long" }),
});

export default loginValidationSchema;
