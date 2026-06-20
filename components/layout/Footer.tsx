"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Link, Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo";

type SocialSettings = { github: string; linkedin: string; email: string; whatsapp: string };

const defaultSocial: SocialSettings = {
  github: "",
  linkedin: "https://www.linkedin.com/in/amirmehmood0325/",
  email: "meharamir985@gmail.com",
  whatsapp: "923018659791",
};

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [social, setSocial] = useState<SocialSettings>(defaultSocial);

  useEffect(() => {
    fetch("/api/admin/settings/social")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSocial(data); });
  }, []);

  const socialItems = [
    social.github ? { href: social.github, icon: Code2, label: "GitHub", hoverColor: "#0F172A" } : null,
    social.linkedin ? { href: social.linkedin, icon: Link, label: "LinkedIn", hoverColor: "#0A66C2" } : null,
    social.email ? { href: `mailto:${social.email}`, icon: Mail, label: "Email", hoverColor: "#EA4335" } : null,
    social.whatsapp ? { href: `https://wa.me/${social.whatsapp}`, icon: MessageCircle, label: "WhatsApp", hoverColor: "#25D366" } : null,
  ].filter(Boolean) as { href: string; icon: React.ElementType; label: string; hoverColor: string }[];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Logo />
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
            className="flex items-center gap-3 flex-wrap justify-center"
          >
            {socialItems.map(({ href, icon: Icon, label, hoverColor }, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <motion.a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -4, scale: 1.08 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{
                    color: isHovered ? hoverColor : "#64748B",
                    borderColor: isHovered ? hoverColor : "#E2E8F0",
                    transition: "color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: isHovered ? `0 4px 16px -4px ${hoverColor}40` : "none",
                  }}
                  className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border bg-white"
                >
                  <Icon size={18} />
                  <span className="text-[10px] font-medium">{label}</span>
                </motion.a>
              );
            })}
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
            © {year} Aamir Mehmood. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
