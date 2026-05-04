import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recent, setRecent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const cache = useRef({});
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // 🕘 Load recent
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  // 💾 Save recent
  const saveRecent = (item) => {
    const updated = [item, ...recent.filter((r) => r !== item)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // 🔎 Fetch results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (cache.current[query]) {
      setResults(cache.current[query]);
      setShowDropdown(true);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products?search=${query}`
        );
        const data = await res.json();

        cache.current[query] = data;
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // 🔄 reset index on query change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // ✅ select product
  const handleSelect = (item) => {
    setQuery(item.title);
    setShowDropdown(false);
    saveRecent(item.title);
    navigate(`/product/${item._id}`);
  };

  // ✅ enter search
  const handleEnter = () => {
    if (!query.trim()) return;

    navigate(`/products?search=${query}`);
    setShowDropdown(false);
    saveRecent(query);
  };

  // ⌨️ keyboard control (🔥 FINAL)
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    const list = query ? results : recent;

    if (!list.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < list.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : list.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0) {
        if (query) {
          handleSelect(list[activeIndex]); // product
        } else {
          const selected = list[activeIndex];
          setQuery(selected);
        }
      } else {
        handleEnter();
      }
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // ✨ highlight text
  const highlightText = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
  };

  return (
    <div className="relative w-full max-w-lg">
      {/* 🔍 Input */}
      <div className="flex items-center bg-white border rounded-full px-3 py-2 shadow-sm">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search artworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-2 outline-none"
        />
      </div>

      {/* 📦 Dropdown */}
      {showDropdown && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">

          {/* 🔍 RESULTS */}
          {query && results.length > 0 &&
            results.map((item, index) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                  activeIndex === index
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL.replace(
                    "/api",
                    ""
                  )}/uploads/${item.mainImage}`}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />

                <div className="flex flex-col">
                  <span
                    className="text-sm font-medium"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.title),
                    }}
                  />
                  <span className="text-xs text-gray-500">
                    in{" "}
                    <span className="text-blue-600 font-medium">
                      {item.category}
                    </span>
                  </span>
                </div>
              </div>
            ))}

          {/* ❌ No results */}
          {query && results.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No results found
            </div>
          )}

          {/* 🕘 RECENT */}
          {!query && recent.length > 0 && (
            <div className="p-3">
              <p className="text-xs text-gray-400 mb-2">
                Recent Searches
              </p>

              {recent.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setQuery(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`px-2 py-1 text-sm rounded cursor-pointer ${
                    activeIndex === index
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}