import z from "zod";

export const registerSchema = z
  .object(
    {
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" }),
      email: z.email("Invalid email"),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 chars" }),
      confirmPassword: z.string(),
      birthDate: z.iso.date().refine((data) => {
        const inputDate = new Date(data);
        return inputDate < new Date();
      }),
    },
    { message: "Birth date must be before the current date" },
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
