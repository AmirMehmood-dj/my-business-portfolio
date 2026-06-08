"use client";

import { motion } from "framer-motion";
import { Code2, Link, Mail, MessageCircle } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const social = [
  { href: "https://github.com/amirmehar", icon: Code2, label: "GitHub" },
  { href: "https://linkedin.com/in/amirmehar", icon: Link, label: "LinkedIn" },
  { href: "mailto:amir@example.com", icon: Mail, label: "Email" },
  { href: "https://wa.me/923001234567", icon: MessageCircle, label: "WhatsApp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="font-semibold text-lg text-[#0F172A]">
              Amir<span className="text-[#2563EB]">.</span>
            </p>
            <p className="text-sm text-[#94A3B8] mt-1">
              Frontend Engineer · Mobile Developer · AI
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {social.map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.15 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${0.25 + i * 0.05}s` }}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors bg-white"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-[#E2E8F0] text-center"
        >
          <p className="text-sm text-[#94A3B8]">
            © {year} Amir Mehar. Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
