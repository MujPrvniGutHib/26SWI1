import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const books = [
  {
    title: 'The Lost Expedition',
    author: 'Erik Hansen',
    category: 'Adventure stories',
    price: 349,
    coverUrl: 'https://via.placeholder.com/150x200?text=Lost+Expedition',
    stock: 15,
  },
  {
    title: 'Moonlit Manor',
    author: 'Sara Doyle',
    category: 'Mystery',
    price: 279,
    coverUrl: 'https://via.placeholder.com/150x200?text=Moonlit+Manor',
    stock: 8,
  },
  {
    title: 'Castle of Stars',
    author: 'Nina Růžičková',
    category: 'Fantasy',
    price: 429,
    coverUrl: 'https://via.placeholder.com/150x200?text=Castle+of+Stars',
    stock: 23,
  },
  {
    title: 'The War Dispatch',
    author: 'Jakub Martínek',
    category: 'War',
    price: 399,
    coverUrl: 'https://via.placeholder.com/150x200?text=War+Dispatch',
    stock: 5,
  },
  {
    title: 'A Room for Two',
    author: 'Olivia Svobodová',
    category: 'Romance',
    price: 339,
    coverUrl: 'https://via.placeholder.com/150x200?text=Room+for+Two',
    stock: 12,
  },
]

interface CartItem {
  book: typeof books[0]
  quantity: number
}

export function CartPage() {
  useDocumentTitle('Cart | SWI Frontend')

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: books[0], quantity: 2 },
    { book: books[2], quantity: 1 },
    { book: books[4], quantity: 3 },
  ])

  const updateQuantity = (title: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) => {
          if (item.book.title === title) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : item
          }
          return item
        })
    )
  }

  const removeItem = (title: string) => {
    setCartItems((items) => items.filter((item) => item.book.title !== title))
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  )

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Cart"
        title="Woah thats a lot of books!"
        description="It's our pleasure to send you your books. Just click the button below to continue to checkout and finalize your order."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalog"
            className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Back to catalog
          </Link>
          <Link
            to="/checkout"
            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Continue to checkout
          </Link>
        </div>
      </PageHero>

      <SectionCard eyebrow="Cart State" title="Your books">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.book.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <Link
                  to={`/books/${encodeURIComponent(item.book.title)}`}
                  className="shrink-0"
                >
                  <img
                    src={item.book.coverUrl}
                    alt={`${item.book.title} cover`}
                    className="h-24 w-18 rounded-lg object-cover shadow-sm"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/books/${encodeURIComponent(item.book.title)}`}
                    className="text-sm font-semibold uppercase tracking-wide text-cyan-700 hover:underline"
                  >
                    {item.book.category}
                  </Link>
                  <Link
                    to={`/books/${encodeURIComponent(item.book.title)}`}
                    className="block text-lg font-semibold text-slate-950 hover:underline"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-sm text-slate-600">{item.book.author}</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {item.book.price} Kč
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.book.title, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.book.title, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.book.title)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Total:</p>
                <p className="text-2xl font-semibold text-slate-950">
                  {total} Kč
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link
              to="/catalog"
              className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Browse catalog
            </Link>
          </div>
        )}
      </SectionCard>
    </div>
  )
}
