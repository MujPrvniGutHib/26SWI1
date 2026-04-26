import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLocalePath, useTranslation } from '../utils/locale'

const featureCards = [
  {
    translationKey: 'catalog',
    to: '/catalog',
    icon: 'book',
  },
  {
    translationKey: 'account',
    to: '/sign-in',
    icon: 'user',
  },
  {
    translationKey: 'about',
    to: '/about',
    icon: 'shop',
  },
] as const

export function HomePage() {
  const t = useTranslation()
  useDocumentTitle(t.homePage.documentTitle)
  const [catalogSearch, setCatalogSearch] = useState('')
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()

  const handleCatalogSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (catalogSearch.trim()) {
      navigate(toLocalePath(`/catalog?q=${encodeURIComponent(catalogSearch.trim())}`))
      setCatalogSearch('')
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
        <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              {t.homePage.eyebrow}
            </p>
            <h1 className="mt-6 max-w-md text-5xl font-semibold leading-tight tracking-tight text-slate-950">
              {t.homePage.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              {t.homePage.description}
            </p>
            <Link
              to={toLocalePath('/catalog')}
              className="mt-9 inline-flex w-fit rounded-full bg-slate-950 px-7 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {t.homePage.browseCatalog}
            </Link>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl lg:min-h-[420px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85')",
              }}
            />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {featureCards.map((card) => {
          const cardText = t.homePage.cards[card.translationKey]

          return (
          <section
            key={card.translationKey}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              {cardText.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
              {cardText.title}
            </h2>
            <p className="mt-4 min-h-16 text-base leading-7 text-slate-600">
              {cardText.description}
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              {card.to === '/catalog' ? (
                <form onSubmit={handleCatalogSearch} className="min-w-0 flex-1">
                  <label htmlFor="home-catalog-search" className="sr-only">
                    {t.homePage.cards.catalog.searchLabel}
                  </label>
                  <input
                    id="home-catalog-search"
                    type="search"
                    value={catalogSearch}
                    onChange={(event) => setCatalogSearch(event.target.value)}
                    placeholder={t.homePage.cards.catalog.searchPlaceholder}
                    className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  />
                </form>
              ) : (
                <Link
                  to={toLocalePath(card.to)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {cardText.action}
                </Link>
              )}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-cyan-700">
                <FeatureIcon type={card.icon} />
              </div>
            </div>
          </section>
          )
        })}
      </div>
    </div>
  )
}

function FeatureIcon({ type }: { type: string }) {
  if (type === 'user') {
    return (
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
        <path
          d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  if (type === 'shop') {
    return (
      <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
        <path
          d="M4 10h16M6 10v10h12V10M8 20v-6h8v6M5 4h14l1 6H4l1-6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 5.5A3.5 3.5 0 0 1 8.5 2H20v17H8.5A3.5 3.5 0 0 0 5 22V5.5Zm0 0A3.5 3.5 0 0 1 8.5 9H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}
