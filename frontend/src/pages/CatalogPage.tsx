import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const categories = ['Fiction', 'Business', 'Design', 'Science', 'History', 'Lifestyle']

export function CatalogPage() {
  useDocumentTitle('Catalog | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Catalog"
        title="Browse the bookstore collection"
        description="Use this page for featured books, categories, filters, and search. The route is already connected and ready for real data."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700"
            >
              {category}
            </div>
          ))}
        </div>
      </PageHero>

      <SectionCard eyebrow="Next Step" title="Catalog page placeholders">
        <p>Add a product grid, search controls, filters, pagination, and loading states here.</p>
      </SectionCard>
    </div>
  )
}
