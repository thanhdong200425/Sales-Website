import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah",
    name: "Sarah O.",
    quote:
      "“Love the quality and the fit. The reminders keep my wardrobe fresh without the usual shopping stress.”",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "alex",
    name: "Alex D.",
    quote:
      "“Fast delivery and the collections feel curated just for me. Highly recommend giving it a try.”",
    rating: 4.0,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "janelle",
    name: "Janelle L.",
    quote:
      "“Exactly what I needed to upgrade my daily looks. The styling tips are a nice touch.”",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

function TestimonialSection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            Our happy customers
          </h2>
          <div className="flex gap-3">
            <button className="inline-flex size-12 items-center justify-center rounded-full border border-slate-200 text-slate-600">
              ←
            </button>
            <button className="inline-flex size-12 items-center justify-center rounded-full border border-slate-200 text-slate-600">
              →
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="rounded-3xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar
                    alt={testimonial.name}
                    src={testimonial.avatar}
                    fallback={testimonial.name.slice(0, 2)}
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star
                        className="size-4 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                      <span className="text-sm text-slate-600">
                        {testimonial.rating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-base text-slate-600">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TestimonialSection };
