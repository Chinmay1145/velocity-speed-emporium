
import { brands } from "@/data/products";

const brandLogos = {
  kawasaki: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Kawasaki_logo_svg.svg/1200px-Kawasaki_logo_svg.svg.png",
  honda: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png",
  yamaha: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Yamaha_Motor_logo.svg/1200px-Yamaha_Motor_logo.svg.png",
  suzuki: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/1200px-Suzuki_logo_2.svg.png",
  ducati: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ducati_red_logo.svg/1200px-Ducati_red_logo.svg.png",
  bmw: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png",
  ktm: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/KTM-Logo.svg/1200px-KTM-Logo.svg.png",
  triumph: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Triumph_Motorcycles_Logo.svg/1200px-Triumph_Motorcycles_Logo.svg.png",
  harley: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Harley-Davidson_logo.svg/1200px-Harley-Davidson_logo.svg.png",
  royalenfield: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Royal_Enfield_logo.svg/1200px-Royal_Enfield_logo.svg.png",
  tvs: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/TVS_Motor_Company_Logo.svg/1200px-TVS_Motor_Company_Logo.svg.png",
  bajaj: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bajaj_Auto_logo.svg/1200px-Bajaj_Auto_logo.svg.png",
};

export default function BrandSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Our Trusted Brands</h2>
          <p className="text-muted-foreground mt-2">We offer the best motorcycles from world-renowned manufacturers</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8">
          {brands.slice(0, 12).map((brand) => (
            <div
              key={brand.id}
              className="bg-background rounded-lg p-4 flex items-center justify-center h-24 animate-fade-in"
            >
              <img
                src={brandLogos[brand.id as keyof typeof brandLogos]} 
                alt={brand.name}
                className="max-h-12 max-w-full dark:invert dark:brightness-0 dark:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
