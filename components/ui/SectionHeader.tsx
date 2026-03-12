type DotColor = 'cyan' | 'pink' | 'yellow'

interface SectionHeaderProps {
  title: string
  dot?: DotColor
  action?: { label: string; href?: string; onClick?: () => void }
}

const dotStyles: Record<DotColor, string> = {
  cyan:   'bg-cyan-400 shadow-[0_0_10px_#00f5ff]',
  pink:   'bg-pink-500 shadow-[0_0_10px_#ff006e]',
  yellow: 'bg-yellow-400 shadow-[0_0_10px_#ffbe00]',
}

export function SectionHeader({ title, dot = 'cyan', action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 mb-5">
      <div className="flex items-center gap-3 font-['Orbitron'] text-sm tracking-[3px] text-slate-200">
        <span className={`w-2 h-2 rounded-full animate-pulse ${dotStyles[dot]}`} />
        {title}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-1 font-['Share_Tech_Mono'] text-[11px] tracking-widest text-cyan-400 hover:gap-2.5 transition-all"
        >
          {action.label} →
        </button>
      )}
    </div>
  )
}
