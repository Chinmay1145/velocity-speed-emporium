
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import BrandSection from "@/components/BrandSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <main>
      <HeroSection />
      
      <FeaturedProducts />
      
      <section className="py-16 px-4 md:px-6 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg animate-slide-up">
            <h3 className="text-xl font-bold mb-2">Free Shipping Nationwide</h3>
            <p className="mb-4 text-muted-foreground">
              Enjoy free delivery on all orders above ₹50,000, anywhere in India. Our experienced team ensures your superbike arrives in perfect condition.
            </p>
            <Link to="/shipping">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
          
          <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg animate-slide-up delay-100">
            <h3 className="text-xl font-bold mb-2">Expert Customer Support</h3>
            <p className="mb-4 text-muted-foreground">
              Our motorcycle experts are available 7 days a week to help with your purchase decision and answer any technical questions.
            </p>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <CategorySection />
      
      <BrandSection />
      
      <section className="py-16 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience the Thrill?</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Browse our extensive collection of premium superbikes and find your perfect ride today.
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-md">Shop All Bikes</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
