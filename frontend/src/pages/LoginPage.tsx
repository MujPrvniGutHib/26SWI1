import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function LoginPage() {
  useDocumentTitle('Login | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Authentication"
        title="Sign in to your account"
        description="Use this route for the login form, validation, remember-me handling, and redirect logic after authentication."
      >
        <Link
          to="/register"
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Need an account?
        </Link>
      </PageHero>

      <SectionCard eyebrow="Login Form" title="Placeholder state">
        <p>Add email and password fields here, then connect them to Axios and your auth store.</p>
      </SectionCard>
    </div>
  )
}
