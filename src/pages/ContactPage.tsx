
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setLoading(false);
    }, 1500);
  };
  
  return (
    <main className="animate-fade-in">
      <section className="relative bg-black text-white py-20 mb-12">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1604480132736-44c188fe4d20?q=80&w=2070&auto=format&fit=crop"
            alt="Motorcycle workshop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="container relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-200">
            Have questions about our motorcycles? We're here to help you find the perfect bike.
          </p>
        </div>
      </section>
      
      <section className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Mumbai Flagship</h3>
                <address className="text-muted-foreground space-y-2 not-italic">
                  <p>123 Bike Street, Bandra West</p>
                  <p>Mumbai, Maharashtra 400050</p>
                  <p className="pt-2">Phone: +91 22 1234 5678</p>
                  <p>Email: mumbai@superbikeindia.com</p>
                </address>
                <div className="mt-4">
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 10:00 - 19:00</p>
                  <p className="text-muted-foreground">Sun: 11:00 - 17:00</p>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Delhi Showroom</h3>
                <address className="text-muted-foreground space-y-2 not-italic">
                  <p>456 Moto Avenue, Connaught Place</p>
                  <p>New Delhi, Delhi 110001</p>
                  <p className="pt-2">Phone: +91 11 9876 5432</p>
                  <p>Email: delhi@superbikeindia.com</p>
                </address>
                <div className="mt-4">
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 10:00 - 19:00</p>
                  <p className="text-muted-foreground">Sun: 11:00 - 17:00</p>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Bangalore Showroom</h3>
                <address className="text-muted-foreground space-y-2 not-italic">
                  <p>789 Race Road, Indiranagar</p>
                  <p>Bangalore, Karnataka 560038</p>
                  <p className="pt-2">Phone: +91 80 2345 6789</p>
                  <p>Email: bangalore@superbikeindia.com</p>
                </address>
                <div className="mt-4">
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 10:00 - 19:00</p>
                  <p className="text-muted-foreground">Sun: 11:00 - 17:00</p>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Pune Showroom</h3>
                <address className="text-muted-foreground space-y-2 not-italic">
                  <p>321 Engine Street, Koregaon Park</p>
                  <p>Pune, Maharashtra 411001</p>
                  <p className="pt-2">Phone: +91 20 8765 4321</p>
                  <p>Email: pune@superbikeindia.com</p>
                </address>
                <div className="mt-4">
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 10:00 - 19:00</p>
                  <p className="text-muted-foreground">Sun: 11:00 - 17:00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Customer Service</h2>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">General Inquiries</h3>
                    <p className="text-muted-foreground">info@superbikeindia.com</p>
                    <p className="text-muted-foreground">+91 22 1234 5678</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Sales Department</h3>
                    <p className="text-muted-foreground">sales@superbikeindia.com</p>
                    <p className="text-muted-foreground">+91 22 1234 5680</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Service & Support</h3>
                    <p className="text-muted-foreground">service@superbikeindia.com</p>
                    <p className="text-muted-foreground">+91 22 1234 5682</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map placeholder */}
      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="aspect-[16/9] max-h-[500px] bg-muted rounded-lg overflow-hidden">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
