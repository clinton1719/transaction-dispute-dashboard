import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const role = useSelector((state: RootState) => state.auth.role);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
