import React, { useState } from "react";
import { Button } from "@mui/material";
import ModalLogiin from "../ModalComponent/ModalLogiin";
import useUserStore from "../../store/userStore";

function AddCartButton({ product, variant, thumbnail }) {
  const { user } = useUserStore();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (!product || (!product.id && !product._id)) {
      alert("Product not found");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id || product._id,
          productName: product.title || product.name,
          image: thumbnail,
          price: Number(variant?.retail_price || product.price || 0),
          quantity: 1,
        }),
      });

      const text = await res.text();
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.warn("Response is not valid JSON:", text);
        }
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to add item");
      }

      alert(data?.message || "Item added to cart!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="outlined"
        disabled={loading}
        sx={{
          width: "100%",
          "&:hover": { bgcolor: "black", color: "white" },
        }}
        onClick={handleAdd}
      >
        {loading ? "Adding..." : "Add To Cart"}
      </Button>

      <ModalLogiin modalNavLogin={loginOpen} setModalmodalNav={setLoginOpen} />
    </div>
  );
}

export default AddCartButton;