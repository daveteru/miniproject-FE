import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import useChangePassword from "../hooks/users/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../schemas/changePasswordSchema";

export default function Privacy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutateAsync: changePasswordMutation, isPending } =
    useChangePassword();

  const onSubmit = async (data: ChangePasswordSchema) => {
    await changePasswordMutation(data);
  };

  return (
    <div className="w-full  flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex overflow-y-auto bg-neutral-100">
        <div className="w-[70%] max-w-275 flex flex-col  bg-white px-5  py-8">
          {/* Breadcrumb */}
          <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
            <Link to="/">
              <span className="hover:text-neutral-900 cursor-pointer">
                Home
              </span>
            </Link>
            <span className="mx-1">&gt;</span>
            <span className="text-neutral-700">Privacy</span>
          </nav>
          <hr className="mb-5 border-neutral-200" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1 space-y-4">
              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full flex border border-neutral-300 rounded-lg text-sm px-4 py-2"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="w-full h-fit flex flex-col">
                <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-6 my-5">
              <button
                type="submit"
                className="bg-[#d4f531] hover:bg-[#c5e620] text-neutral-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-colors"
              >
                {isPending ? "Loading" : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
