import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Not Found | SWI Frontend')

  return (
    <PageHero
      eyebrow="404"
      title="This page does not exist"
      description="The route you tried is not defined yet. Head back to the catalog and continue from there."
    >
      <Link
        to="/catalog"
        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Go to catalog
      </Link>
    </PageHero>
  )
}
