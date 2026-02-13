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
        <div className="w-full pt-60 max-sm:pt-30 px-14 max-sm:px-3">
            {/* Grid Layout 3 in a row */}
            <div className="grid grid-cols-3 gap-3 max-sm:gap-2 max-sm:grid-cols-2">
                {image.map((img, index) => (
                    <div
                        key={img.id}
                        ref={(el) => (ref.current[index] = el)}
                        data-index={index}
                        onClick={() => setSelectedIndex(index)}
                        className={` md:h-80 lg:110 xl:h-[40vh]
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
                            className="w-full h-full object-cover transform transition duration-700 hover:scale-110"
                        />
                    </div>
                ))}
            </div>


            {/* Modal Viewer */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-5 max-sm:top-2 right-5 text-white text-2xl"
                    >✕</button>


                    <button
                        onClick={prevImage}
                        className={` ${selectedIndex === 0 ? "hidden" : ""} absolute left-5 max-sm:left-1 text-white text-3xl max-sm:text-xl`}
                    >◀</button>


                    <img
                        src={image[selectedIndex].url}
                        className="max-w-[85%] max-h-[85%] rounded-xl transition duration-700 max-sm:px-3"
                    />


                    <button
                        onClick={nextImage}
                        className={` ${selectedIndex === image.length-1 ? "hidden" : ""} absolute right-5 max-sm:right-1 text-white text-3xl max-sm:text-xl`}
                    >▶</button>
                </div>
            )}
        </div>
    );
}

export default AllImage