"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error for observability tooling.
    console.error("Unhandled route error:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        An unexpected error occurred while rendering this page. Our team has been
        notified — please try again.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-slate-400">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-gradient-brand px-6 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-6 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
