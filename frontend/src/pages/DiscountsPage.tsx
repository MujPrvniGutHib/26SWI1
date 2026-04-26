import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, getLocalizedCategory, useLocalePath, useTranslation } from '../utils/locale'

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

export function DiscountsPage() {
  const t = useTranslation()
  useDocumentTitle(t.discountsPage.documentTitle)
  const { addToCart } = useCart()
  const toLocalePath = useLocalePath()

  const discountedBooks = books.filter((book) => book.discountPercent > 0)

  const handleAddToCart = (book: (typeof books)[number]) => {
    addToCart({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      coverUrl: book.coverUrl,
      stock: book.stock,
    })
  }

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={t.discountsPage.hero.eyebrow}
        title={t.discountsPage.hero.title}
        description={t.discountsPage.hero.description}
      >
        <Link
          to={toLocalePath('/catalog')}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {t.common.backToCatalog}
        </Link>
      </PageHero>

      <SectionCard eyebrow={t.discountsPage.section.eyebrow} title={t.discountsPage.section.title}>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {discountedBooks.map((book) => (
            <div key={book.title} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
              <Link to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)} className="flex flex-1 gap-4">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                  className="h-32 w-24 rounded-lg object-cover shadow-sm"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                    {getLocalizedCategory(book.category, t)}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">{book.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{book.author}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className="ml-1 text-sm text-slate-500">({book.rating})</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-medium text-slate-900">
                      {formatCurrency(book.price, t)}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      {formatCurrency(book.originalPrice, t)}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                      -{book.discountPercent}%
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span>{book.pages} {t.common.pages}</span>
                    <span>{t.common.age} {book.age}+</span>
                  </div>
                </div>
              </Link>
              <div className="mt-4">
                {book.stock > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleAddToCart(book)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    {t.common.addToCart}
                  </button>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                    {t.common.notAvailable}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
