import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/loading/Spinner.jsx";

export default function AuthGuard() {
   const {user, isLoading} = useAuth();

   if (isLoading){
    return <Spinner/>
   }

   if (!user){
    return <Navigate to={'/login'}/>
   }
   
    return (
       <Outlet/>
   );
}