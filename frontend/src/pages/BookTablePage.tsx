import { PageHero } from '../components/PageHero'
import { useTranslation } from '../utils/locale'

export function BookTablePage() {
  const t = useTranslation()

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={t.bookTablePage.hero.eyebrow}
        title={t.bookTablePage.hero.title}
        description={t.bookTablePage.hero.description}
      />
      <div className="p-8 text-center">
        <p>{t.bookTablePage.mainContent.placeholder}</p>
      </div>
    </div>
  )
}
