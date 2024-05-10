import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import * as React from "react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import toast from "react-hot-toast";
import api from "@/utils/api";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const response = await api.post(
            "/auth/validate",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data._id) {
            setIsAuthenticated(true);
            dispatch(setUser(response.data));
          }
        } catch (error: any) {
          toast.error(error.message as string);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
