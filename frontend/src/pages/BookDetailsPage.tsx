import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  formatCurrency,
  getLocalizedCategory,
  getLocalizedFormat,
  useLocalePath,
  useTranslation,
} from '../utils/locale'

type Book = {
  title: string
  author: string
  category: string
  age: number
  price: number
  pages: number
  format: string
  originalPrice: number
  discountPercent: number
  rating: number
  coverUrl: string
  description: string
  stock: number
}

const books: Book[] = []

export function BookDetailsPage() {
  const t = useTranslation()
  const { bookId } = useParams()
  const { addToCart } = useCart()
  const toLocalePath = useLocalePath()
  const decodedTitle = bookId ? decodeURIComponent(bookId) : ''
  const book = books.find((b) => b.title === decodedTitle)
  const localizedCategory = book ? getLocalizedCategory(book.category, t) : ''
  useDocumentTitle(`${book?.title || t.bookDetailsPage.documentTitleFallback} | SWI Frontend`)

  if (!book) {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow={t.bookDetailsPage.notFound.eyebrow}
          title={t.bookDetailsPage.notFound.title}
          description={t.bookDetailsPage.notFound.description}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.bookDetailsPage.hero.eyebrow}
        title={book.title}
        description={`${t.bookDetailsPage.hero.by} ${book.author} - ${localizedCategory}`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={toLocalePath('/catalog')}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {t.common.backToCatalog}
          </Link>
          {book.stock > 0 ? (
            <button
              type="button"
              onClick={() => {
                addToCart({
                  title: book.title,
                  author: book.author,
                  category: book.category,
                  price: book.price,
                  coverUrl: book.coverUrl,
                  stock: book.stock,
                })
              }}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              {t.common.addToCart}
            </button>
          ) : (
            <span className="rounded-full border border-slate-300 bg-slate-200 px-5 py-3 text-sm font-medium text-slate-500 cursor-not-allowed">
              {t.common.notAvailable}
            </span>
          )}
        </div>
      </PageHero>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          eyebrow={t.bookDetailsPage.overview.eyebrow}
          title={t.bookDetailsPage.overview.title}
        >
          <div className="space-y-4">
            <div className="flex gap-6">
              <img
                src={book.coverUrl}
                alt={`${book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                className="h-48 w-32 rounded-lg object-cover shadow-sm"
              />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  {localizedCategory}
                </p>
                <h2 className="text-2xl font-semibold text-slate-950">{book.title}</h2>
                <p className="text-lg text-slate-600">
                  {t.bookDetailsPage.overview.by} {book.author}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-slate-500">({book.rating})</span>
                </div>
                <p className="text-sm text-slate-600">
                  {t.bookDetailsPage.overview.inStock}{' '}
                  <span className="font-semibold">{book.stock}</span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow={t.bookDetailsPage.specs.eyebrow} title={t.bookDetailsPage.specs.title}>
          <div className="space-y-3">
            {book.discountPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">{t.bookDetailsPage.specs.originalPrice}</span>
                <span className="text-slate-500 line-through">
                  {formatCurrency(book.originalPrice, t)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">{t.bookDetailsPage.specs.price}</span>
              <span className="font-semibold">{formatCurrency(book.price, t)}</span>
            </div>
            {book.discountPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">{t.bookDetailsPage.specs.discount}</span>
                <span className="text-red-600 font-semibold">-{book.discountPercent}%</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">{t.bookDetailsPage.specs.pages}</span>
              <span>{book.pages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">{t.bookDetailsPage.specs.format}</span>
              <span>{getLocalizedFormat(book.format, t)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">{t.bookDetailsPage.specs.age}</span>
              <span>{book.age}+</span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <span className="text-slate-600">{t.bookDetailsPage.specs.description}</span>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
