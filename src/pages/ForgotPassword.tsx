import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schemas/forgotPasswordSchema";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: ForgotPasswordSchema) => {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: payload.email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email sent! Link expires in 15 minutes.");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    await loginMutation(data);
  };

  return (
    <div className="w-full h-screen bg-black ">
      <div className="w-full h-full flex justify-center items-center mx-auto container">
        <section className="w-200 h-100 border text-left p-5 justify-center items-center border-neutral-200 rounded-3xl drop-shadow-2xl flex  bg-white -translate-y-8">
          <div className="flex flex-col">
            <Link
              to="/login"
              className="mb-2 hover:underline hover:text-blue-600 cursor-pointer"
            >
              <small> &lt; BACK TO LOGIN PAGE</small>
            </Link>

            <h1>FORGOT PASSWORD?</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 mt-2"
            >
              <label>E-mail</label>
              <input
                type="text"
                id="email"
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
                placeholder="youremail@example.com"
                {...register("email")}
              ></input>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
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
