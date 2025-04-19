import Link from "next/link"

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="font-semibold text-lg mr-auto">
          AI App Store
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/browse"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Browse
          </Link>
          <Link href="/chat" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Chat
          </Link>
          <Link
            href="/upload"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Upload
          </Link>
        </nav>
      </div>
    </header>
  )
}
