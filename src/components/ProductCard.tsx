
import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="product-card group relative animate-fade-in">
      <div className="product-image-container">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>
        
        {product.featured && (
          <Badge variant="default" className="absolute top-2 right-2 bg-primary">
            Featured
          </Badge>
        )}
        
        {product.discount && (
          <Badge variant="default" className="absolute top-2 left-2 bg-destructive">
            {product.discount}% OFF
          </Badge>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="outline" className="text-lg border-2">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</p>
          </div>
          <div className="text-right">
            {product.discount ? (
              <div>
                <span className="text-sm line-through text-muted-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                <p className="font-medium text-primary">₹{Math.round(discountedPrice).toLocaleString('en-IN')}</p>
              </div>
            ) : (
              <p className="font-medium">₹{product.price.toLocaleString('en-IN')}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <Link to={`/products/${product.id}`} className="text-sm font-medium hover:text-primary transition-colors">
            View Details
          </Link>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 gap-1"
            disabled={!product.inStock}
            onClick={() => product.inStock && addItem(product, 1, product.colors[0])}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
