import z from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 chars" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
