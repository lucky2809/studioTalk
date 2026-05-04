import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;
  const variant = state?.variant;
  const thumbnail = state?.thumbnail;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  // ✅ AUTO-FILL FROM BACKEND
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/my-address`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data) {
          setAddress(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ✅ PINCODE AUTO FETCH
  const fetchAddressFromPincode = async (pincode) => {
    try {
      if (pincode.length !== 6) return;

      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];

        setAddress((prev) => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State,
        }));
      } else {
        toast.error("Invalid Pincode");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ PLACE ORDER
  const handleOrder = async () => {
    try {
      if (!address.fullName || !address.phone || !address.addressLine) {
        return toast.error("Please fill required fields");
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Please login first");
        return navigate("/login");
      }

      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: [
              {
                productId: product._id,
                title: product.title,
                price: product.price,
                variant,
                thumbnail,
                qty: 1,
              },
            ],
            address,
            paymentMethod,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ LOCAL SAVE (backup)
      localStorage.setItem("saved_address", JSON.stringify(address));

      toast.success("Order Placed Successfully ✅");
      navigate("/order-success", { state: data.order });

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Order Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <h2 className="text-center mt-10">No product found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* PRODUCT */}
      <div className="flex gap-4 border p-4 mb-6 rounded">
        <img
          src={`${baseURL}/uploads/${thumbnail}`}
          alt="product"
          className="h-24 w-24 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold">{product.title}</h2>
          <p className="text-gray-600">₹{product.price}</p>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="fullName" value={address.fullName} placeholder="Full Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="phone" value={address.phone} placeholder="Phone" onChange={handleChange} className="border p-2 rounded" />

        <input
          name="pincode"
          value={address.pincode}
          placeholder="Pincode"
          onChange={(e) => {
            handleChange(e);
            fetchAddressFromPincode(e.target.value);
          }}
          className="border p-2 rounded"
        />

        <input name="city" value={address.city} placeholder="City" onChange={handleChange} className="border p-2 rounded" />
        <input name="state" value={address.state} placeholder="State" onChange={handleChange} className="border p-2 rounded" />
        <input name="addressLine" value={address.addressLine} placeholder="Address" onChange={handleChange} className="border p-2 rounded col-span-2" />
      </div>

      {/* PAYMENT */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

    </div>
  );
}

export default Checkout;