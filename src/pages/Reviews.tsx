import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import useChangePassword from "../hooks/users/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../schemas/changePasswordSchema";

export default function Reviews() {
  return (
    <div className="w-full  flex min-h-screen">
      <Sidebar />
      <div className="w-[70%] max-w-275 flex flex-col  bg-white px-5  py-8">
        <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-1">
          <Link to="/">
            <span className="hover:text-neutral-900 cursor-pointer">Home</span>
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-neutral-700">Reviews</span>
        </nav>
        {/* Page title */}
        <h1 className="text-2xl font-bold  text-neutral-900 mb-8">
          My Reviews
        </h1>
        <div className="border rounded-2xl h-30 border-neutral-300 drop-shadow-md bg-white">test</div>
      </div>
    </div>
  );
}
