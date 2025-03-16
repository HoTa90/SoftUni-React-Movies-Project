import { Link } from "react-router";

export default function RegisterPage() {
   return (
     <div
       className="min-h-screen flex items-center justify-center relative"
       style={{
         backgroundImage: "url('/registerBackground.jpg')", 
         backgroundSize: "cover",
         backgroundPosition: "center",
       }}
     >
       <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div>

       <form className="w-full max-w-md p-6 bg-[#2c2c2c] rounded-box shadow-lg relative z-10">
         <fieldset className="border border-base-300 p-4 rounded-box">
           <legend className="text-xl font-bold text-center mb-4">Register</legend>

           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium mb-1">Email</label>
               <input
                 type="email"
                 className="input bg-[#05011d] input-bordered w-full"
                 placeholder="Email"
                 required
               />
             </div>

             <div>
               <label className="block text-sm font-medium mb-1">Password</label>
               <input
                 type="password"
                 className="input bg-[#05011d] input-bordered w-full"
                 placeholder="Password"
                 required
               />
             </div>

             <div className="text-center mt-4">
               <p className="text-sm text-gray-300">
                 Already have an account?{" "}
                 <Link to="/login" className="text-blue-500 hover:underline">
                   Sign up here
                 </Link>
               </p>
             </div>

             <button type="submit" className="btn w-full mt-6">
               Register
             </button>
           </div>
         </fieldset>
       </form>
     </div>
   );
}
