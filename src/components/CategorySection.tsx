
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export default function CategorySection() {
  const categoryImages = {
    sport: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    adventure: "https://images.unsplash.com/photo-1635073943212-f4b8b7f5e2a7?q=80&w=2070&auto=format&fit=crop",
    cruiser: "https://images.unsplash.com/photo-1616711242200-163e0e9efc8b?q=80&w=2080&auto=format&fit=crop",
    naked: "https://images.unsplash.com/photo-1635073943212-f4b8b7f5e2a7?q=80&w=2070&auto=format&fit=crop",
    touring: "https://images.unsplash.com/photo-1562166453-44d756e11659?q=80&w=2070&auto=format&fit=crop",
    offroad: "https://images.unsplash.com/photo-1619771914272-e3c1a28a40a6?q=80&w=1932&auto=format&fit=crop",
  };

  return (
    <section className="py-16 px-4 md:px-6 container">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
        <p className="text-muted-foreground mt-2">Find your perfect ride by category</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className="group relative rounded-lg overflow-hidden h-48 animate-zoom-in"
          >
            {/* Background image */}
            <img
              src={categoryImages[category.id as keyof typeof categoryImages]}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h3 className="text-xl font-semibold text-white text-center">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
