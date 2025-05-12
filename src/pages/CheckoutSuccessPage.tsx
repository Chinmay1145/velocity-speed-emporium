
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => {
    return `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  });
  
  const [countdown, setCountdown] = useState(10);
  
  // Launch confetti effect when the page loads
  useEffect(() => {
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    
    launchConfetti();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  return (
    <main className="container py-20 px-4 max-w-3xl mx-auto text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
      <p className="text-xl mb-2 text-primary">Your purchase was successful</p>
      <p className="text-muted-foreground mb-8">
        We have sent a confirmation email with all the details.
      </p>
      
      <div className="bg-card border rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Order Number:</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Order Date:</span>
            <span>{new Date().toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Estimated Delivery:</span>
            <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h3 className="text-lg font-medium mb-4">Track Your Order</h3>
        <div className="flex justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm">Confirmed</span>
          </div>
          <div className="h-0.5 bg-primary flex-grow self-center"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-2">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-sm">Processing</span>
          </div>
          <div className="h-0.5 bg-muted flex-grow self-center"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-2">
              <Truck className="h-5 w-5" />
            </div>
            <span className="text-sm">Shipped</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <Link to="/products">
          <Button className="hover-scale">Continue Shopping</Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="hover-scale">Back to Home</Button>
        </Link>
      </div>
      
      <div className="mt-6">
        <p className="text-muted-foreground">
          You will be redirected to the home page in <span className="font-semibold">{countdown}</span> seconds
        </p>
      </div>
    </main>
  );
}
