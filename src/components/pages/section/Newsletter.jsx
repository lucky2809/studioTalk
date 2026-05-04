function Newsletter() {
  return (
    <section className="py-20 text-center bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">
        Stay Inspired 🎨
      </h2>
      <p className="mb-6">
        Get updates about new paintings and offers
      </p>

      <div className="flex justify-center gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-l-xl text-black w-64"
        />
        <button className="px-6 py-3 bg-pink-500 rounded-r-xl">
          Subscribe
        </button>
      </div>
    </section>
  );
}
export default Newsletter