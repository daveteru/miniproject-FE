import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";
import { useAppStore } from "../store/useAppStore";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: LoginSchema) => {
      const response = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    },
    onSuccess: (response) => {
      setUser({
        id: response.user.id,
        fullName: response.user.fullName,
        email: response.user.email,
        avatar: response.user.avatar,
        role: response.user.role,
        birthdate: response.user.birthdate,
      });
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Login failed!");
    },
  });

  const onSubmit = async (data: LoginSchema) => {
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

            <h1>LOGIN</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
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
              <label>Password</label>
              <input
                type="password"
                id="password"
                className="border border-neutral-200 rounded-xl px-5 py-2"
                placeholder="••••••••"
                {...register("password")}
              ></input>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <button
                type="submit"
                className="px-5 py-3 w-fit mt-5 rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
                disabled={isPending}
              >
                {isPending ? "Loading" : "Login"}
              </button>
            </form>
            <div className="flex flex-row gap-2 text-[12px] mt-3">
              <p>Don't have an account?</p>
              <Link to="/register" className="underline text-blue-500 font-semibold">Register here</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
