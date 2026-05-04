import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BuyNowButton = ({ product, variant, thumbnail }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please login first");
      return navigate("/login");
    }

    // 🚀 Direct checkout page par jao with data
    navigate("/checkout", {
      state: {
        product,
        variant,
        thumbnail,
      },
    });
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 mt-4 rounded w-full"
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;