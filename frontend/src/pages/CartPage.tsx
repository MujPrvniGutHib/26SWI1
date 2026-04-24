import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLocalePath } from '../utils/locale'

export function CartPage() {
  useDocumentTitle('Cart | SWI Frontend')
  const { cartItems, updateQuantity, removeItem } = useCart()
  const toLocalePath = useLocalePath()

  const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Cart"
        title={cartItems.length > 0 ? 'Woah thats a lot of books!' : 'Your cart is empty'}
        description={
          cartItems.length > 0
            ? "It's our pleasure to send you your books. Just click the button below to continue to checkout and finalize your order."
            : 'Add books from the catalog and they will appear here once you put them into the cart.'
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={toLocalePath('/catalog')}
            className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Back to catalog
          </Link>
          {cartItems.length > 0 ? (
            <Link
              to={toLocalePath('/checkout')}
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Continue to checkout
            </Link>
          ) : null}
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
                <Link to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)} className="shrink-0">
                  <img
                    src={item.book.coverUrl}
                    alt={`${item.book.title} cover`}
                    className="h-24 w-18 rounded-lg object-cover shadow-sm"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                    className="text-sm font-semibold uppercase tracking-wide text-cyan-700 hover:underline"
                  >
                    {item.book.category}
                  </Link>
                  <Link
                    to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                    className="block text-lg font-semibold text-slate-950 hover:underline"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-sm text-slate-600">{item.book.author}</p>
                  <p className="mt-1 font-medium text-slate-900">{item.book.price} Kc</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.book.title, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.book.title, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
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
                <p className="text-2xl font-semibold text-slate-950">{total} Kc</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link
              to={toLocalePath('/catalog')}
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
