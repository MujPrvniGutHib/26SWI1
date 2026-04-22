import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  )
}
