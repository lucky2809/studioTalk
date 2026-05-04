import { useNavigate } from "react-router-dom";
import Navbar from "../navComp/Navbar";
import Categories from "./section/Categories";
import CursorEffect from "./section/CursorEffect";
import DarkModeToggle from "./section/DarkModeToggle";
import FAQ from "./section/FAQ";
import GalleryPreview from "./section/GalleryPreview";
import Newsletter from "./section/Newsletter";
import Testimonials from "./section/Testimonials";

export default function Home() {

  const navigate = useNavigate()
  return (
    <div className="dark:bg-black dark:text-white font-sans">

      {/* Cursor Effect */}
      <CursorEffect />

      {/* Navbar */}
      {/* <nav className="flex justify-between items-center px-8 py-4 fixed w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur">
        <h1 className="text-2xl font-bold tracking-wide">StudioDTalk</h1>
        <div className="flex gap-6 items-center">
          <a href="#" className="hover:text-pink-500">Home</a>
          <a href="#" className="hover:text-pink-500">Gallery</a>
          <a href="#" className="hover:text-pink-500">About</a>
          <a href="#" className="hover:text-pink-500">Contact</a>
          <DarkModeToggle />
        </div>
      </nav> */}
      <Navbar/>

      {/* HERO SECTION */}
      <section className="relative mt-44 h-[65vh] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src="fieldofwildflowers.png"
          alt="StudioDTalk Art"
          className="absolute w-full h-full object-cover animate-zoom"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-6">
            Original Handmade Paintings
          </h1>
          <p className="text-lg text-white mb-8">
            Discover unique art that brings emotion to your space
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate("/illustration")} className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:scale-105 transition">
              Explore Gallery
            </button>
            <button onClick={() => navigate("/shop")} className="px-6 py-3 text-white border border-white rounded-xl hover:bg-white hover:text-black transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED ARTWORK */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Paintings
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["art1.jpg", "art2.jpg", "art3.jpg"].map((img, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={`/images/${img}`}
                alt="Painting"
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Artwork {i + 1}</h3>
                <p className="text-gray-500 dark:text-gray-400">₹5000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6">About StudioDTalk</h2>
        <p className="max-w-2xl mx-auto text-lg">
          StudioDTalk is a creative space where art meets emotion. Each painting
          is handcrafted with passion, telling a unique story through colors and
          textures.
        </p>
      </section>

      {/* PAINTING OF THE DAY */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">🎨 Painting of the Day</h2>
        <img
          src="/images/art1.jpg"
          alt="Painting of the Day"
          className="mx-auto w-80 rounded-2xl shadow-lg hover:scale-105 transition"
        />
        <h3 className="mt-4 text-xl">Golden Dreams</h3>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 md:px-16 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>🎨 100% Original Art</div>
          <div>🖌 Handmade Paintings</div>
          <div>🚚 Fast Shipping</div>
          <div>✨ Custom Orders</div>
        </div>
      </section>


      <Categories />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <Newsletter />

      {/* CTA */}
      <section className="py-20 text-center bg-black text-white">
        <h2 className="text-4xl font-bold mb-6">
          Bring Art Into Your Life
        </h2>
        <button className="px-8 py-4 bg-pink-500 rounded-xl hover:scale-105 transition">
          Shop Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center bg-gray-200 dark:bg-gray-800">
        <p>© 2026 StudioDTalk. All Rights Reserved.</p>
      </footer>
    </div>
  );
}