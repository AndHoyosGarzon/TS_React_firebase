import z from "zod";

export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid format")),
  password: z.string().min(6, "Password must be at least 6 characteres long"),
});

export type LoginZodSchema = z.infer<typeof loginZodSchema>;
