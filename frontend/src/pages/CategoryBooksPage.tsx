import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

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

export function CategoryBooksPage() {
  const { category } = useParams<{ category: string }>()
  const categoryTitle = category ? categoryMap[category] : undefined

  useDocumentTitle(categoryTitle ? `${categoryTitle} | SWI Frontend` : 'Category | SWI Frontend')

  const filteredBooks = categoryTitle
    ? books.filter((book) => book.category === categoryTitle)
    : []

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Category"
        title={categoryTitle ?? 'Unknown category'}
        description={
          categoryTitle
            ? `Explore books that are marked under ${categoryTitle}.`
            : 'The requested category was not found.'
        }
      >
        <Link
          to="/catalog"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Back to catalog
        </Link>
      </PageHero>

      <SectionCard eyebrow="Books" title={categoryTitle ?? 'No category selected'}>
        {filteredBooks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => (
              <div key={book.title} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                <Link to={`/books/${encodeURIComponent(book.title)}`} className="flex flex-1 flex-row-reverse gap-4 items-center pl-14 pr-6 py-5">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="h-32 w-24 rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{book.category}</p>
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
                      <span>{book.pages} pages</span>
                      <span>{book.price} Kč</span>
                      <span>Age {book.age}+</span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-5">
                  {book.stock > 0 ? (
                    <Link
                      to="/cart"
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      Add to cart
                    </Link>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                      Not available
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            <p className="text-base font-medium">No books are currently marked for this category.</p>
            <p className="mt-3 text-sm">Try returning to the catalog to choose another book type.</p>
          </div>
        )}
      </SectionCard>
    </div>
  )
}
