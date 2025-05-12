
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop"
          alt="Superbike racing"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Experience the Ultimate <span className="text-primary">Superbike</span> Performance
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Discover premium motorcycles from the world's leading manufacturers.
            Built for speed, designed for precision, engineered for excellence.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/products">
              <Button size="lg" className="rounded-md">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-md">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated highlight elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute -bottom-4 right-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -top-4 right-1/3 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
    </section>
  );
}
