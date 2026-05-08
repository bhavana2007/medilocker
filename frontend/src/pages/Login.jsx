import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Login() {

  const location = useLocation();

  const [role, setRole] = useState(
    location.state?.role || "patient"
  );

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    const emailInput =
      document.querySelector('input[placeholder="Enter Email"]').value;

    const passwordInput =
      document.querySelector('input[placeholder="Enter Password"]').value;

    if (!emailInput || !passwordInput) {

      setErrorMessage("Please fill all fields");

      return;
    }

    setErrorMessage("");

    if (role === "patient") {
      navigate("/dashboard");
    }

    else {
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

        {errorMessage && (
          <p className="text-red-400 text-center mt-4">
            {errorMessage}
          </p>
        )}

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