import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAppStore } from "../store/useAppStore";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../utility/dateconvert";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { user } = response.data;
      setUser({
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
        email: user.email,
        birthdate: user.birthdate ? formatDate(user.birthdate) : "",
      });
      navigate("/");
    } catch (error: any) {
      alert("login error");
      console.log(
        error.response?.data?.errors ??
          error.response?.data?.message ??
          error.message,
      );
    }
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label>E-mail</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-neutral-200 w-120 rounded-xl px-5 py-2"
              ></input>
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-neutral-200 rounded-xl px-5 py-2"
              ></input>
              <button
                type="submit"
                className="px-5 py-3 w-fit mt-5 rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
              >
                LOGIN
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
