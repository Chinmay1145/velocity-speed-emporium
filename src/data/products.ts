
import { Product, Category, Brand } from "@/lib/types";

export const categories: Category[] = [
  { id: "sport", name: "Sport" },
  { id: "adventure", name: "Adventure" },
  { id: "cruiser", name: "Cruiser" },
  { id: "naked", name: "Naked" },
  { id: "touring", name: "Touring" },
  { id: "offroad", name: "Off-Road" },
];

export const brands: Brand[] = [
  { id: "kawasaki", name: "Kawasaki" },
  { id: "honda", name: "Honda" },
  { id: "yamaha", name: "Yamaha" },
  { id: "suzuki", name: "Suzuki" },
  { id: "ducati", name: "Ducati" },
  { id: "bmw", name: "BMW" },
  { id: "ktm", name: "KTM" },
  { id: "triumph", name: "Triumph" },
  { id: "harley", name: "Harley-Davidson" },
  { id: "royalenfield", name: "Royal Enfield" },
  { id: "tvs", name: "TVS" },
  { id: "bajaj", name: "Bajaj" },
];

// Generate 70+ products
const generateProducts = (): Product[] => {
  const products: Product[] = [
    {
      id: "ninja-zx10r",
      name: "Kawasaki Ninja ZX-10R",
      description: "The ultimate superbike with race-winning performance. Features cutting-edge technology derived from Kawasaki's racing program.",
      price: 1599000,
      image: "https://images.unsplash.com/photo-1564249140364-202fd80b5876?q=80&w=1000&auto=format&fit=crop",
      brand: "kawasaki",
      category: "sport",
      engineCapacity: "998 cc",
      power: "203 PS",
      topSpeed: "299 km/h",
      weight: "207 kg",
      colors: ["Green", "Black", "Blue"],
      inStock: true,
      featured: true
    },
    {
      id: "bmw-s1000rr",
      name: "BMW S1000RR",
      description: "German engineering at its finest. The S1000RR delivers incredible performance with sophisticated electronics and handling.",
      price: 2195000,
      image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=2070&auto=format&fit=crop",
      brand: "bmw",
      category: "sport",
      engineCapacity: "999 cc",
      power: "207 PS",
      topSpeed: "305 km/h",
      weight: "197 kg",
      colors: ["White/Blue/Red", "Black", "Racing Red"],
      inStock: true,
      featured: true
    },
    {
      id: "ducati-panigale-v4",
      name: "Ducati Panigale V4",
      description: "Italian masterpiece with the soul of MotoGP. The V4 engine produces incredible power with a sound to match.",
      price: 2650000,
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
      brand: "ducati",
      category: "sport",
      engineCapacity: "1103 cc",
      power: "214 PS",
      topSpeed: "308 km/h",
      weight: "198 kg",
      colors: ["Ducati Red", "Winter Test", "Anniversary"],
      inStock: true,
      featured: true
    },
    {
      id: "yamaha-r1",
      name: "Yamaha YZF-R1",
      description: "Legendary superbike with crossplane technology. Precision engineering for ultimate track performance.",
      price: 2050000,
      image: "https://images.unsplash.com/photo-1615172282427-9a39c7a732b8?q=80&w=2071&auto=format&fit=crop",
      brand: "yamaha",
      category: "sport",
      engineCapacity: "998 cc",
      power: "200 PS",
      topSpeed: "299 km/h",
      weight: "201 kg",
      colors: ["Team Blue", "Black", "Anniversary"],
      inStock: true,
      featured: true
    },
    {
      id: "royal-enfield-classic-350",
      name: "Royal Enfield Classic 350",
      description: "The legacy continues with modern engineering. Authentic vintage styling with reliable performance.",
      price: 193000,
      image: "https://images.unsplash.com/photo-1559074544-0a44b5c09a66?q=80&w=2070&auto=format&fit=crop",
      brand: "royalenfield",
      category: "cruiser",
      engineCapacity: "349 cc",
      power: "20.2 bhp",
      topSpeed: "120 km/h",
      weight: "195 kg",
      colors: ["Chrome Bronze", "Stealth Black", "Signals"],
      inStock: true,
      discount: 5
    },
    {
      id: "ktm-390-duke",
      name: "KTM 390 Duke",
      description: "The Corner Rocket that delivers pure performance with aggressive styling.",
      price: 299000,
      image: "https://images.unsplash.com/photo-1614260112500-66c4c1db2a25?q=80&w=1674&auto=format&fit=crop",
      brand: "ktm",
      category: "naked",
      engineCapacity: "373 cc",
      power: "43.5 PS",
      topSpeed: "167 km/h",
      weight: "163 kg",
      colors: ["Orange", "White", "Black"],
      inStock: true
    }
  ];
  
  // Generate additional products to reach 70+ total
  const additionalProducts: Product[] = [
    // Kawasaki models
    {
      id: "kawasaki-ninja-300",
      name: "Kawasaki Ninja 300",
      description: "Entry-level sport bike with impressive performance and reliability.",
      price: 324000,
      image: "https://images.unsplash.com/photo-1571646750134-0d76cc63f8c3?q=80&w=1935&auto=format&fit=crop",
      brand: "kawasaki",
      category: "sport",
      engineCapacity: "296 cc",
      power: "39 PS",
      topSpeed: "180 km/h",
      weight: "172 kg",
      colors: ["Green", "Black"],
      inStock: true
    },
    {
      id: "kawasaki-z900",
      name: "Kawasaki Z900",
      description: "Aggressive naked bike with excellent performance and handling.",
      price: 835000,
      image: "https://images.unsplash.com/photo-1635073943212-f4b8b7f5e2a7?q=80&w=2070&auto=format&fit=crop",
      brand: "kawasaki",
      category: "naked",
      engineCapacity: "948 cc",
      power: "125 PS",
      topSpeed: "245 km/h",
      weight: "212 kg",
      colors: ["Green/Black", "Black", "Grey/Green"],
      inStock: true
    },
    {
      id: "kawasaki-versys-650",
      name: "Kawasaki Versys 650",
      description: "Adventure-touring bike with comfortable ergonomics for long rides.",
      price: 730000,
      image: "https://images.unsplash.com/photo-1637668413478-9a4b56272954?q=80&w=2070&auto=format&fit=crop",
      brand: "kawasaki",
      category: "adventure",
      engineCapacity: "649 cc",
      power: "66 PS",
      topSpeed: "210 km/h",
      weight: "216 kg",
      colors: ["Green", "Black"],
      inStock: true
    },
    
    // Honda models
    {
      id: "honda-cbr1000rr-r",
      name: "Honda CBR1000RR-R Fireblade",
      description: "MotoGP technology for the road with precision engineering.",
      price: 2350000,
      image: "https://images.unsplash.com/photo-1552001948-a6a0bfa85a8c?q=80&w=2070&auto=format&fit=crop",
      brand: "honda",
      category: "sport",
      engineCapacity: "1000 cc",
      power: "217 PS",
      topSpeed: "299 km/h",
      weight: "201 kg",
      colors: ["Grand Prix Red", "Black"],
      inStock: true
    },
    {
      id: "honda-cb650r",
      name: "Honda CB650R",
      description: "Neo-Sports Café styling with a smooth inline-four engine.",
      price: 870000,
      image: "https://images.unsplash.com/photo-1608831540955-35094d48694a?q=80&w=2076&auto=format&fit=crop",
      brand: "honda",
      category: "naked",
      engineCapacity: "649 cc",
      power: "95 PS",
      topSpeed: "225 km/h",
      weight: "202 kg",
      colors: ["Candy Chromosphere Red", "Mat Jeans Blue Metallic", "Graphite Black"],
      inStock: true
    }
  ];

  // Add remaining products to reach 70+ total
  const moreProducts: Product[] = [];
  
  // We'll generate variations and additional models to reach 70+ products
  for (let i = 1; i <= 65; i++) {
    const baseBikeIndex = i % 6; // Use our 6 base bikes as templates
    const baseBike = products[baseBikeIndex];
    
    // Determine brand and category with some variation
    const brandIndex = i % brands.length;
    const categoryIndex = i % categories.length;
    
    moreProducts.push({
      id: `bike-${i + 10}`,
      name: `${brands[brandIndex].name} ${["XR", "GP", "Street", "Thunder", "Lightning", "Cruise"][i % 6]} ${100 + i * 10}`,
      description: `High-performance ${categories[categoryIndex].name.toLowerCase()} bike with advanced technology and exceptional handling.`,
      price: 200000 + (i * 25000), // Prices range from 200,000 to 1,825,000 INR
      image: baseBike.image, // Reuse images from base bikes
      brand: brands[brandIndex].id,
      category: categories[categoryIndex].id,
      engineCapacity: `${300 + i * 50} cc`,
      power: `${50 + i * 5} PS`,
      topSpeed: `${150 + i * 5} km/h`,
      weight: `${150 + i * 2} kg`,
      colors: ["Red", "Black", "Blue", "White", "Silver", "Green"].slice(0, 3 + (i % 4)),
      inStock: i % 10 !== 0, // 10% of bikes out of stock
      featured: i % 20 === 0, // 5% of bikes are featured
      discount: i % 8 === 0 ? 10 : undefined // Some bikes have discounts
    });
  }
  
  return [...products, ...additionalProducts, ...moreProducts];
};

export const products = generateProducts();
