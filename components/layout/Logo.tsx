import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Icon mark */}
      <div className="relative flex-shrink-0 w-8 h-8">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <rect width="32" height="32" rx="8" fill="#2563EB" />
          <rect width="32" height="16" rx="8" fill="url(#logoHighlight)" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="800"
            fontFamily="Arial Black, Arial, sans-serif"
            letterSpacing="-0.5"
          >
            AM
          </text>
          <defs>
            <linearGradient id="logoHighlight" x1="0" y1="0" x2="0" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-bold text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors duration-200">
          Aamir <span className="text-[#2563EB]">Mehmood</span>
        </span>
        <span className="text-[9px] font-medium text-[#94A3B8] tracking-widest uppercase mt-0.5">
          Developer · AI Engineer
        </span>
      </div>
    </Link>
  );
}
