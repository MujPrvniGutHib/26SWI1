import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function RegisterPage() {
  useDocumentTitle('Register | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Authentication"
        title="Create a new account"
        description="Use this route for sign-up fields, password confirmation, validation, and onboarding after registration."
      >
        <Link
          to="/login"
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Already have an account?
        </Link>
      </PageHero>

      <SectionCard eyebrow="Register Form" title="Placeholder state">
        <p>Add name, email, password, and password-confirmation fields here when the auth flow is ready.</p>
      </SectionCard>
    </div>
  )
}
