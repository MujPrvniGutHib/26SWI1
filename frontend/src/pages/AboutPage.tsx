import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useTranslation } from '../utils/locale'

export function AboutPage() {
  const t = useTranslation()
  useDocumentTitle(t.aboutPage.documentTitle)

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.aboutPage.hero.eyebrow}
        title={t.aboutPage.hero.title}
        description={t.aboutPage.hero.description}
      />

      <SectionCard eyebrow={t.aboutPage.story.eyebrow} title={t.aboutPage.story.title}>
        <div className="grid gap-3 md:grid-cols-3">
          {t.aboutPage.story.values.map((value) => (
            <div
              key={value}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
            >
              {value}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard eyebrow={t.aboutPage.contact.eyebrow} title={t.aboutPage.contact.title}>
        <div className="space-y-4 text-sm leading-7 text-slate-700">
          <p>
            <span className="font-semibold text-slate-950">
              {t.aboutPage.contact.addressLabel}
            </span>{' '}
            {t.aboutPage.contact.address}
          </p>
          <div>
            <p className="font-semibold text-slate-950">{t.aboutPage.contact.openingTimes}</p>
            {t.aboutPage.contact.days.map((day) => (
              <p key={day}>{day} - 10:00 - 22:00</p>
            ))}
          </div>
          <p>
            <span className="font-semibold text-slate-950">
              {t.aboutPage.contact.supportLabel}
            </span>{' '}
            +420 777 428 913
          </p>
        </div>
      </SectionCard>
    </div>
  )
}
