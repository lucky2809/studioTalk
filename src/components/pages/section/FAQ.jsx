const faqs = [
  {
    q: "Are paintings original?",
    a: "Yes, all paintings are 100% handmade and original.",
  },
  {
    q: "Do you offer custom artwork?",
    a: "Yes, you can request custom paintings.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, worldwide shipping is available.",
  },
];

function FAQ() {
  return (
    <section className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((f, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg">{f.q}</h3>
            <p className="text-gray-600 dark:text-gray-400">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FAQ