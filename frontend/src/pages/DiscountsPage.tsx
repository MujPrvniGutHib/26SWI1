import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, getLocalizedCategory, useLocalePath, useTranslation } from '../utils/locale'

const books = [
  {
    title: 'The Lost Expedition',
    author: 'Erik Hansen',
    category: 'Adventure stories',
    age: 12,
    price: 349,
    pages: 304,
    format: 'Hardcover',
    originalPrice: 399,
    discountPercent: 12,
    rating: 4.5,
    coverUrl: 'https://via.placeholder.com/150x200?text=Lost+Expedition',
    stock: 15,
  },
  {
    title: 'Moonlit Manor',
    author: 'Sara Doyle',
    category: 'Mystery',
    age: 16,
    price: 279,
    pages: 256,
    format: 'E-book',
    originalPrice: 279,
    discountPercent: 0,
    rating: 4.2,
    coverUrl: 'https://via.placeholder.com/150x200?text=Moonlit+Manor',
    stock: 8,
  },
  {
    title: 'Castle of Stars',
    author: 'Nina Růžičková',
    category: 'Fantasy',
    age: 14,
    price: 429,
    pages: 416,
    format: 'Hardcover',
    originalPrice: 429,
    discountPercent: 0,
    rating: 4.8,
    coverUrl: 'https://via.placeholder.com/150x200?text=Castle+of+Stars',
    stock: 23,
  },
  {
    title: 'Garden of Thorns',
    author: 'Mira Vale',
    category: 'Fantasy',
    age: 13,
    price: 359,
    pages: 336,
    format: 'Hardcover',
    originalPrice: 399,
    discountPercent: 10,
    rating: 4.7,
    coverUrl: 'https://via.placeholder.com/150x200?text=Garden+of+Thorns',
    stock: 14,
  },
  {
    title: 'The Ember Crown',
    author: 'Tomas Reed',
    category: 'Fantasy',
    age: 15,
    price: 389,
    pages: 392,
    format: 'Hardcover',
    originalPrice: 389,
    discountPercent: 0,
    rating: 4.4,
    coverUrl: 'https://via.placeholder.com/150x200?text=Ember+Crown',
    stock: 9,
  },
  {
    title: 'Winds of Aralon',
    author: 'Elena Frost',
    category: 'Fantasy',
    age: 12,
    price: 329,
    pages: 288,
    format: 'E-book',
    originalPrice: 329,
    discountPercent: 0,
    rating: 4.1,
    coverUrl: 'https://via.placeholder.com/150x200?text=Winds+of+Aralon',
    stock: 20,
  },
  {
    title: 'Dragonfall Night',
    author: 'Jonas Black',
    category: 'Fantasy',
    age: 16,
    price: 449,
    pages: 512,
    format: 'Audiobook',
    originalPrice: 499,
    discountPercent: 10,
    rating: 4.6,
    coverUrl: 'https://via.placeholder.com/150x200?text=Dragonfall+Night',
    stock: 11,
  },
  {
    title: 'The Silver Oracle',
    author: 'Clara Moon',
    category: 'Fantasy',
    age: 14,
    price: 299,
    pages: 264,
    format: 'E-book',
    originalPrice: 299,
    discountPercent: 0,
    rating: 4.0,
    coverUrl: 'https://via.placeholder.com/150x200?text=Silver+Oracle',
    stock: 17,
  },
  {
    title: 'Forest of the Hollow King',
    author: 'Adam Kral',
    category: 'Fantasy',
    age: 15,
    price: 419,
    pages: 456,
    format: 'Hardcover',
    originalPrice: 419,
    discountPercent: 0,
    rating: 4.5,
    coverUrl: 'https://via.placeholder.com/150x200?text=Hollow+King',
    stock: 6,
  },
  {
    title: 'Spellbound Harbor',
    author: 'Iris Lake',
    category: 'Fantasy',
    age: 10,
    price: 259,
    pages: 224,
    format: 'E-book',
    originalPrice: 279,
    discountPercent: 7,
    rating: 4.2,
    coverUrl: 'https://via.placeholder.com/150x200?text=Spellbound+Harbor',
    stock: 25,
  },
  {
    title: 'Ashes of the Moon Gate',
    author: 'Ronan Grey',
    category: 'Fantasy',
    age: 17,
    price: 469,
    pages: 540,
    format: 'Hardcover',
    originalPrice: 469,
    discountPercent: 0,
    rating: 4.7,
    coverUrl: 'https://via.placeholder.com/150x200?text=Moon+Gate',
    stock: 8,
  },
  {
    title: 'The Crystal Familiar',
    author: 'Petra Wild',
    category: 'Fantasy',
    age: 11,
    price: 289,
    pages: 248,
    format: 'Audiobook',
    originalPrice: 289,
    discountPercent: 0,
    rating: 4.3,
    coverUrl: 'https://via.placeholder.com/150x200?text=Crystal+Familiar',
    stock: 19,
  },
  {
    title: 'The War Dispatch',
    author: 'Jakub Martínek',
    category: 'War',
    age: 18,
    price: 399,
    pages: 384,
    format: 'Audiobook',
    originalPrice: 449,
    discountPercent: 11,
    rating: 4.0,
    coverUrl: 'https://via.placeholder.com/150x200?text=War+Dispatch',
    stock: 5,
  },
  {
    title: 'Voices of Autumn',
    author: 'Lena Novak',
    category: 'Poetry',
    age: 10,
    price: 199,
    pages: 112,
    format: 'E-book',
    originalPrice: 199,
    discountPercent: 0,
    rating: 4.3,
    coverUrl: 'https://via.placeholder.com/150x200?text=Voices+of+Autumn',
    stock: 0,
  },
  {
    title: 'A Room for Two',
    author: 'Olivia Svobodová',
    category: 'Romance',
    age: 16,
    price: 339,
    pages: 320,
    format: 'Hardcover',
    originalPrice: 379,
    discountPercent: 11,
    rating: 4.6,
    coverUrl: 'https://via.placeholder.com/150x200?text=Room+for+Two',
    stock: 12,
  },
  {
    title: 'Beyond the Fog',
    author: 'Ondřej Čech',
    category: 'Horror',
    age: 18,
    price: 319,
    pages: 280,
    format: 'Audiobook',
    originalPrice: 319,
    discountPercent: 0,
    rating: 3.9,
    coverUrl: 'https://via.placeholder.com/150x200?text=Beyond+the+Fog',
    stock: 7,
  },
  {
    title: 'Czech Heroes',
    author: 'Martina Pavlíková',
    category: 'Historical fiction',
    age: 15,
    price: 379,
    pages: 448,
    format: 'Hardcover',
    originalPrice: 379,
    discountPercent: 0,
    rating: 4.4,
    coverUrl: 'https://via.placeholder.com/150x200?text=Czech+Heroes',
    stock: 3,
  },
  {
    title: 'The Memoir of Anna',
    author: 'Anna Dvořáková',
    category: 'Autobiography and memoir',
    age: 20,
    price: 299,
    pages: 272,
    format: 'E-book',
    originalPrice: 299,
    discountPercent: 0,
    rating: 4.1,
    coverUrl: 'https://via.placeholder.com/150x200?text=Memoir+of+Anna',
    stock: 18,
  },
]

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
