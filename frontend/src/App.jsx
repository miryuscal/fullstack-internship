import { useEffect, useState, useRef } from "react";
import Rating from "./components/Rating";
import productsData from "./products.json"; // ← JSON dosyasını içe aktarıyoruz
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [activeColors, setActiveColors] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    setProducts(productsData);
    const initialColors = {};
    productsData.forEach((_, idx) => {
      initialColors[idx] = "yellow";
    });
    setActiveColors(initialColors);
  }, []);

  const handleColorChange = (index, color) => {
    setActiveColors((prev) => ({ ...prev, [index]: color }));
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 font-sans relative">
      <h1
        className="text-5xl font-light tracking-tight text-center mb-14"
        style={{ fontFamily: "Avenir", fontWeight: 400 }}
      >
        Product List
      </h1>

      <div className="relative flex items-center max-w-screen-xl mx-auto">
        <button
          onClick={scrollLeft}
          className="text-2xl text-gray-600 hover:text-black bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-20 -ml-6"
        >
          &lt;
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto w-full"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex flex-row gap-10 px-10 pb-8">
            {products.map((product, index) => {
              const activeColor = activeColors[index] || "yellow";
              return (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[260px] max-w-[260px] bg-white rounded-3xl p-6 shadow-md"
                >
                  <div className="bg-gray-100 rounded-3xl p-4 w-full h-[200px] flex justify-center items-center">
                    <img
                      src={product.images[activeColor]}
                      alt={product.name}
                      className="w-[160px] h-[160px] object-cover rounded-[20px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/160x160/cccccc/333333?text=Image+Error";
                      }}
                    />
                  </div>

                  <h2
                    className="text-lg text-center mt-4"
                    style={{ fontFamily: "Avenir", fontWeight: 400 }}
                  >
                    {product.name}
                  </h2>

                  <p
                    className="text-base text-gray-700 text-center mt-1 mb-1"
                    style={{ fontFamily: "Avenir", fontWeight: 400 }}
                  >
                    {product.price ? product.price : "Loading..."}
                  </p>

                  <div className="flex justify-center mt-2 mb-2">
                    {Object.entries(product.images).map(([color]) => {
                      const bgStyle =
                        color === "yellow"
                          ? "#E6CA97"
                          : color === "white"
                          ? "#D9D9D9"
                          : "#E1A4A9";

                      return (
                        <button
                          key={color}
                          onClick={() => handleColorChange(index, color)}
                          className={`color-circle ${activeColor === color ? "active" : ""}`}
                          style={{ backgroundColor: bgStyle }}
                          aria-label={`Select ${color} color`}
                        />
                      );
                    })}
                  </div>

                  <p
                    className="text-xs text-gray-500 mb-2"
                    style={{ fontFamily: "Montserrat", fontWeight: 400 }}
                  >
                    {activeColor === "yellow"
                      ? "Yellow Gold"
                      : activeColor === "white"
                      ? "White Gold"
                      : "Rose Gold"}
                  </p>

                  <Rating value={product.popularityScore * 5} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="text-2xl text-gray-600 hover:text-black bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-20 -mr-6"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default App;
