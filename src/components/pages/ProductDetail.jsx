import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CursorEffect from "./section/CursorEffect";
import AddCartButton from "../UserInformation.jsx/AddCartButton";
import BuyNowButton from "./BuyNowButton";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const [related, setRelated] = useState([]);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    // Get current product
    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then(res => {
        const p = res.data;
        setProduct(p);

        const imgs = [p.mainImage, ...(p.images || [])];
        setAllImages(imgs);
        setSelectedImage(imgs[0]);

        // Fetch related products (same category)
        return axios.get(`${import.meta.env.VITE_API_URL}/products/related/${p._id}`);
      })
      .then(res => setRelated(res.data))
      .catch(err => console.error(err));

  }, [id]);

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  // 🔍 ZOOM EFFECT
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const resetZoom = () => setZoomStyle({ transform: "scale(1)" });

  // 👉 SLIDER (MOBILE)
  const nextImage = () => {
    const next = (currentIndex + 1) % allImages.length;
    setCurrentIndex(next);
    setSelectedImage(allImages[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prev);
    setSelectedImage(allImages[prev]);
  };

  // 🎯 SIZE CLICK → CHANGE IMAGE
  const handleSizeClick = (index) => {
    if (allImages[index]) {
      // setSelectedImage(allImages[index]);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="p-6">
      <CursorEffect />

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="flex gap-4">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-2 mb-3 overflow-x-auto">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={`${baseURL}/uploads/${img}`}
                onClick={() => { setSelectedImage(img); setCurrentIndex(i); }}
                className={`h-16 w-16 object-cover cursor-pointer border ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE WITH ZOOM */}
          <div className="relative overflow-hidden border">
            <img
              src={`${baseURL}/uploads/${selectedImage}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetZoom}
              onClick={() => setFullscreen(true)}
              style={zoomStyle}
              className="w-full h-96 object-cover transition duration-200 cursor-zoom-in"
            />

            {/* MOBILE SLIDER BUTTONS */}
            <button onClick={prevImage} className="absolute left-2 top-1/2 bg-white px-2">◀</button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 bg-white px-2">▶</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2">{product.description}</p>
          <p className="text-xl mt-4">₹{product.price}</p>

          {/* 🎯 SIZE VARIANT */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size:</h3>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSizeClick(i)}
                  className="border px-3 py-1 hover:bg-gray-200"
                >
                  {s.width}x{s.height}
                </button>
              ))}
            </div>
          </div>
          <AddCartButton
            product={product}                            // full product object
            variant={product.sizes ? product.sizes[0] : null} // first size variant (optional)
            thumbnail={allImages[0]}                        // thumbnail image
          />
          <BuyNowButton
            product={product}                            // full product object
            variant={product.sizes ? product.sizes[0] : null} // first size variant (optional)
            thumbnail={allImages[0]}                        // thumbnail image
          />

        </div>
      </div>

      {/* 🔥 FULLSCREEN MODAL */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img src={`${baseURL}/uploads/${selectedImage}`} className="max-h-[90%] max-w-[90%]" />
          <button onClick={() => setFullscreen(false)} className="absolute top-5 right-5 text-white text-2xl">✕</button>
          <button onClick={prevImage} className="absolute left-5 text-white text-2xl">◀</button>
          <button onClick={nextImage} className="absolute right-5 text-white text-2xl">▶</button>
        </div>
      )}

      {/* 🔥 RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="border p-2 cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={`${baseURL}/uploads/${p.mainImage}`}
                  className="h-40 w-full object-cover"
                />
                <h3 className="mt-2 text-sm font-semibold line-clamp-1">{p.title}</h3>
                <p className="text-gray-600 text-sm">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;