import { useState } from "react";
import axios from "axios";

function UploadProduct() {

  const categories = ["painting", "frame", "wall-art", "decor"];

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [mainIndex, setMainIndex] = useState(0);
  const [sizes, setSizes] = useState([]);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    const newImgs = images.filter((_, i) => i !== index);
    setImages(newImgs);

    if (index === mainIndex) setMainIndex(0);
    else if (index < mainIndex) setMainIndex(mainIndex - 1);
  };

  // SIZE ADD
  const addSize = () => {
    setSizes([...sizes, { width: "", height: "" }]);
  };

  // SIZE UPDATE
  const updateSize = (index, key, value) => {
    const newSizes = [...sizes];
    newSizes[index][key] = value;
    setSizes(newSizes);
  };

  // REMOVE SIZE
  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("❌ Please upload at least 1 image");
      return;
    }

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("sizes", JSON.stringify(sizes));

    // ✅ MAIN IMAGE
    data.append("mainImage", images[mainIndex]);

    // ✅ OTHER IMAGES
    images.forEach((img, i) => {
      if (i !== mainIndex) {
        data.append("images", img);
      }
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, data);

      alert("✅ Product Uploaded Successfully");

      setForm({
        title: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        category: "",
      });

      setImages([]);
      setSizes([]);
      setMainIndex(0);

    } catch (err) {
      alert("❌ Upload failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="p-6 space-y-6 max-w-3xl mx-auto">

      {/* TITLE */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full"
      />

      {/* CATEGORY */}
      <select
        required
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="border p-2 w-full"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 w-full"
      />

      {/* PRICE */}
      <div className="grid grid-cols-3 gap-3">
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border p-2"
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <h2 className="font-bold mb-2">Upload Images</h2>

        <input type="file" multiple onChange={handleImageUpload} />

        <p className="text-sm text-gray-500 mt-1">
          Click image to set as thumbnail
        </p>

        <div className="flex gap-3 mt-3 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative group">

              {/* IMAGE */}
              <img
                src={URL.createObjectURL(img)}
                onClick={() => setMainIndex(i)}
                className={`h-24 w-24 object-cover rounded cursor-pointer border-2 transition ${
                  mainIndex === i
                    ? "border-blue-500 scale-105"
                    : "border-gray-300"
                }`}
              />

              {/* REMOVE */}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>

              {/* ✅ THUMBNAIL LABEL */}
              {mainIndex === i && (
                <span className="absolute bottom-0 left-0 bg-blue-600 text-white text-[10px] px-1 rounded">
                  Thumbnail
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <h2 className="font-bold mb-2">Sizes</h2>

        <button
          type="button"
          onClick={addSize}
          className="bg-gray-200 px-3 py-1 mb-3"
        >
          + Add Size
        </button>

        {sizes.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2 items-center">
            <input
              placeholder="Width"
              value={s.width}
              onChange={(e) => updateSize(i, "width", e.target.value)}
              className="border p-2"
            />
            <input
              placeholder="Height"
              value={s.height}
              onChange={(e) => updateSize(i, "height", e.target.value)}
              className="border p-2"
            />

            <button
              type="button"
              onClick={() => removeSize(i)}
              className="bg-red-500 text-white px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Upload Product
      </button>

    </form>
  );
}

export default UploadProduct;