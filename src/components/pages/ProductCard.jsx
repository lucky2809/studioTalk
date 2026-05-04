// import React, { Fragment, useState } from "react";
// import ProductModal from "../ModalComponent/ProductModal";

// export const fallbackProducts = [
//     {
//         id: 1,
//         title: "Things That Keep Me Going Still Life",
//         price: "€29.00 EUR",
//         image:
//             "https://studiohaleytippmann.myshopify.com/cdn/shop/files/c4715042-d4c3-42d8-a2ac-959f752c13b0.webp?v=1769866756&width=533",
//     },
//     {
//         id: 2,
//         title: "Abstract Wall Painting",
//         price: "€35.00 EUR",
//         image:
//             "https://picsum.photos/400/400?random=1",
//     },
//     {
//         id: 3,
//         title: "Modern Art Canvas",
//         price: "€42.00 EUR",
//         image:
//             "https://studiohaleytippmann.myshopify.com/cdn/shop/files/7998672f-4397-4d01-8715-7da2a054ca72.webp?v=1769866081&width=533",
//     },
//     {
//         id: 4,
//         title: "Minimalist Artwork",
//         price: "€25.00 EUR",
//         image:
//             "https://picsum.photos/400/400?random=3",
//     },
// ];

// const ProductCard = () => {
//     const [open, setOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const handlerOpenViewModal = (product) => {
//         setSelectedProduct(product);
//         setOpen(true);
//     }
//     return (
//         <Fragment>
//             <ProductModal open={open} setOpen={setOpen} selectedProduct={selectedProduct} />
//             <div className="flex flex-wrap justify-center  mt-10">
//                 {
//                     fallbackProducts.map((product) => {
//                         return (
//                             <div className="product-card m-5 relative w-[320px] 
//   rounded-xl shadow-lg 
//   border border-black/20 hover:border-black/50 
//   group transition duration-300
//   overflow-hidden
// ">
//                                 <div className="p-3">
//                                     <div className="overflow-hidden rounded-lg">
//                                         <img
//                                             src={product.image}
//                                             alt={product.title}
//                                             className="w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="text-center p-4">
//                                     <h3 className="font-DynaPuff text-lg tracking-wide text-gray-800 hover:underline cursor-pointer">
//                                         {product.title}
//                                     </h3>
//                                     <p className="text-gray-600 mt-2 font-poppins">
//                                         From {product.price}
//                                     </p>
//                                 </div>

//                                 <div
//                                     onClick={() => handlerOpenViewModal(product)}
//                                     className="
//       absolute bottom-0 left-0 w-full
//       translate-y-full
//       bg-black text-white text-center py-3
//       transition-all duration-300 ease-in-out
//       group-hover:translate-y-0
//       cursor-pointer
//     "
//                                 >
//                                     Add to Cart
//                                 </div>

//                             </div>


//                         )
//                     })
//                 }
//             </div>

//         </Fragment>
//     );
// };

// export default ProductCard;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ProductCard() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/products`)
//       .then(res => setProducts(res.data));
//   }, []);

//   return (
//     <div className="grid grid-cols-3 gap-4 p-4">
//       {products.map((p) => (
//         <div 
//           key={p._id} 
//           onClick={() => navigate(`/product/${p._id}`)}
//           className="border p-3 cursor-pointer hover:shadow-lg"
//         >
//           <img
//             src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${p.mainImage}`}
//             className="h-40 w-full object-cover"
//           />
//           <h2 className="font-bold">{p.title}</h2>
//           <p>₹{p.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductCard;





import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Get query params
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const category = params.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/products`;

        // 🔹 If search or category exist, add query params
        const queryParams = {};
        if (search) queryParams.search = search;
        if (category) queryParams.category = category;

        const res = await axios.get(url, { params: queryParams });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [search, category]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/product/${p._id}`)}
          className="border p-3 cursor-pointer"
        >
          <img
            src={`${import.meta.env.VITE_API_URL.replace(
              "/api",
              ""
            )}/uploads/${p.mainImage}`}
            className="h-40 w-full object-cover"
            alt={p.title}
          />
          <h2>{p.title}</h2>
          <p>₹{p.price}</p>
          <p className="text-sm text-gray-500">{p.category}</p>
        </div>
      ))}

      {/* ❌ No products found */}
      {products.length === 0 && (
        <div className="col-span-3 text-center text-gray-500 py-10">
          No products found
        </div>
      )}
    </div>
  );
}

export default ProductCard;