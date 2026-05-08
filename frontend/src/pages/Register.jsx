import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [role, setRole] = useState("patient");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-80">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        <select
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient Registration</option>
          <option value="doctor">Doctor Registration</option>
        </select>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        {role === "doctor" && (
          <input
            type="text"
            placeholder="Enter Hospital Name"
            className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
          />
        )}

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg">
          Register
        </button>

        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;