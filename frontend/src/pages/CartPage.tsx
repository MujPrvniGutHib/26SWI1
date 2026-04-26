import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, getLocalizedCategory, useLocalePath, useTranslation } from '../utils/locale'

export function CartPage() {
  const t = useTranslation()
  useDocumentTitle(t.cartPage.documentTitle)
  const { cartItems, updateQuantity, removeItem } = useCart()
  const toLocalePath = useLocalePath()

  const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.cartPage.hero.eyebrow}
        title={cartItems.length > 0 ? t.cartPage.hero.fullTitle : t.cartPage.hero.emptyTitle}
        description={
          cartItems.length > 0
            ? t.cartPage.hero.fullDescription
            : t.cartPage.hero.emptyDescription
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={toLocalePath('/catalog')}
            className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            {t.common.backToCatalog}
          </Link>
          {cartItems.length > 0 ? (
            <Link
              to={toLocalePath('/checkout')}
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.cartPage.hero.continueToCheckout}
            </Link>
          ) : null}
        </div>
      </PageHero>

      <SectionCard eyebrow={t.cartPage.section.eyebrow} title={t.cartPage.section.title}>
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
                    alt={`${item.book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                    className="h-24 w-18 rounded-lg object-cover shadow-sm"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                    className="text-sm font-semibold uppercase tracking-wide text-cyan-700 hover:underline"
                  >
                    {getLocalizedCategory(item.book.category, t)}
                  </Link>
                  <Link
                    to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                    className="block text-lg font-semibold text-slate-950 hover:underline"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-sm text-slate-600">{item.book.author}</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatCurrency(item.book.price, t)}
                  </p>
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
                    {t.common.remove}
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">{t.common.total}:</p>
                <p className="text-2xl font-semibold text-slate-950">{formatCurrency(total, t)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-600">{t.cartPage.section.emptyMessage}</p>
            <Link
              to={toLocalePath('/catalog')}
              className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.common.browseCatalog}
            </Link>
          </div>
        )}
      </SectionCard>
    </div>
  )
}
