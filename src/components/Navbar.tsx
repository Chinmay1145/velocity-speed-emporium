
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "@/lib/CartContext";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link 
    to={to} 
    className="text-foreground hover:text-primary transition-colors" 
    onClick={onClick}
  >
    {children}
  </Link>
);

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="text-xl font-bold text-primary">SuperBikesIndia</Link>
        </div>

        <nav className={`${showMobileMenu ? 'absolute left-0 top-16 w-full bg-background p-4 border-b shadow-lg md:static md:shadow-none md:border-none animate-fade-in' : 'hidden'} md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row items-center gap-6">
            <li>
              <NavLink to="/" onClick={() => setShowMobileMenu(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={() => setShowMobileMenu(false)}>Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setShowMobileMenu(false)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setShowMobileMenu(false)}>Contact</NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {showSearch ? (
            <div className="relative animate-fade-in">
              <Input 
                type="search" 
                placeholder="Search bikes..." 
                className="h-9 w-[200px] md:w-[300px] rounded-full"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.5rem]">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <CartSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, totalAmount } = useCart();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <Button variant="ghost" size="sm" onClick={clearCart} disabled={items.length === 0}>
          Clear Cart
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-8">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <Link to="/products">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="flex-1 overflow-auto py-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.color}`} className="flex gap-4 py-3 border-b">
              <div className="w-20 h-20">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => removeItem(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
