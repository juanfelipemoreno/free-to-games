'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from "next/navigation"
//import { useWishlist } from '@/context/WishlistContext'

interface NavbarProps {
    onSearch?: (value: string) => void
}

export function Navbar({ onSearch }: NavbarProps) {
    const [count] = useState();
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        onSearch?.(e.target.value)
    }

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-16 bg-[#020408]/85 backdrop-blur-xl border-b border-cyan-500/10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent relative">

            <Link href="/" className="relative group">
                <span className="font-orbitron font-black text-[23px] tracking-[3px] text-cyan-400">
                    GAMEFREE
                </span>
                <span className="font-orbitron font-black text-[23px] tracking-[3px] text-pink-500">
                    .GG
                </span>
                <span className="absolute -bottom-2.5 left-0 font-['Share_Tech_Mono'] text-[8px] tracking-[4px] text-slate-500 whitespace-nowrap">
                    FREE TO PLAY
                </span>
            </Link>

            <div className="flex items-center gap-1">
                <NavLink href="/" >INICIO</NavLink>
                <NavLink href="/wishlist">DESEOS</NavLink>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-cyan-400/5 border border-cyan-500/15 px-4 py-2 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
                    <SearchIcon />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="BUSCAR JUEGO..."
                        className="bg-transparent outline-none text-slate-200 font-['Share_Tech_Mono'] text-xs tracking-wide w-48 placeholder:text-slate-600"
                    />
                </div>

                <Link
                    href="/wishlist"
                    className="flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 px-4 py-2 font-['Share_Tech_Mono'] text-xs tracking-widest transition-all hover:bg-pink-500/20 hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
                >
                    ♥ DESEOS
                    <span className="bg-pink-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {count}
                    </span>
                </Link>
            </div>
        </nav>
    )
}

function NavLink({ href, children }: { href: string; children: string }) {

    const pathname = usePathname()

    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`relative font-mono text-[12px] tracking-[2px]
            px-4 py-2 border border-b-2 transition-all hover:text-cyan-400 
            hover:border-cyan-500/15 hover:bg-cyan-400/5 
            ${
                isActive 
                    ? "text-cyan-400  border-neon-cyan relative after:content-[''] after:absolute after:-bottom-px after:left-0 after:right-0 after:h-[2px] after:bg-cyan-400 after:shadow-[0_0_8px_#00f5ff]"
                    : "text-slate-500 border-transparent"
            }`}
        >
            {children}
        </Link>
    )
}


function SearchIcon() {
    return (
        <svg className="text-cyan-400 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    )
}