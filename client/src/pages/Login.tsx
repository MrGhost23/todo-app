import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "@/animations/login-animation.json";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { LoginData } from "@/types/Login";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slices/userSlice";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    console.log("Form Submitted", data);
    const loginPromise = dispatch(loginUser(data)).unwrap();
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (currentUser) => {
        form.reset();
        navigate("/");
        return `Hello, ${currentUser.user.firstName}! Login successful`;
      },
      error: "Login failed",
    });
  };
  return (
    <div className="min-h-screen container flex flex-col lg:flex-row">
      <div className="lg:w-1/2 text-white lg:p-12 flex flex-col justify-center items-center">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
      <div className="lg:w-1/2 bg-white lg:p-12 flex flex-col justify-center">
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold mb-4">Sign In</h2>
          <Label htmlFor="email" className="text-gray-600 mb-8">
            Email
          </Label>
          <div className="mb-4">
            <Input
              className="mb-0"
              id="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            <p className="text-red-500 text-sm">
              {errors.email && <p>{errors.email.message}</p>}
            </p>
          </div>

          <Label htmlFor="password" className="text-gray-600 mb-8">
            Password
          </Label>
          <div className="mb-4">
            <Input
              className="mb-0"
              placeholder="***********"
              id="password"
              type="password"
              {...register("password")}
            />
            <p className="text-red-500 text-sm">
              {errors.password && <p>{errors.password.message}</p>}
            </p>
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90 text-white w-full mb-4"
          >
            Sign In
          </Button>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-sm text-gray-500">
              DON'T HAVE AN ACCOUNT?
            </span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <Link to="/register">
            <Button
              className="flex items-center justify-center w-full mb-4"
              variant="outline"
            >
              Register
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
