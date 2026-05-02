import { BookTable } from '../components/BookTable'
import { PageHero } from '../components/PageHero'
import { useTranslation } from '../utils/locale'

export function BookTablePage() {
  const t = useTranslation()

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={t.tablePage.hero.eyebrow}
        title={t.tablePage.hero.title}
        description={t.tablePage.hero.description}
      />
      <BookTable />
    </div>
  )
}
