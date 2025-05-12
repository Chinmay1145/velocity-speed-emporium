
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  // Get similar products - same category or brand
  const similarProducts = products.filter((p) => 
    p.id !== id && (p.category === product?.category || p.brand === product?.brand)
  ).slice(0, 4);
  
  // Format price
  const formattedPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };
  
  // Handle quantity change
  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  
  // Add to cart
  const handleAddToCart = () => {
    if (product && product.inStock) {
      addItem(product, quantity, selectedColor);
    }
  };
  
  if (!product) {
    return <div className="container py-20 text-center">Product not found</div>;
  }
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <main className="container py-12 px-4 md:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <ol className="flex gap-2">
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>/</li>
          <li>
            <button onClick={() => navigate("/products")}>Bikes</button>
          </li>
          <li>/</li>
          <li>{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-background">
          {product.featured && (
            <Badge className="absolute top-4 right-4 z-10 bg-primary">
              Featured
            </Badge>
          )}
          
          {product.discount && (
            <Badge className="absolute top-4 left-4 z-10 bg-destructive">
              {product.discount}% OFF
            </Badge>
          )}
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover aspect-[4/3]"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-1">
              {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)} | {product.engineCapacity} Engine
            </p>
          </div>
          
          <div className="flex items-baseline gap-2">
            {product.discount ? (
              <>
                <span className="text-2xl font-semibold text-primary">
                  {formattedPrice(Math.round(discountedPrice))}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formattedPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">
                {formattedPrice(product.price)}
              </span>
            )}
            
            <Badge 
              variant={product.inStock ? "outline" : "secondary"} 
              className="ml-4"
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <RadioGroup 
                value={selectedColor} 
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-2">
            <Button 
              className="flex-1 gap-2" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-semibold">Engine</p>
              <p className="text-sm text-muted-foreground">{product.engineCapacity}</p>
            </div>
            <div>
              <p className="font-semibold">Power</p>
              <p className="text-sm text-muted-foreground">{product.power}</p>
            </div>
            <div>
              <p className="font-semibold">Top Speed</p>
              <p className="text-sm text-muted-foreground">{product.topSpeed}</p>
            </div>
            <div>
              <p className="font-semibold">Weight</p>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="animate-fade-in">
            <div className="prose max-w-none dark:prose-invert">
              <h3>About {product.name}</h3>
              <p>
                The {product.name} is a premium motorcycle with exceptional performance and handling. 
                Designed for riders who expect the best, it combines cutting-edge technology with 
                stunning design and robust engineering.
              </p>
              <p>
                With its powerful {product.engineCapacity} engine producing {product.power} of raw power, 
                this bike delivers an exhilarating ride experience whether on the track or open roads. 
                The advanced electronics package ensures optimal control and safety in all conditions.
              </p>
              <h4>Key Features</h4>
              <ul>
                <li>Advanced aerodynamic design for optimal performance</li>
                <li>Premium suspension system for smooth handling</li>
                <li>State-of-the-art braking system for maximum safety</li>
                <li>Digital instrument cluster with smartphone connectivity</li>
                <li>Multiple riding modes to suit different conditions</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Engine & Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Engine</span>
                    <span>{product.engineCapacity}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Power</span>
                    <span>{product.power}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Top Speed</span>
                    <span>{product.topSpeed}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Transmission</span>
                    <span>6-Speed</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Fuel System</span>
                    <span>Electronic Fuel Injection</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dimensions & Chassis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Kerb Weight</span>
                    <span>{product.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Fuel Capacity</span>
                    <span>17 Litres</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Seat Height</span>
                    <span>820 mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Ground Clearance</span>
                    <span>135 mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Wheelbase</span>
                    <span>1430 mm</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="animate-fade-in">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to review this product
              </p>
              <Button>Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Similar Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
