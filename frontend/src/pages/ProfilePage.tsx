import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ProfilePage() {
  useDocumentTitle('Profile | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Profile"
        title="Customer account dashboard"
        description="Use this route for personal details, saved addresses, order history, wishlist items, and account settings."
      />

      <SectionCard eyebrow="Profile Modules" title="Ready for expansion">
        <p>Break profile features into cards or tabs once the API and account state are in place.</p>
      </SectionCard>
    </div>
  )
}
