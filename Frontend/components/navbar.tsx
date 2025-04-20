"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname();
  const getLinkClasses = (href: string) =>
    pathname === href
      ? "text-sm font-bold transition-colors hover:text-primary underline underline-offset-4 text-primary"
      : "text-sm font-bold text-muted-foreground transition-colors hover:text-primary";

  return (
    <header className="border-b bg-background">
      <div className="flex h-12 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center font-semibold text-lg mr-auto">
          <img src="/images/logo.webp" alt="Advise.me logo" className="w-6 h-6 mr-2" />
          Advise.me
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className={getLinkClasses("/")}>Home</Link>
          <Link href="/browse" className={getLinkClasses("/browse")}>Explore</Link>
          {/* <Link href="/chat" className={getLinkClasses("/chat")}>Chat</Link> */}
          <Link href="/upload" className={getLinkClasses("/upload")}>Upload</Link>
        </nav>
      </div>
    </header>
  )
}
