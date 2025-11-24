import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function NewsletterCta() {
  return (
    <section className="px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-[32px] bg-slate-900 px-6 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <h2 className="text-3xl font-bold leading-tight lg:text-4xl">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <Input
            className="h-12 rounded-full border-0 bg-white placeholder:text-slate-600 focus-visible:bg-white focus-visible:ring-white/60"
            placeholder="Enter your email address"
            type="email"
          />
          <Button className="h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800" variant="default">
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  )
}

export { NewsletterCta }

