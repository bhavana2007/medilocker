import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [role, setRole] = useState("patient");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "patient") {
      navigate("/dashboard");
    } else {
      navigate("/doctor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-80">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          MediLocker
        </h1>

        <select
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient Login</option>
          <option value="doctor">Doctor Login</option>
        </select>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-gray-300 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;