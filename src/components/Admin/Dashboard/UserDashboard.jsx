import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/my-orders?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.orders.length === 0) setHasMore(false);

      setOrders((prev) => {
        // 🔥 prevent duplicate orders
        const newOrders = data.orders.filter(
          (newOrder) => !prev.some((o) => o._id === newOrder._id)
        );
        return [...prev, ...newOrders];
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  // 🔥 SOCKET REAL-TIME UPDATE
//   useEffect(() => {
//     const socket = io(`${import.meta.env.VITE_API_URL}`);

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) => {
//         const exists = prev.find((o) => o._id === updatedOrder._id);

//         if (exists) {
//           return prev.map((o) =>
//             o._id === updatedOrder._id ? updatedOrder : o
//           );
//         } else {
//           // 🔥 new order appears on top
//           return [updatedOrder, ...prev];
//         }
//       });
//     });

//     return () => socket.disconnect();
//   }, []);

  // 🔥 Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // 🔥 Cancel Order
  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // instant UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "cancelled" } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Invoice Download
  const downloadInvoice = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/invoice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${id}.pdf`;
    a.click();
  };

  // 🔥 Timeline UI
  const getSteps = (status) => {
    const steps = ["pending", "processing", "shipped", "delivered"];
    return steps.map((step) => ({
      label: step,
      done: steps.indexOf(step) <= steps.indexOf(status),
    }));
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow-sm">
          
          {/* HEADER */}
          <div className="flex justify-between">
            <p className="font-semibold">Order: {order._id}</p>
            <p className="capitalize text-sm">{order.status}</p>
          </div>

          {/* 🔥 Timeline */}
          <div className="flex gap-2 mt-3">
            {getSteps(order.status).map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className={`h-2 rounded ${
                    step.done ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <p className="text-xs">{step.label}</p>
              </div>
            ))}
          </div>

          {/* ITEMS */}
          <div className="mt-3 text-sm">
            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} - ₹{item.price} x {item.qty}
              </p>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-3">
            {order.status !== "delivered" &&
              order.status !== "cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              )}

            <button
              onClick={() => downloadInvoice(order._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Invoice
            </button>
          </div>
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more orders</p>}
    </div>
  );
};

export default UserDashboard;