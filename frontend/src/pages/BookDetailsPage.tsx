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
    description: 'Join Erik Hansen on an unforgettable journey through uncharted territories filled with danger, discovery, and wonder. A thrilling adventure that captures the spirit of exploration.',
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
    description: 'A gripping mystery set in an ancient manor where secrets hide behind every door. Sara Doyle weaves an intricate plot of suspense and surprising revelations.',
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
    description: 'Explore a magical realm where a castle floats among the stars. An epic fantasy adventure filled with enchantment, heroism, and timeless magic that will captivate readers.',
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
    description: 'A cursed royal garden hides ancient magic, dangerous bargains, and a secret that could save an entire kingdom.',
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
    description: 'A runaway heir must claim a burning crown before rival kingdoms awaken the fire beneath the mountains.',
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
    description: 'Sky sailors, storm spirits, and a young mapmaker collide in a floating world ruled by magical winds.',
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
    description: 'When dragons fall from the stars, a village hunter discovers the night sky has been hiding an old war.',
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
    description: 'A reluctant seer follows silver visions through a city of mirrors where every prophecy has a price.',
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
    description: 'Deep in an enchanted forest, a forgotten king waits for someone brave enough to break his hollow crown.',
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
    description: 'A seaside town of enchanted ships and talking lanterns becomes the key to rescuing a lost moon.',
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
    description: 'After a lunar portal shatters, rival mages race through its ashes to stop an empire from returning.',
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
    description: 'A student mage bonds with a crystal creature that remembers spells no one else can read.',
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
    description: 'A powerful narrative of courage and sacrifice during wartime. Jakub Martínek chronicles the extraordinary stories of soldiers facing impossible odds and finding hope in darkness.',
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
    description: 'A collection of beautiful and haunting verses that capture the essence of autumn. Lena Novak\'s poetry explores themes of change, reflection, and natural beauty.',
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
    description: 'A tender romance about two souls discovering love in unexpected circumstances. Olivia Svobodová crafts an emotional journey about connection, vulnerability, and lasting devotion.',
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
    description: 'A chilling tale of terror that unfolds in the depths of an impenetrable fog. Ondřej Čech creates an atmosphere of dread where danger lurks at every turn.',
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
    description: 'An inspiring chronicle of Czech heroes who shaped history through courage and conviction. Martina Pavlíková brings historical figures to life with vivid storytelling.',
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
    description: 'A poignant personal account of Anna\'s life journey, filled with triumphs and challenges. This memoir offers intimate insights into personal growth, resilience, and self-discovery.',
    stock: 18,
  },
]

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
