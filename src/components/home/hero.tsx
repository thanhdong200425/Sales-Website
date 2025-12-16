import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE = "./hero.png";

const HERO_STATS = [
  { label: "International Brands", value: "200+" },
  { label: "High-Quality Products", value: "2,000+" },
  { label: "Happy Customers", value: "30,000+" },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find clothes that matches your style
            </p>
            <p className="text-base text-slate-600">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              className="rounded-full px-8 py-6 text-base"
              onClick={() => navigate("/products")}
            >
              Shop now
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="space-y-1 border-l border-slate-200 pl-4 first:border-l-0 first:pl-0"
              >
                <p className="text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-[40px] bg-slate-200/60 blur-3xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[40px] bg-slate-200">
            <img
              alt="Stylish models"
              className="h-full w-full object-cover"
              src={HERO_IMAGE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
