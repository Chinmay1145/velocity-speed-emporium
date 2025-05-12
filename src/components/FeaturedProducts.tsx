
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter(product => product.featured || product.discount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsToShow = 4;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (featuredProducts.length - productsToShow + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredProducts.length - productsToShow : prevIndex - 1));
  };
  
  return (
    <section className="py-16 px-4 md:px-6 container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Featured Bikes</h2>
          <p className="text-muted-foreground mt-2">Explore our handpicked collection of premium bikes</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            disabled={currentIndex >= featuredProducts.length - productsToShow}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[25%] sm:min-w-[50%] lg:min-w-[25%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
