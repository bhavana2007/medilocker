import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);

  // ✅ FIXED: moved inside component
  const [records, setRecords] = useState([]);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Login successful");
        window.location.reload();
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  // ✅ NEW: upload function
const uploadFile = async () => {
  if (!file) {
    alert("Please select a file first");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ SAFETY CHECK
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
    alert(err.response?.data?.message || "Upload failed");
  }
};

  const user = JSON.parse(localStorage.getItem("user"));
const fetchRecords = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/auth/records");
    setRecords(res.data);
  } catch (err) {
    alert("Failed to load records");
  }
};
  // ---------------- DASHBOARD ----------------
  if (user) {
    return (
      <div style={{ padding: "50px" }}>

        {/* PATIENT DASHBOARD */}
        {user.role === "patient" && (
          <div>
            <h1>🧑‍⚕️ PATIENT DASHBOARD</h1>
            <h2>Welcome {user.name}</h2>
            <p>Email: {user.email}</p>

            <hr />

            {/* ✅ FILE UPLOAD UI */}
            <h3>📁 Upload Prescription</h3>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

           <button onClick={uploadFile}>
  Upload Prescription (Save to Records)
</button>
          </div>
        )}

       {user.role === "doctor" && (
  <div>
    <h1>👨‍⚕️ DOCTOR DASHBOARD</h1>
    <h2>Dr. {user.name}</h2>
    <p>Email: {user.email}</p>

    <hr />

    <button onClick={fetchRecords}>
      📥 Load Patient Records
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
          <p><b>Patient Email:</b> {r.email}</p>

          <a
  href={`http://127.0.0.1:8000/uploads/${r.file_path.split("/").pop()}`}
  target="_blank"
>
            🔗 Open File
          </a>
        </div>
      ))
    )}
  </div>
)}
      </div>
    );
  }

  // ---------------- LOGIN PAGE ----------------
  return (
    <div style={{ padding: "50px" }}>
      <h1>MediLocker Login</h1>

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

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default App;