import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Patient Dashboard
      </h1>

      {/* Patient Details */}
      <div className="max-w-3xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-lg mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Patient Details
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-400">Name</p>
            <p className="font-semibold">Bhavana</p>
          </div>

          <div>
            <p className="text-gray-400">Age</p>
            <p className="font-semibold">19</p>
          </div>

          <div>
            <p className="text-gray-400">Date of Birth</p>
            <p className="font-semibold">12-05-2006</p>
          </div>

          <div>
            <p className="text-gray-400">Gender</p>
            <p className="font-semibold">Female</p>
          </div>

          <div>
            <p className="text-gray-400">Height</p>
            <p className="font-semibold">160 cm</p>
          </div>

          <div>
            <p className="text-gray-400">Weight</p>
            <p className="font-semibold">52 kg</p>
          </div>

          <div>
            <p className="text-gray-400">Blood Group</p>
            <p className="font-semibold">O+</p>
          </div>

        </div>

      </div>

      {/* Upload Buttons */}
      <div className="flex justify-center gap-4 mb-8">

        <Link to="/upload/prescription">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl">
            Upload Prescription
          </button>
        </Link>

        <Link to="/upload/report">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl">
            Upload Report
          </button>
        </Link>

      </div>

      {/* Medical History */}
      <div className="max-w-3xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-4">
          Medical History
        </h2>

        <div className="bg-slate-700 p-4 rounded-xl mb-4">
          <p className="font-semibold">Fever Prescription</p>
          <p className="text-gray-300">January 2026</p>
        </div>

        <div className="bg-slate-700 p-4 rounded-xl">
          <p className="font-semibold">Blood Test Report</p>
          <p className="text-gray-300">February 2026</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;