import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function NewsletterCta() {
  return (
    <section className="px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-[32px] bg-slate-900 px-6 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">Join the club</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight lg:text-4xl">Stay up to date about our latest offers</h2>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <Input
            className="h-12 rounded-full border-0 bg-white/10 placeholder:text-white/60 focus-visible:bg-white/15 focus-visible:ring-white/60"
            placeholder="Enter your email"
            type="email"
          />
          <Button className="h-12 rounded-full bg-white text-slate-900 hover:bg-white/90" variant="secondary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

export { NewsletterCta }

