import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import { registerSchema, type RegisterSchema } from "../schemas/registerSchema";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const { mutateAsync: registerMutation, isPending } = useMutation({
    mutationFn: async (payload: RegisterSchema) => {
      const response = await axiosInstance.post("/auth/register", {
        fullName: payload.name,
        email: payload.email,
        password: payload.password,
        birthdate: payload.birthdate,
        referral: payload.referral
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data.message);
      
      toast.error(error.response?.data.message || "Registration failed!");
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerMutation(data);
  };

  return (
    <div className="w-full h-fit bg-black ">
      <div className="w-full h-full flex justify-center items-center m-auto container">
        <section className="w-200 h-fit mt-20 border text-left p-5 py-20 justify-center items-center border-neutral-200 rounded-3xl drop-shadow-2xl flex bg-white -translate-y-8">
          <div className="flex flex-col">
            <Link
              to="/login"
              className="mb-2 hover:underline hover:text-blue-600 cursor-pointer"
            >
              <small> &lt; BACK TO LOGIN</small>
            </Link>

            <h1 className="my-5 text-2xl">REGISTER</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <label>Full Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                id="fullName"
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
                placeholder="Your Name"
                {...register("name")}
              ></input>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
              <label>E-mail<span className="text-red-500">*</span></label>
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
              <label>Birth Date<span className="text-red-500">*</span></label>
              <input
                type="date"
                id="date"
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
                placeholder="DD/MM/YYYY"
                {...register("birthdate")}
              ></input>
              {errors.birthdate && (
                  <p className="text-red-500 text-sm mt-1">
                  {errors.birthdate.message}
                </p>
              )}
              <label>Referral Code</label>
              <input
                type="text"
                id="referral"
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
                {...register("referral")}
              ></input>
              {errors.referral && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.referral.message}
                </p>
              )}
              <label>Password<span className="text-red-500">*</span></label>
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
              <label>Confirm Password<span className="text-red-500">*</span></label>
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
                {isPending ? "Loading" : "Register"}
              </button>
            </form>
            <div className="flex flex-row gap-1 text-[12px] mt-10">
              <p>Already have an account?</p>
              <Link to="/login" className="underline text-blue-500 font-semibold">Login here</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
