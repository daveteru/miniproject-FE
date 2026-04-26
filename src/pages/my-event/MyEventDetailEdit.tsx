import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";
import MyEventDetailEditThumbnail from "../../components/my-event/MyEventDetailEditThumbnail";
import useEditEvent from "../../hooks/events/useEditEvent";
import {
  editEventSchema,
  type EditEventSchema,
} from "../../schemas/editEventSchema";
import type { MyEvent } from "../../types/myEvent";

export default function MyEventDetailEdit() {
  const event = useOutletContext<MyEvent>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditEventSchema>({
    resolver: zodResolver(editEventSchema),
  });

  useEffect(() => {
    if (event) {
      setValue("name", event.name);
      setValue("artist", event.artist);
      setValue("category", event.category);
      if (event.startDate) setValue("startDate", event.startDate.split("T")[0]);
      if (event.endDate) setValue("endDate", event.endDate.split("T")[0]);
      setValue("city", event.city);
      setValue("location", event.location);
      setValue("description", event.description);
    }
  }, [event, setValue]);

  const { mutateAsync: editEventMutation, isPending } = useEditEvent(
    event?.id as string,
  );

  const onSubmit = async (data: EditEventSchema) => {
    await editEventMutation(data);
  };

  const handleFileChange = (file: File) => {
    setValue("thumbnail", file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Top section: fields + thumbnail */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6">
          {/* Left column — inputs */}
          <div className="flex-1 space-y-4">
            <div className="w-full h-fit flex flex-col">
              <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                EVENT NAME
              </label>
              <input
                type="text"
                className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="w-full h-fit flex flex-col">
              <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                Artist Name
              </label>
              <input
                type="text"
                className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                {...register("artist")}
              />
              {errors.artist && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.artist.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("category")}
                />
                {errors.category && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  START DATE
                </label>
                <input
                  type="date"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.startDate.message}
                  </span>
                )}
              </div>

              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  END DATE
                </label>
                <input
                  type="date"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("endDate")}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.endDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("city")}
                />
                {errors.city && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("location")}
                />
                {errors.location && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.location.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail upload */}
          <div className="shrink-0 w-full sm:w-48">
            <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-1">
              Thumbnail
            </label>
            <MyEventDetailEditThumbnail
              onFileSelect={handleFileChange}
              defaultThumbnail={event?.thumbnail}
            />
            {errors.thumbnail && (
              <span className="text-red-500 text-xs mt-1">
                {errors.thumbnail.message}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            rows={8}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-neutral-500 transition-colors resize-none"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            type="submit"
            className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-colors w-full sm:w-auto"
          >
            {isPending ? "Loading" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
