import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("token");

  //    const navigate = useNavigate();
  //    useEffect(() => {
  //      if (user === null) {
  //        navigate("/");
  //      }
  //    }, [user, navigate]);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
