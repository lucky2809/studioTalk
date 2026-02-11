import React, { useState } from 'react'
import imageData from '../Data/ImageData.json'
import useScrollAnimation from './ScrollAnimation';


const image = imageData.imageData



function AllImage() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { ref, visible } = useScrollAnimation();

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % image.length);
    };


    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + image.length) % image.length);
    };


    return (
        <div className="w-full pt-70 px-16">
            {/* Grid Layout 3 in a row */}
            <div className="grid grid-cols-3 gap-6">
                {image.map((img, index) => (
                    <div
                        key={img.id}
                        ref={(el) => (ref.current[index] = el)}
                        data-index={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`
        cursor-pointer overflow-hidden
        transition-all duration-700 ease-out
        ${visible.includes(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-16"
                            }
      `}
                    >
                        <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-60 object-cover transform transition duration-700 hover:scale-110"
                        />
                    </div>
                ))}
            </div>


            {/* Modal Viewer */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-5 right-5 text-white text-2xl"
                    >✕</button>


                    <button
                        onClick={prevImage}
                        className="absolute left-5 text-white text-3xl"
                    >◀</button>


                    <img
                        src={image[selectedIndex].url}
                        className="max-w-[85%] max-h-[85%] rounded-xl transition duration-700"
                    />


                    <button
                        onClick={nextImage}
                        className="absolute right-5 text-white text-3xl"
                    >▶</button>
                </div>
            )}
        </div>
    );
}

export default AllImage