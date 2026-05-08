import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("patient");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {

  const nameInput =
    document.querySelector('input[placeholder="Enter Name"]').value;

  const emailInput =
    document.querySelector('input[placeholder="Enter Email"]').value;

  const passwordInput =
    document.querySelector('input[placeholder="Enter Password"]').value;

  const hospitalInput =
    document.querySelector('input[placeholder="Enter Hospital Name"]')?.value || "";

  // Validation
  if (!nameInput || !emailInput || !passwordInput) {

    alert("Please fill all required fields");

    return;
  }

  if (role === "doctor" && !hospitalInput) {

    alert("Please enter hospital name");

    return;
  }

  const userData = {
    role,
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    hospital: hospitalInput,
  };

  try {

    const response = await fetch("http://127.0.0.1:8000/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),

    });

    const data = await response.json();

    setSuccessMessage(data.message);

    setTimeout(() => {

      navigate("/", { state: { role } });

    }, 2000);

  }

  catch (error) {

    console.error(error);

    alert("Registration Failed");

  }

};
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

        <button
  onClick={handleRegister}
  className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
>
          Register
        </button>
        {successMessage && (
  <p className="text-green-400 text-center mt-4">
    {successMessage}
  </p>
)}
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