import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(data);
    const user = data.find(
      (item) => item.email === email && item.password === password,
    );
    console.log(user);
    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", user.id);

    navigate("/todo");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <form
        className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-6 shadow-md sm:p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            className="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-lg bg-blue-600 py-3 font-medium cursor-pointer text-white transition "
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
