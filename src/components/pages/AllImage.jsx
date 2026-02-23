import React, { useState, useEffect } from 'react'
import axios from "axios"
import ScrollAnimation from './ScrollAnimation';

function AllImage() {
    const [image, setImage] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // ✅ USE SAME REF FROM HOOK
    const { ref, visible } = ScrollAnimation();

    /* GET IMAGES */
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/images/all");

                const fixedData = res.data.data.map(item => ({
                    ...item,
                    image: item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:8000${item.image}`
                }));

                setImage(fixedData);
            } catch (error) {
                console.log("Image fetch error:", error);
            }
        };

        fetchImages();
    }, []);

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % image.length);
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + image.length) % image.length);
    };

    return (
        <div className="w-full h-full px-3 py-30 md:px-10 lg:px-14 lg:pt-60 ">
            {/* Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-3 max-sm:gap-2 grid-cols-2 w-full h-full">
                {image.map((img, index) => (
                    <div
                        key={img._id || index}
                        ref={(el) => (ref.current[index] = el)}   // 🔥 MUST
                        data-index={index}                      // 🔥 MUST
                        onClick={() => setSelectedIndex(index)}
                        className={`h-full w-full md:h-80 lg:110 xl:h-[40vh]
      cursor-pointer overflow-hidden
      transition-all duration-700 ease-out
      ${visible.has(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-16"
                            }
    `}
                    >
                        <img
                            src={img.image}
                            alt="uploaded"
                            className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
                        />
                    </div>
                ))}
            </div>

            {/* Modal Viewer */}
            {selectedIndex !== null && image.length > 0 && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-5 max-sm:top-2 right-5 text-white text-2xl"
                    >✕</button>

                    <button
                        onClick={prevImage}
                        className={`${selectedIndex === 0 ? "hidden" : ""} absolute left-5 max-sm:left-1 text-white text-3xl max-sm:text-xl`}
                    >◀</button>

                    <img
                        src={image[selectedIndex]?.image}
                        className="max-w-[85%] max-h-[85%] rounded-xl transition duration-700 max-sm:px-3"
                    />

                    <button
                        onClick={nextImage}
                        className={`${selectedIndex === image.length - 1 ? "hidden" : ""} absolute right-5 max-sm:right-1 text-white text-3xl max-sm:text-xl`}
                    >▶</button>
                </div>
            )}
        </div>
    );
}

export default AllImage;