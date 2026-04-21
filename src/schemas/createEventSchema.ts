import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export const createEventSchema = z
  .object({
    name: z.string().min(1, "Event name is required"),
    artist: z.string().min(1, "Artist name is required"),
    category: z.string().min(1, "Category is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    city: z.string().min(1, "City is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    thumbnail: z
      .instanceof(File, { message: "Thumbnail is required" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 10MB",
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .png, .jpg, .jpeg allowed",
      }),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  );

export type CreateEventSchema = z.infer<typeof createEventSchema>;
