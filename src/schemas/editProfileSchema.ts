import z from "zod";

const MAX_FILE_SIZE: number = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/png",
  "image/jpg",
  "image/jpeg",
];

export const editProfileSchema = z.object({
  fullName: z.string().optional(),
  birthdate: z.iso
    .date()
    .optional()
    .refine(
      (data) => {
        if (!data) return true;
        const inputDate = new Date(data);
        return inputDate < new Date();
      },
      { message: "Birth date must be before the current date" },
    ),
  avatar: z
    .instanceof(File, { message: "Avatar must be a file" })
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      { message: "Max file size is 10MB"},
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      { message: "Only .png, .jpg, and .jpeg allowed" }
    )
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
