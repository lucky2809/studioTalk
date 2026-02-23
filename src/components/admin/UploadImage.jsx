import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setFile(img);
    setPreview(URL.createObjectURL(img));
    setSuccess("");
    setError("");
  };

  const uploadImage = async () => {
    if (!file) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post("http://localhost:8000/api/images/upload", formData);

      setSuccess("Image uploaded successfully ✅");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
      setError("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          Upload Your Image
        </h2>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-white transition group relative overflow-hidden">

          {!preview ? (
            <div className="flex flex-col items-center justify-center text-white/70">
              <div className="text-5xl mb-2">📤</div>
              <p className="text-sm">Click to upload image</p>
              <p className="text-xs text-white/40">PNG, JPG, JPEG</p>
            </div>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={uploadImage}
            disabled={loading}
            className="flex-1 bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={() => {
              setFile(null);
              setPreview(null);
              setError("");
              setSuccess("");
            }}
            className="flex-1 border border-white/30 text-white py-2 rounded-xl hover:bg-white/10 transition"
          >
            Clear
          </button>
        </div>

        {/* Status */}
        {success && (
          <p className="mt-3 text-green-400 text-sm text-center">{success}</p>
        )}

        {error && (
          <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Loader */}
        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;