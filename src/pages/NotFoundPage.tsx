import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

function NotFoundPage() {
  return (
    <div className="space-y-4 text-center">
      <div className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          404
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="text-pretty text-sm text-slate-600">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/pipeline">View pipeline</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage

