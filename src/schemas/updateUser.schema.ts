import * as z from "zod";

const updateUserValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }).optional(),
  phone: z.string().min(1, { message: "Phone is required" }).optional(),
});

export default updateUserValidationSchema;
