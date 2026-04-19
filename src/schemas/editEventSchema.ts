import { z } from "zod";

const MAX_FILE_SIZE: number = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES: string[] = ["image/png", "image/jpg", "image/jpeg"];

export const editEventSchema = z
  .object({
    name: z.string().optional(),
    artist: z.string().optional(),
    category: z.string().optional(),
    startDate: z.iso.date().optional(),
    endDate: z.iso.date().optional(),
    city: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z
      .instanceof(File, { message: "Avatar must be a file" })
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 10MB",
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: "Only .png, .jpg, and .jpeg allowed",
      }),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be later than start date",
      path: ["endDate"],
    },
  );

export type EditEventSchema = z.infer<typeof editEventSchema>;
