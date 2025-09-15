"use client"
import { useState, useRef, useEffect } from "react"
// Inline globe SVG to avoid depending on react-icons (module-not-found)
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 12H21.95M12 2.05v19.9M7 7c2 0 5 0 10 0M7 17c2 0 5 0 10 0" />
    </svg>
  )
}

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇮🇳" },
  { code: "or", name: "Odia", flag: "🇮🇳" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "kok", name: "Konkani", flag: "🇮🇳" },
]

export default function LanguageToggle({
  stateLanguages = LANGUAGES,
  initial = "en",
  onChange,
  className = ""
}: {
  stateLanguages?: typeof LANGUAGES
  initial?: string
  onChange?: (lang: string) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(initial)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    if (onChange) onChange(selected)
  }, [selected, onChange])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false)
    if (e.key === "ArrowDown" && open) {
      const first = menuRef.current?.querySelector('button:not([disabled])') as HTMLButtonElement
      first?.focus()
    }
  }

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        ref={btnRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 shadow-md rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm md:text-base"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
      >
  <GlobeIcon className="w-4 h-4 text-blue-500" />
        <span className="hidden sm:inline">{LANGUAGES.find(l => l.code === selected)?.name || "Language"}</span>
        <span className="sm:hidden">{LANGUAGES.find(l => l.code === selected)?.flag || "🌐"}</span>
        <svg className={`ml-2 w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div
        ref={menuRef}
        className={`absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
        role="listbox"
        tabIndex={-1}
        aria-label="Language options"
      >
        {stateLanguages.map((lang) => (
          <button
            key={lang.code}
            className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-neutral-800 focus:bg-blue-100 dark:focus:bg-neutral-700 focus:outline-none transition-colors duration-150 rounded-lg ${selected === lang.code ? "bg-blue-100 dark:bg-neutral-800 font-semibold" : ""}`}
            onClick={() => { setSelected(lang.code); setOpen(false) }}
            role="option"
            aria-selected={selected === lang.code}
            tabIndex={0}
          >
            <span className="text-lg" aria-hidden="true">{lang.flag}</span>
            <span>{lang.name}</span>
            <span className="ml-auto text-xs text-neutral-400 uppercase">{lang.code}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
