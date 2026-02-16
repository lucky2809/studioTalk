import React, { Fragment } from "react";

const ProductCard = () => {
    const fallbackProducts = [
        {
            id: 1,
            title: "Things That Keep Me Going Still Life",
            price: "€29.00 EUR",
            image:
                "https://studiohaleytippmann.myshopify.com/cdn/shop/files/c4715042-d4c3-42d8-a2ac-959f752c13b0.webp?v=1769866756&width=533",
        },
        {
            id: 2,
            title: "Abstract Wall Painting",
            price: "€35.00 EUR",
            image:
                "https://picsum.photos/400/400?random=1",
        },
        {
            id: 3,
            title: "Modern Art Canvas",
            price: "€42.00 EUR",
            image:
                "https://studiohaleytippmann.myshopify.com/cdn/shop/files/7998672f-4397-4d01-8715-7da2a054ca72.webp?v=1769866081&width=533",
        },
        {
            id: 4,
            title: "Minimalist Artwork",
            price: "€25.00 EUR",
            image:
                "https://picsum.photos/400/400?random=3",
        },
    ];

    return (
        <Fragment>
            <div className="flex flex-wrap justify-center  mt-10">
                {
                    fallbackProducts.map((product) => {
                        return (
                            <div className="product-card m-5 relative w-[320px]  rounded-xl shadow-lg overflow-hidden group transition duration-300 border-1 border-black/20 hover:border-black/50" key={product.id}>
                                <div className="p-3 ">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full rounded-lg"
                                    />
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        From {product.price}
                                    </p>
                                </div>
                                <div
                                    className="
                                  absolute bottom-0 left-0 w-full
                                  translate-y-full
                                  bg-black text-white text-center py-3
                                  transition-all duration-300 ease-in-out
                                  group-hover:translate-y-0
                                   "
                                >
                                    Add to Cart
                                </div>

                            </div>
                        )
                    })
                }
            </div>

        </Fragment>
    );
};

export default ProductCard;
