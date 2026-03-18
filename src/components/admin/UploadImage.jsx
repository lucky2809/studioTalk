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

      await axios.post(`${import.meta.env.VITE_API_URL}/images/upload`, formData);

      setSuccess("Image uploaded successfully ✅");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-8">
      
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl p-5 sm:p-6 md:p-8">

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6">
          Upload Image
        </h2>

        {/* Upload Area */}
        <label className="relative flex flex-col items-center justify-center w-full h-52 sm:h-60 md:h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-white/50 transition overflow-hidden group">

          {!preview ? (
            <div className="flex flex-col items-center text-white/70 text-center px-3">
              <div className="text-4xl sm:text-5xl mb-2">📤</div>
              <p className="text-sm sm:text-base font-medium">
                Click or Drag & Drop
              </p>
              <p className="text-xs text-white/40 mt-1">
                PNG, JPG, JPEG (Max 5MB)
              </p>
            </div>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
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
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={uploadImage}
            disabled={loading}
            className="w-full bg-white text-black py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
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
            className="w-full border border-white/30 text-white py-2.5 rounded-xl hover:bg-white/10 transition"
          >
            Clear
          </button>
        </div>

        {/* Status Messages */}
        {success && (
          <p className="mt-4 text-green-400 text-sm text-center animate-pulse">
            {success}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        {/* Loader */}
        {loading && (
          <div className="mt-5 flex justify-center">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImage;