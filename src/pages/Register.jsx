import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const isDuplicate = users.some((item) => item.email === data.email);

    if (isDuplicate) {
      alert("User already exist!");
      return;
    }

    users.push({ id: Date.now(), ...data });
    localStorage.setItem("users", JSON.stringify(users));
    setError("");

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <form
        className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-6 shadow-md sm:p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Create Account
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter your full name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Create a password"
              name="password"
              value={data.password}
              onChange={handleChange}
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
          className="cursor-pointer rounded-lg bg-blue-600 py-3 font-medium text-white  "
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
