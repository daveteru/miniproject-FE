import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../lib/axios";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../schemas/resetPasswordSchema";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: ResetPasswordSchema) => {
      const response = await axiosInstance.post(
        "/auth/reset-password",
        {
          password: payload.password,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password successfuly reset");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    await loginMutation(data);
  };

  return (
    <div className="w-full h-screen bg-black ">
      <div className="w-full h-full flex justify-center items-center mx-auto container">
        <section className="w-200 h-100 border text-left p-5 justify-center items-center border-neutral-200 rounded-3xl drop-shadow-2xl flex  bg-white -translate-y-8">
          <div className="flex flex-col">
            <Link
              to="/"
              className="mb-2 hover:underline hover:text-blue-600 cursor-pointer"
            >
              <small> &lt; BACK TO HOME</small>
            </Link>

            <h1>RESET PASSWORD</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 mt-2"
            >
              <label>Password</label>
              <input
                type="password"
                id="password"
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
                placeholder="••••••••"
                {...register("password")}
              ></input>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <label>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-neutral-200 rounded-xl px-5 py-2"
                placeholder="••••••••"
                {...register("confirmPassword")}
              ></input>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
                type="submit"
                className="px-5 py-3 w-fit mt-5 rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Submit"}
              </button>
            </form>
            <div className="flex flex-row gap-1 text-[12px] mt-3">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="hover:underline text-blue-500 font-semibold"
              >
                Register here
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
