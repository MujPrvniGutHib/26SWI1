import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function CheckoutPage() {
  useDocumentTitle('Checkout | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Checkout"
        title="Complete shipping and payment"
        description="This page is ready for address forms, delivery options, payment integration, and order confirmation logic."
      />

      <SectionCard eyebrow="Form Areas" title="Suggested sections">
        <p>Build shipping details, billing details, payment method, and order review as separate components.</p>
      </SectionCard>
    </div>
  )
}
