import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, getLocalizedCategory, useLocalePath, useTranslation } from '../utils/locale'

const categoryMap: Record<string, string> = {
  'adventure-stories': 'Adventure stories',
  classics: 'Classics',
  crime: 'Crime',
  'fairy-tales': 'Fairy tales',
  fantasy: 'Fantasy',
  'historical-fiction': 'Historical fiction',
  horror: 'Horror',
  'humour-and-satire': 'Humour and satire',
  'literary-fiction': 'Literary fiction',
  mystery: 'Mystery',
  poetry: 'Poetry',
  plays: 'Plays',
  romance: 'Romance',
  'science-fiction': 'Science fiction',
  'short-stories': 'Short stories',
  thrillers: 'Thrillers',
  war: 'War',
  'womens-fiction': 'Women’s fiction',
  'young-adult': 'Young adult',
  'autobiography-and-memoir': 'Autobiography and memoir',
  biography: 'Biography',
}

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

const BOOKS_PER_PAGE = 9

export function CategoryBooksPage() {
  const t = useTranslation()
  const { category } = useParams<{ category: string }>()
  const { addToCart } = useCart()
  const [pagination, setPagination] = useState({ categoryTitle: '', page: 1 })
  const toLocalePath = useLocalePath()
  const categoryTitle = category ? categoryMap[category] : undefined
  const categoryIndex = category ? Object.keys(categoryMap).indexOf(category) : -1
  const localizedCategoryTitle = category
    ? t.categories[categoryIndex]?.title ?? categoryTitle
    : undefined
  const currentPage =
    pagination.categoryTitle === categoryTitle ? pagination.page : 1

  useDocumentTitle(
    localizedCategoryTitle
      ? `${localizedCategoryTitle} | SWI Frontend`
      : t.categoryBooksPage.documentTitleFallback,
  )

  const filteredBooks = categoryTitle
    ? books.filter((book) => book.category === categoryTitle)
    : []
  const pageCount = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE,
  )

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
        eyebrow={t.categoryBooksPage.heroEyebrow}
        title={localizedCategoryTitle ?? t.categoryBooksPage.unknownCategory}
        description={
          categoryTitle
            ? `${t.categoryBooksPage.categoryDescriptionPrefix} ${localizedCategoryTitle}.`
            : t.categoryBooksPage.categoryNotFound
        }
      >
        <Link
          to={toLocalePath('/catalog')}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {t.common.backToCatalog}
        </Link>
      </PageHero>

      <SectionCard
        eyebrow={t.categoryBooksPage.sectionEyebrow}
        title={localizedCategoryTitle ?? t.categoryBooksPage.noCategorySelected}
      >
        {filteredBooks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedBooks.map((book) => (
              <div key={book.title} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                <Link to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)} className="flex flex-1 flex-row-reverse gap-4 items-center pl-14 pr-6 py-5">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                    className="h-32 w-24 rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                      {getLocalizedCategory(book.category, t)}
                    </p>
                    <h2 className="text-lg font-semibold text-slate-950">{book.title}</h2>
                    <p className="text-sm text-slate-600">{book.author}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                      <span className="ml-0.5 text-xs text-slate-500">({book.rating})</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm text-slate-500 pt-1">
                      <span>{book.pages} {t.common.pages}</span>
                      <span>{formatCurrency(book.price, t)}</span>
                      <span>{t.common.age} {book.age}+</span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-5">
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
            {pageCount > 1 ? (
              <div className="col-span-full mt-4 flex justify-center gap-2">
                {Array.from({ length: pageCount }, (_, index) => {
                  const pageNumber = index + 1

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() =>
                        setPagination({ categoryTitle: categoryTitle ?? '', page: pageNumber })
                      }
                      className={
                        currentPage === pageNumber
                          ? 'flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white'
                          : 'flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50'
                      }
                    >
                      {pageNumber}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            <p className="text-base font-medium">{t.categoryBooksPage.noBooksForCategory}</p>
            <p className="mt-3 text-sm">{t.categoryBooksPage.chooseAnotherType}</p>
          </div>
        )}
      </SectionCard>
    </div>
  )
}
