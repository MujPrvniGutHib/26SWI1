import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLocalePath, useTranslation } from '../utils/locale'

export function NotFoundPage() {
  const t = useTranslation()
  const toLocalePath = useLocalePath()
  useDocumentTitle(t.notFoundPage.documentTitle)

  return (
    <PageHero
      eyebrow={t.notFoundPage.eyebrow}
      title={t.notFoundPage.title}
      description={t.notFoundPage.description}
    >
      <Link
        to={toLocalePath('/catalog')}
        className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        {t.notFoundPage.goToCatalog}
      </Link>
    </PageHero>
  )
}
