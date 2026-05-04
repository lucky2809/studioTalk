import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useCartStore = create(
  persist(
    (set, get) => ({

      addCart: [],

      // 🔥 Load from backend
      loadCartFromBackend: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_BACK_END_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({ addCart: res.data.data });
      },

      // 🔥 Add item
      addItem: async (item) => {
        const token = localStorage.getItem("access_token");

        if (!token) {
          // guest mode
          set((state) => ({
            addCart: [...state.addCart, item],
          }));
          return;
        }

        const res = await axios.post(
          `${import.meta.env.VITE_BACK_END_URL}/cart/add`,
          {
            productId: item.id,
            productName: item.name,
            image: item.image,
            price: item.price,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        get().loadCartFromBackend();
      },

      // 🔥 Remove
      removeItem: async (id) => {
        const token = localStorage.getItem("access_token");

        if (!token) {
          set((state) => ({
            addCart: state.addCart.filter((i) => i.id !== id),
          }));
          return;
        }

        await axios.delete(`${import.meta.env.VITE_BACK_END_URL}/cart/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        get().loadCartFromBackend();
      },

      // 🔥 Clear
      clearCart: async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
          set({ addCart: [] });
          return;
        }

        await axios.delete(`${import.meta.env.VITE_BACK_END_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({ addCart: [] });
      },

      // 🔥 Sync on login
      syncCartOnLogin: async () => {
        const token = localStorage.getItem("access_token");
        const localCart = get().addCart;

        if (!token || localCart.length === 0) return;

        await axios.post(
          `${import.meta.env.VITE_BACK_END_URL}/cart/sync`,
          { items: localCart },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        set({ addCart: [] });
        get().loadCartFromBackend();
      },

    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;