import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function BookDetailsPage() {
  const { bookId } = useParams()
  useDocumentTitle('Book Details | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Book Details"
        title={`Book route for ${bookId ?? 'selected title'}`}
        description="This dynamic route is ready for a single-book API call, reviews, stock state, and add-to-cart actions."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalog"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to catalog
          </Link>
          <Link
            to="/cart"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Go to cart
          </Link>
        </div>
      </PageHero>

      <SectionCard eyebrow="Route Param" title="Dynamic path is active">
        <p>
          Current book id:
          <code className="ml-2 rounded bg-slate-100 px-2 py-1 text-sm">
            {bookId ?? 'missing'}
          </code>
        </p>
      </SectionCard>
    </div>
  )
}
