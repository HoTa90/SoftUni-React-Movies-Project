import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Spinner from "../loading/Spinner.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const loginHandler = async (event) => {

        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.target);
        const { email, password } = Object.fromEntries(formData);
        try {
            await login(email, password);

            navigate("/");
        } catch (err) {
                console.log(err.code)
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError(err.message);
            }
        } finally {
            event.target.reset()
            setIsLoading(false);

        }
    };
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


            <form onSubmit={loginHandler} className="w-full max-w-md p-6 bg-[#2c2c2c] rounded-box shadow-lg relative z-10">
                <fieldset className="border border-base-300 p-4 rounded-box">
                    <legend className="text-xl font-bold text-center mb-4">Login</legend>

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
                                Don't have an account?{" "}
                                <Link to="/login" className="text-blue-500 hover:underline">
                                    Register here
                                </Link>
                            </p>
                            {error && <p className="text-red-500">{error}</p>}
                            {isLoading && <Spinner />}
                        </div>

                        <button type="submit" className="btn w-full mt-6" disabled={isLoading}>
                            {isLoading ? "Loggin in..." : "Login"}
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
