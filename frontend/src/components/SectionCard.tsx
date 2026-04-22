import type { PropsWithChildren, ReactNode } from 'react'

type SectionCardProps = PropsWithChildren<{
  eyebrow: string
  title: string
  actions?: ReactNode
}>

export function SectionCard({
  eyebrow,
  title,
  actions,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
        {eyebrow}
      </p>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {actions}
      </div>
      <div className="mt-6 space-y-6 text-base leading-7 text-slate-600">{children}</div>
    </section>
  )
}
