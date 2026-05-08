import { useState } from "react";
import { useParams } from "react-router-dom";

function Upload() {
  const { type } = useParams();

  const [file, setFile] = useState(null);

  const formattedType =
    type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    // 5MB limit
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert(`Please select a ${formattedType} file`);
      return;
    }

    alert(`${formattedType} uploaded successfully`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-96 text-center">

        <h1 className="text-3xl font-bold text-white mb-6">
          Upload {formattedType}
        </h1>

        <div className="border-2 border-dashed border-slate-500 p-6 rounded-xl mb-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="text-white"
          />
        </div>

        {file && (
          <p className="text-gray-300 mb-4">
            Selected File: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Upload
        </button>

      </div>

    </div>
  );
}

export default Upload;