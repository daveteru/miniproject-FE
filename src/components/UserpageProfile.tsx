import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useEditProfile from "../hooks/users/useEditProfile";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "../schemas/editProfileSchema";
import { useAppStore } from "../store/useAppStore";
import UserpageProfileAvatar from "./UserpageProfileAvatar";

export default function UserpageProfile() {
  const user = useAppStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: "",
      birthdate: "",
    },
  });

  const { mutateAsync: editProfileMutation, isPending } = useEditProfile();

  const onSubmit = async (data: EditProfileSchema) => {
    await editProfileMutation(data);
  };

  const handleFileChange = (file: File) => {
    setValue("avatar", file);
  };

  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
      setValue("birthdate", user.birthdate.split("T")[0]);
    }
  }, [user, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-8 mb-6">
        <UserpageProfileAvatar onFileSelect={handleFileChange} />

        <div className="flex-1 space-y-4">
          {/* Email (display only, not submitted) */}
          <div className="w-full h-fit flex flex-col">
            <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
              Your Email
            </label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="w-full flex border rounded-lg bg-neutral-200 border-neutral-300 text-sm px-4 py-2 disabled:bg-neutral-100 disabled:text-neutral-400"
            />
          </div>

          <div className="w-full h-fit flex flex-col">
            <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-fit flex flex-col">
              <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                {...register("birthdate")}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-xs">{errors.birthdate.message}</p>
              )}
            </div>

            <div className="w-full h-fit flex flex-col">
              <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                Referral Code
              </label>
              <input
                type="text"
                value={user?.referral ?? ""}
                readOnly
                className="w-full flex border rounded-lg bg-neutral-200 border-neutral-300 text-sm px-4 py-2 disabled:bg-neutral-100 disabled:text-neutral-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <button
          type="submit"
          className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-colors"
        >
          {isPending ? "Loading" : "Submit"}
        </button>
        <p className="text-xs text-red-500 italic">
          Make sure all details are correct.
        </p>
      </div>
    </form>
  );
}
