import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/loading/Spinner.jsx";
import { toast } from "react-toastify";

export default function AuthGuard() {
   const {user, isLoading} = useAuth();

   if (isLoading){
    return <Spinner/>
   }

   if (!user){
      toast.info('You need to be logged in!')
    return <Navigate to={'/login'} replace/>
   }
   
    return (
       <Outlet/>
   );
}