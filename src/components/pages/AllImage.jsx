import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "./ScrollAnimation";
import useUserStore from "../../store/userStore";

/* ✅ Axios base instance */
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

function AllImage() {
    const [image, setImage] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // const [updateModal, setUpdateModal] = useState(false);
    // const [selectedImageId, setSelectedImageId] = useState(null);
    // const [newFile, setNewFile] = useState(null);

    const { user } = useUserStore();
    const isAdmin = user?.role === "admin";

    const { ref, visible } = ScrollAnimation();

    /* ✅ GET IMAGES */
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await API.get("/images/all");

                const fixedData = res.data.data.map((item) => ({
                    ...item,
                    image: item.image?.startsWith("http")
                        ? item.image
                        : `${import.meta.env.VITE_API_URL.replace("/api", "")}${item.image || ""}`,
                }));

                setImage(fixedData);
            } catch (error) {
                console.log("Image fetch error:", error);
            }
        };

        fetchImages();
    }, []);

    /* ✅ DELETE IMAGE */
    const handleDelete = async (id) => {
        try {
            await API.delete(`/images/delete/${id}`);

            setImage((prev) => prev.filter((img) => img._id !== id));

            setSelectedIndex(null); // close modal after delete
        } catch (err) {
            console.log("Delete error:", err);
        }
    };

    /* ✅ UPDATE IMAGE */
    // const handleUpdate = async (id) => {
    //     const newUrl = prompt("Enter new image URL");

    //     if (!newUrl) return;

    //     try {
    //         await API.put(`/images/update/${id}`, { image: newUrl });

    //         setImage((prev) =>
    //             prev.map((img) =>
    //                 img._id === id ? { ...img, image: newUrl } : img
    //             )
    //         );

    //         setSelectedIndex(null); // ✅ ADD THIS
    //     } catch (err) {
    //         console.log("Update error:", err);
    //     }
    // };

    // const handleUpdate = async (id) => {
    //     const newUrl = prompt("Enter new image URL");

    //     if (!newUrl) return;

    //     try {
    //         await API.put(`/images/update/${id}`, { image: newUrl });

    //         setImage((prev) =>
    //             prev.map((img) =>
    //                 img._id === id ? { ...img, image: newUrl } : img
    //             )
    //         );
    //     } catch (err) {
    //         console.log("Update error:", err);
    //     }
    // };


    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % image.length);
    };

    const prevImage = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? image.length - 1 : prev - 1
        );
    };

    const currentImage =
        selectedIndex !== null ? image[selectedIndex] : null;

    return (
        <div className="w-full h-full px-3 py-20 md:px-10 lg:px-14 lg:pt-40">

            {/* ✅ Grid */}
            <div className="grid lg:grid-cols-3 gap-3 max-sm:gap-2 grid-cols-2 w-full h-full">
                {image.map((img, index) => (
                    <div
                        key={img._id || index}
                        ref={(el) => (ref.current[index] = el)}
                        className={`relative group w-full aspect-square
                        cursor-pointer overflow-hidden transition-all duration-700`}
                    >
                        <img
                            src={img.image}
                            alt="uploaded"
                            onClick={() => setSelectedIndex(index)}
                            className="w-full h-full object-cover transition duration-700 hover:scale-110"
                        />
                    </div>
                ))}
            </div>

            {/* ✅ Modal */}
            {selectedIndex !== null && currentImage && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-999 px-3">

                    {/* Close */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-4 right-4 text-white text-2xl md:text-3xl z-50"
                    >
                        ✕
                    </button>

                    {/* Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 md:left-6 text-white lg:text-2xl md:text-4xl bg-black/40 lg:px-2 lg:py-1 rounded"
                    >
                        ◀
                    </button>

                    {/* Image Container */}
                    <div className="w-full max-w-5xl flex flex-col items-center gap-4">

                        {/* Image */}
                        <img
                            src={currentImage.image}
                            alt="preview"
                            className="
          w-full 
          max-h-[70vh] md:max-h-[80vh] 
          object-contain 
          rounded-lg
        "
                        />

                        {/* ✅ Admin Controls */}
                        {isAdmin && (
                            <div className="w-full flex justify-center md:justify-end">
                                <button
                                    onClick={() => handleDelete(currentImage._id)}
                                    className="
              bg-red-500 hover:bg-red-600 
              text-white 
              px-4 py-2 md:px-5 md:py-2.5 
              text-sm md:text-base 
              rounded-lg
            "
                                >
                                    Delete Image
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-2 md:right-6 text-white lg:text-2xl md:text-4xl bg-black/40 lg:px-2 lg:py-1 rounded"
                    >
                        ▶
                    </button>

                </div>
            )}

            {/* {updateModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">

                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md flex flex-col gap-4">

                        <h2 className="text-lg font-semibold">Update Image</h2>

                        {/* Old Image Preview */}
            {/* {selectedImageId && (
                            <img
                                src={
                                    image.find((img) => img._id === selectedImageId)?.image
                                }
                                alt="old"
                                className="w-full h-40 object-cover rounded"
                            />
                        )} */}

            {/* File Input */}
            {/* <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewFile(e.target.files[0])}
                            className="border p-2 rounded"
                        /> */}

            {/* Buttons */}
            {/* <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setUpdateModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default AllImage;

