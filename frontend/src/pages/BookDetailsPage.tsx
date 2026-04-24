import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

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

export function BookDetailsPage() {
  const { bookId } = useParams()
  const { addToCart } = useCart()
  const decodedTitle = bookId ? decodeURIComponent(bookId) : ''
  const book = books.find((b) => b.title === decodedTitle)
  useDocumentTitle(`${book?.title || 'Book Details'} | SWI Frontend`)

  if (!book) {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow="Book Not Found"
          title="Book not found"
          description="The requested book could not be found."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Book Details"
        title={book.title}
        description={`By ${book.author} • ${book.category}`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalog"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to catalog
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
              Add to cart
            </button>
          ) : (
            <span className="rounded-full border border-slate-300 bg-slate-200 px-5 py-3 text-sm font-medium text-slate-500 cursor-not-allowed">
              Not available
            </span>
          )}
        </div>
      </PageHero>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard eyebrow="Overview" title="Book Information">
          <div className="space-y-4">
            <div className="flex gap-6">
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="h-48 w-32 rounded-lg object-cover shadow-sm"
              />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{book.category}</p>
                <h2 className="text-2xl font-semibold text-slate-950">{book.title}</h2>
                <p className="text-lg text-slate-600">by {book.author}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-slate-500">({book.rating})</span>
                </div>
                <p className="text-sm text-slate-600">
                  In stock: <span className="font-semibold">{book.stock}</span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Specs" title="Details">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Price:</span>
              <span className="font-semibold">{book.price} Kč</span>
            </div>
            {book.discountPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Original Price:</span>
                <span className="text-slate-500 line-through">{book.originalPrice} Kč</span>
              </div>
            )}
            {book.discountPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Discount:</span>
                <span className="text-red-600 font-semibold">-{book.discountPercent}%</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">Pages:</span>
              <span>{book.pages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Format:</span>
              <span>{book.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Age:</span>
              <span>{book.age}+</span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <span className="text-slate-600">Description:</span>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
