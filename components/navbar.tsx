"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold">W</span>
              </div>
              <span className="text-xl font-bold text-foreground">Whitepace</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium ${isActive("/") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`px-3 py-2 text-sm font-medium ${isActive("/features") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Features
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium ${isActive("/about") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium ${isActive("/contact") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              Contact
            </Link>
            <Link
              href="/chat"
              className={`px-3 py-2 text-sm font-medium ${isActive("/chat") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              OpenAI Chat
            </Link>
            <Link
              href="/huggingface-chat"
              className={`px-3 py-2 text-sm font-medium ${isActive("/huggingface-chat") ? "active-link font-semibold" : "text-foreground hover:text-primary"}`}
            >
              HF Chat
            </Link>
            <ThemeToggle />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/features") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/about") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/contact") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/chat"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/chat") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              OpenAI Chat
            </Link>
            <Link
              href="/huggingface-chat"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/huggingface-chat") ? "active-link font-semibold" : "text-foreground hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              HF Chat
            </Link>
            <button className="mt-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
