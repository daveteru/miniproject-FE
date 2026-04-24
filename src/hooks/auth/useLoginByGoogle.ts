import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../../lib/axios';
import { useAppStore } from '../../store/useAppStore';

export default function useLoginByGoogle() {
    const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  return useGoogleLogin({
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
          referral: response.data.user.referral,
        });

        toast.success("Login successful!");
        navigate("/");
      } catch (error:any) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
}
