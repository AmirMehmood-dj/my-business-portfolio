"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { hash: "about", label: "About" },
  { hash: "skills", label: "Skills" },
  { hash: "services", label: "Services" },
  { hash: "projects", label: "Projects" },
  { hash: "experience", label: "Experience" },
  { hash: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  function href(hash: string) {
    return isHome ? `#${hash}` : `/#${hash}`;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={href(link.hash)}
                className={scrolled
                  ? "px-3 py-2 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors rounded-md hover:bg-[#F8FAFC]"
                  : "px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/10"}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={href("contact")}
              className="px-4 py-2 text-sm font-medium bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] transition-colors "
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${scrolled
              ? "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
              : "text-white/70 hover:text-white hover:bg-white/10"}`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-[#E2E8F0]"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={href(link.hash)}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={href("contact")}
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2.5 text-sm font-medium bg-[#2563EB] text-white rounded-full text-center hover:bg-[#1D4ED8] transition-colors "
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
