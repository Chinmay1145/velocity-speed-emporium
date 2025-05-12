
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import {
  CreditCard,
  Building,
  Wallet,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema validation
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(1, "Please select a state"),
  postalCode: z.string().min(6, "Postal code must be at least 6 digits"),
  paymentMethod: z.string(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  saveInfo: z.boolean().optional(),
  termAccepted: z.boolean().default(false).refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  
  // Initialize form with react-hook-form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      paymentMethod: "credit-card",
      saveInfo: false,
      termAccepted: false,
    },
  });
  
  const handleSubmit = (data: CheckoutFormValues) => {
    // Validate payment details if credit card is selected
    if (data.paymentMethod === "credit-card") {
      if (!data.cardNumber || !data.cardExpiry || !data.cardCvv) {
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
  
  // Calculate shipping cost based on delivery method
  const shippingCost = deliveryMethod === "express" ? 200 : 0;
  const taxAmount = Math.round(totalAmount * 0.18);
  const finalTotal = totalAmount + shippingCost + taxAmount;
  
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
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-8">Complete your purchase by providing the details below</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold">1</span>
                  </div>
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold">2</span>
                  </div>
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <Select 
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                            </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <p className="font-medium mb-3">Delivery Options</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          deliveryMethod === "standard" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setDeliveryMethod("standard")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-muted-foreground">7-10 business days</p>
                            </div>
                          </div>
                          <p className="font-medium">Free</p>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          deliveryMethod === "express" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setDeliveryMethod("express")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                          </div>
                          <p className="font-medium">₹200</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="saveInfo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Save this information for next time
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold">3</span>
                  </div>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            field.value === "credit-card" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => form.setValue("paymentMethod", "credit-card")}
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            field.value === "upi" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => form.setValue("paymentMethod", "upi")}
                        >
                          <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5" />
                            <div>
                              <p className="font-medium">UPI Payment</p>
                              <p className="text-sm text-muted-foreground">Google Pay, PhonePe, BHIM</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            field.value === "net-banking" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => form.setValue("paymentMethod", "net-banking")}
                        >
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Net Banking</p>
                              <p className="text-sm text-muted-foreground">All major banks supported</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            field.value === "cod" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => form.setValue("paymentMethod", "cod")}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">Pay when you receive</p>
                            </div>
                          </div>
                        </div>
                      </div>
                        
                      {field.value === "credit-card" && (
                        <div className="space-y-4 mt-4">
                          <Input
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            onChange={(e) => form.setValue("cardNumber", e.target.value)}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              name="cardExpiry"
                              placeholder="MM/YY"
                              onChange={(e) => form.setValue("cardExpiry", e.target.value)}
                            />
                            <Input
                              name="cardCvv"
                              type="password"
                              maxLength={4}
                              placeholder="CVV"
                              onChange={(e) => form.setValue("cardCvv", e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                      
                      {field.value === "upi" && (
                        <div className="space-y-4 mt-4">
                          <Input
                            placeholder="Enter UPI ID (example@ybl)"
                          />
                        </div>
                      )}
                      
                      {field.value === "net-banking" && (
                        <div className="space-y-4 mt-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sbi">State Bank of India</SelectItem>
                              <SelectItem value="hdfc">HDFC Bank</SelectItem>
                              <SelectItem value="icici">ICICI Bank</SelectItem>
                              <SelectItem value="axis">Axis Bank</SelectItem>
                              <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                
                <div className="mt-6">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Your payment information is processed securely. We do not store credit card details.
                    </p>
                  </div>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="termAccepted"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 lg:hidden">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : `Place Order - ₹${finalTotal.toLocaleString('en-IN')}`}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-lg border p-6 sticky top-20 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-[300px] overflow-y-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.color}`} className="flex gap-3 py-3 border-b">
                  <div className="w-16 h-16">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{item.product.name}</p>
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
            
            <div className="space-y-3 py-4 border-t border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost > 0 ? `₹${shippingCost.toLocaleString('en-IN')}` : 'Free'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 18%)</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="flex justify-between py-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="mt-6 hidden lg:block">
              <Button 
                onClick={form.handleSubmit(handleSubmit)} 
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
