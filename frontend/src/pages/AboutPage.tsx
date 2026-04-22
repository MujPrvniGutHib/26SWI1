import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const values = [
  'Curated reads across fiction, design, business, and lifestyle',
  'A smooth shopping journey from catalog to checkout',
  'A reading-first brand with clean, modern digital experience',
]

export function AboutPage() {
  useDocumentTitle('About Us | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="About Us"
        title="A bookstore built for discovery"
        description="This page can introduce your brand story, mission, team, and what makes the shop worth coming back to."
      />

      <SectionCard eyebrow="Brand Story" title="What this page can hold">
        <div className="grid gap-3 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
            >
              {value}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
