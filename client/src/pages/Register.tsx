import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "@/animations/login-animation.json";
import { RegisterData } from "@/types/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "@/store/slices/userSlice";
import toast from "react-hot-toast";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = (data: RegisterData) => {
    console.log("Form Submitted", data);
    const loginPromise = dispatch(registerUser(data)).unwrap();
    toast.promise(loginPromise, {
      loading: "Register...",
      success: (currentUser) => {
        form.reset();
        navigate("/");
        return `Hello, ${currentUser.user.firstName}! Register successful`;
      },
      error: (err) => `${err.message}`,
    });
  };
  return (
    <div className="min-h-screen container flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full text-white lg:p-12 flex flex-col justify-between">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
      <div className="lg:w-1/2 w-full bg-white lg:p-12 flex flex-col justify-center">
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold mb-4">Create an account</h2>
          <p className="text-gray-600 mb-8">
            Enter your informations below to create your account
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col mb-4 w-1/2">
              <Input
                className="w-full"
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
              />
              <p className="text-red-500 text-sm">
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </p>
            </div>

            <div className="flex flex-col mb-4 w-1/2">
              <Input
                className="w-full"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
              />
              <p className="text-red-500 text-sm">
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <Input
              id="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            <p className="text-red-500 text-sm">
              {errors.email && <p>{errors.email.message}</p>}
            </p>
          </div>
          <div className="mb-4">
            <Input
              placeholder="*************"
              id="password"
              type="password"
              {...register("password")}
            />
            <p className="text-red-500 text-sm">
              {errors.password && <p>{errors.password.message}</p>}
            </p>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90 text-white w-full mb-4">
            Sign Up
          </Button>
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-sm text-gray-500">HAVE AN ACCOUNT?</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <Link to="/login">
            <Button
              className="flex items-center justify-center w-full mb-4"
              variant="outline"
            >
              Login
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            By clicking sign up, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
