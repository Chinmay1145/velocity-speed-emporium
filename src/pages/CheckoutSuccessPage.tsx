
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(() => {
    return `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  });
  
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <main className="container py-20 px-4 max-w-3xl mx-auto text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been placed successfully. We have sent a confirmation email with all the details.
      </p>
      
      <div className="bg-card border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Order Number:</span>
          <span className="font-medium">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Order Date:</span>
          <span className="font-medium">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      
      <div className="mt-10">
        <p className="text-muted-foreground">
          You will be redirected to the home page in {countdown} seconds
        </p>
      </div>
    </main>
  );
}
