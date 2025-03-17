import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "../loading/Spinner.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const registerHandler = async (formdata) => {
    setIsLoading(true)
    setError(null)
    const { email, password, username } = Object.fromEntries(formdata)
    try {
      await register(email, password, username)
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.log(err.message)
    } finally {
      setIsLoading(false)
    }
  }

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
      {isLoading && <Spinner />}


      <form action={registerHandler} className="w-full max-w-md p-6 bg-[#2c2c2c] rounded-box shadow-lg relative z-10">
        <fieldset className="border border-base-300 p-4 rounded-box">
          <legend className="text-xl font-bold text-center mb-4">Register</legend>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="input bg-[#05011d] input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="username"
                name="username"
                className="input bg-[#05011d] input-bordered w-full"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="input bg-[#05011d] input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>

            <div className="text-center m-auto">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign up here
                </Link>
              </p>
              {error && <p className="text-red-500">{error}</p>}
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
