import { Card, CardContent } from "@/components/ui/card"

type StyleCategory = {
  id: string
  label: string
  image: string
}

const STYLE_CATEGORIES: StyleCategory[] = [
  { id: "casual", label: "Casual", image: "https://www.figma.com/api/mcp/asset/290bf7ea-3a9c-4700-a1e7-58d571295dc5" },
  { id: "formal", label: "Formal", image: "https://www.figma.com/api/mcp/asset/37b93b7b-8451-4ded-8cb8-22b07b520d69" },
  { id: "party", label: "Party", image: "https://www.figma.com/api/mcp/asset/d3debed0-d805-4140-883c-d3483ac0657d" },
  { id: "gym", label: "Gym", image: "https://www.figma.com/api/mcp/asset/7ab43d35-34bb-46b4-906a-c71d0b84b3b2" },
]

function StyleBrowser() {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-[32px] bg-slate-100 p-6">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-slate-900">Browse by dress style</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STYLE_CATEGORIES.map((category) => (
            <Card key={category.id} className="overflow-hidden rounded-3xl border-none bg-white shadow-none">
              <CardContent className="flex items-center justify-between gap-4 p-0">
                <div className="space-y-1 p-6">
                  <p className="text-xl font-semibold text-slate-900">{category.label}</p>
                  <button className="text-sm font-medium text-slate-500 underline underline-offset-4">Explore</button>
                </div>
                <img alt={category.label} className="h-48 w-48 rounded-l-3xl object-cover" src={category.image} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StyleBrowser }

