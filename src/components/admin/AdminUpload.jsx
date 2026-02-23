import axios from "axios";
import { useState } from "react";

function AdminUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: ""
  });

  // size system
  const [sizeInput, setSizeInput] = useState({ width: "", height: "" });
  const [sizes, setSizes] = useState([]);   // [{width:40,height:30}]

  // images
  const [images, setImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(null);

  // handle images
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  // add size
  const addSize = () => {
    if (!sizeInput.width || !sizeInput.height) return;

    setSizes(prev => [
      ...prev,
      {
        width: Number(sizeInput.width),
        height: Number(sizeInput.height)
      }
    ]);

    setSizeInput({ width: "", height: "" });
  };

  // remove size
  const removeSize = (index) => {
    setSizes(prev => prev.filter((_, i) => i !== index));
  };

  // remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (index === mainIndex) setMainIndex(null);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (images.length < 4) {
        alert("Minimum 4 images required");
        return;
      }

      if (mainIndex === null) {
        alert("Please select a main image");
        return;
      }

      if (sizes.length === 0) {
        alert("Please add at least one size");
        return;
      }

      const data = new FormData();

      // text fields
      Object.keys(form).forEach(key => {
        data.append(key, form[key]);
      });

      // sizes
      data.append("sizes", JSON.stringify(sizes));

      // main image
      data.append("mainImage", images[mainIndex]);

      // gallery images
      images.forEach((img, i) => {
        if (i !== mainIndex) {
          data.append("images", img);
        }
      });

      await axios.post("http://localhost:8000/api/products/create", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("✅ Product Uploaded Successfully");

      // reset form
      setForm({
        title: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: ""
      });
      setSizes([]);
      setImages([]);
      setMainIndex(null);

    } catch (error) {
      console.error("UPLOAD ERROR:", error.response?.data || error.message);
      alert("❌ Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-bold mb-6">Admin Product Upload</h1>

        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            className="border p-2 rounded"
            placeholder="Product Title"
            value={form.title}
            onChange={e=>setForm({...form,title:e.target.value})}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={e=>setForm({...form,stock:e.target.value})}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e=>setForm({...form,price:e.target.value})}
          />

          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Discount Price"
            value={form.discountPrice}
            onChange={e=>setForm({...form,discountPrice:e.target.value})}
          />
        </div>

        <textarea
          className="border p-2 rounded w-full mb-6"
          placeholder="Product Description"
          value={form.description}
          onChange={e=>setForm({...form,description:e.target.value})}
        />

        {/* SIZE SYSTEM */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Product Sizes (Dimensions)</h2>

          <div className="flex gap-2 mb-3">
            <input
              className="border p-2 rounded w-24"
              placeholder="Width"
              value={sizeInput.width}
              onChange={e=>setSizeInput({...sizeInput, width:e.target.value})}
            />
            <input
              className="border p-2 rounded w-24"
              placeholder="Height"
              value={sizeInput.height}
              onChange={e=>setSizeInput({...sizeInput, height:e.target.value})}
            />
            <button
              type="button"
              onClick={addSize}
              className="bg-black text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <div key={i} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                <span>{s.width} x {s.height}</span>
                <button
                  type="button"
                  onClick={()=>removeSize(i)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center mb-4">
          <p className="font-semibold">Upload Product Images</p>
          <p className="text-sm text-gray-500">Minimum 4 images required</p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="mt-4"
          />

          <p className="mt-2 text-sm">
            Selected: {images.length}/4 {images.length >= 4 ? "✅" : "❌"}
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          👉 Click any image to set as <b>Main Image</b>
        </p>

        {/* PREVIEW GRID */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {images.map((img, index) => (
            <div key={index} className="relative group cursor-pointer">
              
              <img
                src={URL.createObjectURL(img)}
                alt=""
                className={`h-32 w-full object-cover rounded-lg border-2 ${
                  mainIndex === index ? "border-green-500" : "border-gray-300"
                }`}
                onClick={() => setMainIndex(index)}
              />

              {mainIndex === index && (
                <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  MAIN
                </span>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Upload Product
        </button>

      </div>
    </div>
  );
}

export default AdminUpload;