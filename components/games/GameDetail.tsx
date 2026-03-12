'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { GameDetail } from '@/types/game'
import { StarRating, fakeRating } from '@/components/ui/StarRating'
import { WishlistButton } from '@/components/ui/WishlistButton'

interface GameDetailProps {
  game: GameDetail
}

export function GameDetail({ game }: GameDetailProps) {
  const rating = fakeRating(game.id)
  const votes = 500 + ((game.id * 13) % 4500)
  const screenshots = game.screenshots?.length ? game.screenshots : []
  const minReqs = game.minimum_system_requirements

  if (game?.error) {
    return <div>Error cargando el juego</div>;
  }

  return (
    <>
      <div>
        <div className="relative h-105 overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover brightness-[0.4] saturate-[1.5] scale-[1.05] animate-heroZoom
          bg-linear-to-t"
            priority
          />

      
          <div id='gradient-image'></div>
          <div className="absolute bottom-10 left-10 max-w-xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-['Share_Tech_Mono'] text-[11px] tracking-widest text-slate-500 hover:text-cyan-400 transition-colors mb-5 m-2"
            >
              ← VOLVER AL CATÁLOGO
            </Link>

            <span className="inline-block font-['Share_Tech_Mono'] text-[10px] tracking-[3px] text-cyan-400 border border-cyan-400 px-3 py-1 mb-3 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
              {game?.genre ? game.genre.toUpperCase() : "SIN GENERO"}
            </span>

            <h1 className="font-orbitron font-black leading-tight tracking-wide mb-4 text-slate-100 [text-shadow:0_0_60px_rgba(0,245,255,0.3)]" style={{ fontSize: 'clamp(1.75rem,4vw,3.25rem)' }}>
              {game.title}
            </h1>

            <div className="flex items-center gap-5">
              <StarRating rating={rating} size="lg" />
              <span className="font-orbitron text-2xl font-bold text-yellow-400 [text-shadow:0_0_20px_rgba(255,190,0,0.5)]">
                {rating.toFixed(1)}
              </span>
              <span className="font-share_Tech_Mono text-[11px] tracking-wide text-slate-600">
                ({votes.toLocaleString()} reseñas)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 p-10">

          <div>
            <DetailSectionTitle>DESCRIPCIÓN</DetailSectionTitle>
            <p className="font-rajdhani text-base text-slate-300/80 leading-relaxed mb-10 font-light">
              {game.description || game.short_description}
            </p>

            {screenshots.length > 0 && (
              <>
                <DetailSectionTitle>SCREENSHOTS</DetailSectionTitle>
                <div className="grid grid-cols-3 gap-2 mb-10">
                  {screenshots.slice(0, 6).map((s) => (
                    <div
                      key={s.id}
                      className="relative aspect-video overflow-hidden cursor-pointer [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)] group"
                    >
                      <Image
                        src={s.image}
                        alt="screenshot"
                        fill
                        className="object-cover brightness-[0.85] group-hover:brightness-[1.1] group-hover:saturate-[1.3] group-hover:scale-105 transition-all duration-300"
                        sizes="33vw"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <DetailSectionTitle>ETIQUETAS</DetailSectionTitle>
            <div className="flex flex-wrap gap-2">
              {[game.genre, game.platform, game.status, ...(game.tags ?? [])].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="font-share_Tech_Mono text-[10px] tracking-wide text-slate-500 border border-slate-700/60 px-3 py-1.5 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all cursor-pointer"
                >
                  {tag?.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-linear-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-400/30 p-6 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)] mb-6">
              <div className="font-share_Tech_Mono text-[10px] tracking-widest text-emerald-400 mb-2">
                💚 100% GRATUITO
              </div>
              <div className="font-orbitron text-3xl font-black text-cyan-400 [text-shadow:0_0_20px_rgba(0,245,255,0.5)] mb-5">
                FREE
              </div>
              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-cyan-400 text-black font-orbitron text-sm font-black tracking-[3px] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 mb-3"
              >
                ▶ JUGAR AHORA
              </a>
              <WishlistButton gameId={game.id} variant="full" />
            </div>

            <DetailSectionTitle className="mb-3">INFO DEL JUEGO</DetailSectionTitle>
            <div className="bg-[#0a1628] border border-cyan-500/10 p-5 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)] mb-6">
              <SpecRow label="DEVELOPER" value={game.developer} />
              <SpecRow label="PUBLISHER" value={game.publisher} />
              <SpecRow label="RELEASE" value={game.release_date} />
              <SpecRow label="PLATAFORMA" value={game.platform} color="text-cyan-400" />
              <SpecRow label="PRECIO" value="FREE TO PLAY" color="text-emerald-400" />
            </div>

            {minReqs && (
              <>
                <DetailSectionTitle className="mb-3">REQUISITOS MÍNIMOS</DetailSectionTitle>
                <div className="bg-[#0a1628] border border-cyan-500/10 p-5 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]">
                  {minReqs.os && <SpecRow label="OS" value={minReqs.os} />}
                  {minReqs.processor && <SpecRow label="CPU" value={minReqs.processor.substring(0, 32) + '...'} />}
                  {minReqs.memory && <SpecRow label="RAM" value={minReqs.memory} color="text-cyan-400" />}
                  {minReqs.graphics && <SpecRow label="GPU" value={minReqs.graphics.substring(0, 32) + '...'} />}
                  {minReqs.storage && <SpecRow label="STORAGE" value={minReqs.storage} color="text-cyan-400" />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function DetailSectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 font-orbitron text-xs tracking-[3px] text-cyan-400 mb-4 ${className}`}>
      {children}
      <span className="flex-1 h-px bg-linear-to-r from-cyan-500/15 to-transparent" />
    </div>
  )
}

function SpecRow({ label, value, color = 'text-slate-200' }: { label: string; value?: string; color?: string }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/4 last:border-0">
      <span className="font-['Share_Tech_Mono'] text-[11px] tracking-wide text-slate-600">{label}</span>
      <span className={`font-['Share_Tech_Mono'] text-[11px] text-right max-w-45 truncate ${color}`}>{value}</span>
    </div>
  )
}
