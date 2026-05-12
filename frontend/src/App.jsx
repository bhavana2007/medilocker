import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

const [name, setName] = useState("");
const [role, setRole] = useState("patient");
const [hospital, setHospital] = useState("");

  const [file, setFile] = useState(null);

  const [records, setRecords] = useState([]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ---------------- LOGIN ----------------

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      const loggedInUser = res.data.user;

      if (loggedInUser) {

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

        setMessage("Login successful");

      } else {

        setMessage(res.data.message);

      }

    } catch (err) {

      setMessage(
        err.response?.data?.message || "Server error"
      );

    }
  };

  const handleRegister = async () => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/auth/register",
      {
        role,
        name,
        email,
        password,
        hospital,
      }
    );

    setMessage(res.data.message);
    setIsRegister(false);

  } catch (err) {
    setMessage(
      err.response?.data?.message || "Registration failed"
    );
  }
};

  // ---------------- UPLOAD ----------------

  const uploadFile = async () => {

    if (!file) {
      alert("Select a file first");
      return;
    }

    if (!user) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("email", user.email);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/auth/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

    } catch (err) {

      alert("Upload failed");

    }
  };

  // ---------------- FETCH RECORDS ----------------

  const fetchRecords = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/auth/records"
      );

      setRecords(res.data);

    } catch (err) {

      alert("Failed to load records");

    }
  };

  // ---------------- DASHBOARD ----------------

  if (user) {

    return (

      <div style={{ padding: "40px" }}>

        {user.role === "patient" && (

          <div>

            <h1>🧑‍⚕️ PATIENT DASHBOARD</h1>

            <h2>Welcome {user.name}</h2>

            <p>{user.email}</p>

            <hr />

            <h3>Upload Prescription</h3>

            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            <br /><br />

            <button onClick={uploadFile}>
              Upload File
            </button>

          </div>
        )}

        {user.role === "doctor" && (

          <div>

            <h1>👨‍⚕️ DOCTOR DASHBOARD</h1>

            <h2>Dr. {user.name}</h2>

            <p>{user.email}</p>

            <hr />

            <button onClick={fetchRecords}>
              Load Patient Records
            </button>

            <br /><br />

            {records.length === 0 ? (

              <p>No records loaded</p>

            ) : (

              records.map((r, index) => (

                <div
                  key={index}
                  style={{
                    border: "1px solid gray",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >

                  <p>
                    <b>Patient:</b> {r.email}
                  </p>

                  <a
                    href={`http://127.0.0.1:8000/${r.file_path}`}
                    target="_blank"
                  >
                    Open File
                  </a>

                </div>

              ))
            )}

          </div>
        )}

        <br />

        <button
          onClick={() => {

            localStorage.removeItem("user");

            setUser(null);

          }}
        >
          Logout
        </button>

      </div>
    );
  }

  // ---------------- LOGIN PAGE ----------------

return (
  <div className="container">

    <div className="card">

      <h1>
        {isRegister ? "MediLocker Register" : "MediLocker Login"}
      </h1>

      {isRegister && (
        <>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <select
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <br /><br />

          <input
            placeholder="Hospital"
            onChange={(e) => setHospital(e.target.value)}
          />

          <br /><br />
        </>
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {isRegister ? (
        <button onClick={handleRegister}>
          Register
        </button>
      ) : (
        <button onClick={handleLogin}>
          Login
        </button>
      )}

      <br /><br />

      <button
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have account? Login"
          : "Create New Account"}
      </button>

      <p>{message}</p>

    </div>
  </div>
);
}
export default App;