
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.postalCode) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        toast.error("Please fill in all payment details");
        return;
      }
    }
    
    // Simulate payment processing
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate("/checkout/success");
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to your cart to checkout</p>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </div>
    );
  }
  
  return (
    <main className="container py-12 px-4 md:px-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
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
                  <Label htmlFor="phone">Phone *</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea 
                    id="address"
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleSelectChange("state", value)}
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="punjab">Punjab</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="west-bengal">West Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input 
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit / Debit Card</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="net-banking">Net Banking</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
                
                {formData.paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input 
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV *</Label>
                        <Input 
                          id="cardCvv"
                          name="cardCvv"
                          type="password"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 lg:hidden">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : `Place Order - ₹${totalAmount.toLocaleString('en-IN')}`}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-[300px] overflow-y-auto mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.color}`} className="flex gap-3 py-2 border-b">
                  <div className="w-16 h-16">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Color: {item.color} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      ₹{((item.product.discount 
                        ? item.product.price * (1 - item.product.discount / 100) 
                        : item.product.price) * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 py-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 18%)</span>
                <span>₹{Math.round(totalAmount * 0.18).toLocaleString('en-IN')}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{Math.round(totalAmount * 1.18).toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="mt-6 hidden lg:block">
              <Button 
                onClick={handleSubmit} 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
