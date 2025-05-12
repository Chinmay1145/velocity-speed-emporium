
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { brands, categories, products } from "@/data/products";
import { Product, SortOption } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Filter, ArrowDownUp, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useState(new URLSearchParams(location.search));
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [sortOption, setSortOption] = useState<SortOption>("price-low-high");
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
  }, [searchParams]);
  
  // Apply filters and sort
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((product) => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }
    
    // Apply price filter
    result = result.filter((product) => {
      const price = product.discount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        // For demo purposes, just shuffle them
        result.sort(() => 0.5 - Math.random());
        break;
      case "popular":
        // For demo purposes, featured and discounted first then rest
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.discount && !b.discount) return -1;
          if (!a.discount && b.discount) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortOption]);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 3000000]);
    setSortOption("price-low-high");
    navigate("/products");
  };
  
  return (
    <main className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="flex md:hidden justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Filters sidebar - desktop always visible, mobile conditionally */}
        <div 
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 lg:w-72 flex-shrink-0 animate-fade-in`}
        >
          <div className="bg-card rounded-lg p-4 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-sm h-8"
              >
                Reset All
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-1">
                  <Input 
                    id="search"
                    type="text"
                    placeholder="Search bikes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Separator />
              
              {/* Categories */}
              <Accordion type="single" collapsible defaultValue="categories">
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <Label 
                            htmlFor={`category-${category.id}`}
                            className="flex-1 cursor-pointer"
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator />
              
              {/* Brands */}
              <Accordion type="single" collapsible defaultValue="brands">
                <AccordionItem value="brands">
                  <AccordionTrigger>Brands</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div key={brand.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.id)}
                            onCheckedChange={() => handleBrandChange(brand.id)}
                          />
                          <Label 
                            htmlFor={`brand-${brand.id}`}
                            className="flex-1 cursor-pointer"
                          >
                            {brand.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator />
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="pt-4 pb-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={3000000}
                    step={50000}
                    onValueChange={handlePriceChange}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">₹{priceRange[0].toLocaleString('en-IN')}</span>
                  <span className="text-sm">₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          {/* Desktop sort controls */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">All Bikes</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
