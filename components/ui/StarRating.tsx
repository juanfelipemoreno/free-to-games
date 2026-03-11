interface StarRatingProps {
  rating: number  
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function StarRating({ rating, size = 'sm', showValue = false }: StarRatingProps) {
  const full  = Math.floor(rating)
  const empty = 5 - full

  const sizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size]

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex gap-0.5 ${sizeClass}`}>
        {'★'.repeat(full).split('').map((_, i) => (
          <span key={`f-${i}`} className="text-yellow-400">★</span>
        ))}
        {'☆'.repeat(empty).split('').map((_, i) => (
          <span key={`e-${i}`} className="text-slate-700">☆</span>
        ))}
      </div>
      {showValue && (
        <span className="font-['Share_Tech_Mono'] text-[10px] text-slate-500">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export function fakeRating(id: number): number {
  return 3 + ((id * 7) % 20) / 10
}
