import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CartPage() {
  useDocumentTitle('Cart | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Cart"
        title="Shopping cart overview"
        description="This route is ready for line items, quantity controls, price totals, coupon handling, and cart persistence."
      >
        <Link
          to="/checkout"
          className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Continue to checkout
        </Link>
      </PageHero>

      <SectionCard eyebrow="Cart State" title="Placeholder summary">
        <p>Connect this page to Zustand or Context when you are ready to manage cart state.</p>
      </SectionCard>
    </div>
  )
}
