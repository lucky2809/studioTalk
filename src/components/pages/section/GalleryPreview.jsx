const images = [
  "/images/art1.jpg",
  "/images/art2.jpg",
  "/images/art3.jpg",
  "/images/art4.jpg",
  "/images/art5.jpg",
  "/images/art6.jpg",
];

function GalleryPreview() {
  return (
    <section className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Art Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <img
              src={img}
              alt="Artwork"
              className="w-full h-60 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export default GalleryPreview