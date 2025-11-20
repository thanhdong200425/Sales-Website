import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

function HomePage() {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Sales PM
        </p>
        <h1 className="text-balance text-4xl font-bold text-slate-900">
          Close more deals with less busywork
        </h1>
        <p className="text-pretty text-base text-slate-600">
          Stay on top of every relationship, automate reminders, and keep your
          pipeline accurate without touching a spreadsheet.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/pipeline">Get started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/reports">View reports</Link>
        </Button>
      </div>
    </div>
  )
}

export default HomePage

