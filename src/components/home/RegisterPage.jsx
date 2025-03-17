import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "../loading/Spinner.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.target);
    const { email, password, username, rePass } = Object.fromEntries(formData);

    try {
      if (password !== rePass) {
        event.target.password.value = "";
        event.target.rePass.value = "";
        throw new Error('Passwords don\'t match!')
      }

      await register(email, password, username);
      event.target.reset()
      navigate("/");
    } catch (err) {
      event.target.reset()
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/asd.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div>

      <form onSubmit={registerHandler} className="w-full max-w-md p-6 bg-[#2c2c2c] rounded-box shadow-lg relative z-10">
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

            <div>
              <label className="block text-sm font-medium mb-1">Repeat Password</label>
              <input
                type="password"
                name="rePass"
                className="input bg-[#05011d] input-bordered w-full"
                placeholder="Repeat Password"
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
              {isLoading && <Spinner />}
            </div>

            <button type="submit" className="btn w-full mt-6" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
