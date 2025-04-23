"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-[#4f9cf9] rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-xl font-bold text-[#212529]">Whitepace</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#212529] hover:text-[#4f9cf9] px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/features" className="text-[#212529] hover:text-[#4f9cf9] px-3 py-2 text-sm font-medium">
              Features
            </Link>
            <Link href="/about" className="text-[#212529] hover:text-[#4f9cf9] px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-[#212529] hover:text-[#4f9cf9] px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <button className="bg-[#4f9cf9] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#37a3ff] transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#4f9cf9] hover:bg-gray-100 focus:outline-none"
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
              className="block px-3 py-2 rounded-md text-base font-medium text-[#212529] hover:text-[#4f9cf9] hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#212529] hover:text-[#4f9cf9] hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#212529] hover:text-[#4f9cf9] hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#212529] hover:text-[#4f9cf9] hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="mt-2 w-full bg-[#4f9cf9] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#37a3ff] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
