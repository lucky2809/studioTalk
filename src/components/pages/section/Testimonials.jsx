const reviews = [
  {
    name: "Amit Sharma",
    text: "Beautiful artwork! Looks amazing in my living room.",
  },
  {
    name: "Priya Verma",
    text: "High quality and truly unique paintings.",
  },
  {
    name: "Rahul Singh",
    text: "Fast delivery and great service!",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-12">What Clients Say</h2>

      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-16">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-black rounded-2xl shadow"
          >
            <p className="mb-4">“{r.text}”</p>
            <h4 className="font-semibold">{r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Testimonials