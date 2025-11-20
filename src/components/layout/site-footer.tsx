import { Facebook, Instagram, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const FOOTER_LINKS = [
  {
    title: "Company",
    items: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    items: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    items: ["Free eBook", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
]

function SiteFooter() {
  return (
    <footer className="bg-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16">
        <div className="flex flex-col gap-10 border-b border-slate-200 pb-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm space-y-5">
            <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">
              SHOP.CO
            </Link>
            <p className="text-sm text-slate-500">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram].map((Icon) => (
                <span key={Icon.name} className="inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-900">
                  <Icon className="size-5" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-6 text-sm sm:grid-cols-4">
            {FOOTER_LINKS.map((column) => (
              <div key={column.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{column.title}</p>
                <ul className="space-y-2 text-slate-600">
                  {column.items.map((item) => (
                    <li key={item}>
                      <button className="transition hover:text-slate-900">{item}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Shop.co © {new Date().getFullYear()}, All Rights Reserved</p>
          <div className="flex flex-wrap items-center gap-3 text-slate-700">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((method) => (
              <span key={method} className="rounded-full bg-white px-4 py-1 text-xs font-medium text-slate-900">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }

