import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAppStore } from "../store/useAppStore";
import { useNavigate } from "react-router";

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
    <div className="w-full min-h-[calc(100vh-56px)]  flex justify-center items-center mx-auto container">
      <section className="w-200 h-100 border p-20 border-neutral-200 gap-5 rounded-3xl drop-shadow-2xl flex flex-col bg-white -translate-y-8">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>E-mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-200 rounded-2xl px-5 py-2"
          ></input>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-200 rounded-2xl px-5 py-2"
          ></input>
          <button
            type="submit"
            className="px-5 py-3 w-fit rounded-lg font-krona-one bg-[#E6FF06] hover:bg-amber-400"
          >
            LOGIN
          </button>
        </form>
      </section>
    </div>
  );
}
