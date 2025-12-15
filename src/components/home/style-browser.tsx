import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type StyleCategory = {
  id: string;
  label: string;
  image: string;
};

const STYLE_CATEGORIES: StyleCategory[] = [
  {
    id: "casual",
    label: "Casual",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
  },
  {
    id: "formal",
    label: "Formal",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
  },
  {
    id: "party",
    label: "Party",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
  },
  {
    id: "gym",
    label: "Gym",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
  },
];

function StyleBrowser() {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-[32px] bg-slate-100 p-6">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-slate-900">
          Browse by dress style
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STYLE_CATEGORIES.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden rounded-3xl border-none bg-white shadow-none"
            >
              <CardContent className="flex items-center justify-between gap-4 p-0">
                <div className="space-y-1 p-6">
                  <p className="text-xl font-semibold text-slate-900">
                    {category.label}
                  </p>
                  <Link
                    to={`/products?style=${category.label}`}
                    className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700 transition-colors"
                  >
                    Explore
                  </Link>
                </div>
                <img
                  alt={category.label}
                  className="h-48 w-48 rounded-l-3xl object-cover"
                  src={category.image}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StyleBrowser };
