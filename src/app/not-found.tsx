import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-7xl font-black bg-gradient-brand bg-clip-text text-transparent">404</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-gradient-brand px-6 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-slate-200 px-6 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}
