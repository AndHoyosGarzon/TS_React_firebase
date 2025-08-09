import z, { email } from "zod";

//login schema
export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid format")),
  password: z.string().min(6, "Password must be at least 6 characteres long"),
});

export type LoginZodSchema = z.infer<typeof loginZodSchema>;

//register schema
export const registerSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Invalid format")),
    displayName: z
      .string()
      .min(1, "Display name is required")
      .max(50, "Display name must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"], //esto hace que el error aparezca en el campo de confirmPassword
  });

//esto nos permite inferir en el tipo de dato basado en el schema de register schema
export type RegisterZodSchemaType = z.infer<typeof resgiterSchema>;
