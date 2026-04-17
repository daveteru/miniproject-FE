import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";
import { useAppStore } from "../store/useAppStore";
import googleicon from "../assets/icons/Social Icons.svg";
import { useGoogleLogin } from "@react-oauth/google";

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
        referral: response.user.referral
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

  const handleloginbyGoogle = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/google", {
          accessToken: access_token,
        });

        setUser({
          id: response.data.user.id,
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          role: response.data.user.role,
          birthdate: response.data.user.birthdate,
          referral: response.data.user.referral
        });

        toast.success("Login successful!");
        navigate("/");
      } catch (error) {
        toast.error("Login Failed");
      }
    },
  });

  return (
    <div className="w-full h-screen bg-black ">
      <div className="w-full h-full flex justify-center items-center mx-auto container">
        <section className="w-fit h-fit border text-left px-15 py-15 justify-center items-center border-neutral-200 rounded-3xl drop-shadow-2xl flex  bg-white -translate-y-8">
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
              <Link
                to="/forgot-password"
                className="text-[12px] text-blue-500 font-semibold hover:underline"
              >
                Forgot password?
              </Link>
              <div className="flex w-full  gap-10 justify-center">
                <button
                  type="submit"
                  className="px-5 py-3 flex w-fit mt-5 rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
                  disabled={isPending}
                >
                  {isPending ? "Loading" : "Login"}
                </button>
                <button
                  type="button"
                  onClick={() => handleloginbyGoogle()}
                  className="px-5 py-3 flex gap-2 w-fit mt-5 rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
                >
                  <img src={googleicon} alt="" className="w-5" /> Login by
                  Google
                </button>
              </div>
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
