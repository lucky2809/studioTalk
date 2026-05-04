const categories = [
  { name: "Abstract", img: "/images/cat1.jpg" },
  { name: "Portrait", img: "/images/cat2.jpg" },
  { name: "Nature", img: "/images/cat3.jpg" },
  { name: "Modern", img: "/images/cat4.jpg" },
];

function Categories() {
  return (
    <section className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Explore Categories
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative group rounded-2xl overflow-hidden cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Categories