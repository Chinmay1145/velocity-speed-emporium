
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="animate-fade-in">
      <section className="relative bg-black text-white py-20 mb-12">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1638618164682-12b986cc3faa?q=80&w=2070&auto=format&fit=crop"
            alt="Superbikes showroom"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="container relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-200">
            Discover the story behind SuperBikesIndia - India's premier destination for premium motorcycles.
          </p>
        </div>
      </section>
      
      <section className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2015, SuperBikesIndia has grown from a small motorcycle enthusiast club to one of India's leading superbike retailers. Our journey began with a single showroom in Mumbai, driven by our passion for high-performance motorcycles.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, we operate across major metropolitan cities in India, offering the widest selection of premium motorcycles from renowned international brands. Our team of motorcycle experts brings decades of collective experience in the industry.
            </p>
            <p className="text-muted-foreground">
              What sets us apart is our commitment to the riding community. Beyond selling motorcycles, we organize riding events, technical workshops, and track days to foster the growth of motorcycle culture in India.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1624633431700-6a37295c6812?q=80&w=2070&auto=format&fit=crop"
                alt="Superbikes showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl -z-10" />
          </div>
        </div>
      </section>
      
      <section className="bg-muted/50 py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At SuperBikesIndia, we're committed to providing an exceptional motorcycle buying experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p className="text-muted-foreground">
                We are authorized dealers for all the brands we carry, ensuring you get genuine motorcycles with valid warranties.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center animate-fade-in delay-100">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Our team of motorcycle enthusiasts provides knowledgeable advice to help you find the perfect bike.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center animate-fade-in delay-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Join our thriving community of riders for exclusive events, rides, and technical workshops.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="container px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate professionals behind SuperBikesIndia
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Rajiv Sharma",
              position: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
            },
            {
              name: "Priya Patel",
              position: "Head of Operations",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop"
            },
            {
              name: "Vikram Singh",
              position: "Technical Director",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2074&auto=format&fit=crop"
            },
            {
              name: "Anika Gupta",
              position: "Customer Experience",
              image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=2089&auto=format&fit=crop"
            }
          ].map((member, index) => (
            <div key={index} className="animate-fade-in text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto w-3/4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.position}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-black text-white py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Thrill?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of premium motorcycles or visit one of our showrooms to see these magnificent machines in person.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button variant="default" size="lg">
                Shop Bikes
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
