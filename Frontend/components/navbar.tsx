"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname();
  const getLinkClasses = (href: string) =>
    pathname === href
      ? "text-sm font-medium transition-colors hover:text-primary underline underline-offset-4 text-primary"
      : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="font-semibold text-lg mr-auto">
          AI App Store
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className={getLinkClasses("/")}>Home</Link>
          <Link href="/browse" className={getLinkClasses("/browse")}>Browse</Link>
          <Link href="/chat" className={getLinkClasses("/chat")}>Chat</Link>
          <Link href="/upload" className={getLinkClasses("/upload")}>Upload</Link>
        </nav>
      </div>
    </header>
  )
}
