import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const folders = ['components/', 'pages/', 'hooks/', 'utils/']

export function HomePage() {
  useDocumentTitle('Home | SWI Frontend')

  return (
    <div className="flex flex-col gap-6">
      <PageHero
        eyebrow="Home"
        title="Welcome at Find my Book"
        description="Here you can find books of your dreams and nightmares. We can provide you with any book that you might be interested in. Don't be shy and jump into the magical word of books."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalog"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open catalog
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <SectionCard eyebrow="Account" title="Sign in or register from one place">
            <p>
              The authentication flow now starts on a single page where visitors can choose
              whether they want to log in or create a new account.
            </p>
            <Link
              to="/sign-in"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Open sign in
            </Link>
          </SectionCard>

          <SectionCard eyebrow="About Us" title="Tell visitors who you are">
            <p>
              Add your store story, mission, team, and what makes your bookstore feel distinct.
            </p>
            <Link
              to="/about"
              className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Open about us
            </Link>
          </SectionCard>
        </div>

        <SectionCard
          eyebrow="Project Setup"
          title="Tailwind and the base app structure are in place"
          actions={
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                href="https://tailwindcss.com/docs/installation/framework-guides/vite"
                target="_blank"
                rel="noreferrer"
              >
                Tailwind Docs
              </a>
              <a
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                href="https://vite.dev/guide/"
                target="_blank"
                rel="noreferrer"
              >
                Vite Guide
              </a>
            </div>
          }
        >
          <p>
            The frontend now has a clean starting structure for screens, shared UI, reusable
            hooks, and utility helpers. You can build new features without stuffing everything
            into <code className="rounded bg-slate-100 px-2 py-1">App.tsx</code>.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {folders.map((folder) => (
              <div
                key={folder}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <p className="font-mono text-sm text-slate-700">src/{folder}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
