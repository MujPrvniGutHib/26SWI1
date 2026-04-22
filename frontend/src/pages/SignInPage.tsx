import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { cn } from '../utils/cn'

type AuthTab = 'login' | 'register'

const tabCopy: Record<
  AuthTab,
  {
    eyebrow: string
    title: string
    description: string
    buttonLabel: string
    footerText: string
    footerAction: string
  }
> = {
  login: {
    eyebrow: 'Welcome Back',
    title: 'Log in to continue shopping',
    description:
      'Access your cart, profile, and past orders from one place. This starter form is ready to connect to your backend later.',
    buttonLabel: 'Log in',
    footerText: "Don't have an account yet?",
    footerAction: 'Create one',
  },
  register: {
    eyebrow: 'New Here',
    title: 'Create your bookstore account',
    description:
      'Save your details, track orders, and make checkout faster. This starter form is ready for your registration endpoint.',
    buttonLabel: 'Create account',
    footerText: 'Already registered?',
    footerAction: 'Log in',
  },
}

export function SignInPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login')
  const copy = tabCopy[activeTab]

  useDocumentTitle('Sign In | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Authentication"
        title="One place for login and registration"
        description="Users can now switch between login and registration inside one shared auth screen instead of jumping between separate pages."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-medium transition',
                  activeTab === tab
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950',
                )}
              >
                {tab === 'login' ? 'Log In' : 'Register'}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {copy.description}
            </p>
          </div>

          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>{copy.footerText}</span>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
              className="font-medium text-cyan-700 transition hover:text-cyan-800"
            >
              {copy.footerAction}
            </button>
          </div>
        </section>

        <SectionCard eyebrow="Why Sign In" title="A cleaner customer entry point">
          <div className="grid gap-3">
            {[
              'Login and registration stay on one route for a simpler flow.',
              'The tab layout works well on desktop and mobile.',
              'Each form can be connected to Axios and Zustand later without changing the page structure.',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/profile"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View profile route
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Read about us
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <form className="mt-8 grid gap-5">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          placeholder="name@example.com"
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          Remember me
        </label>
        <button type="button" className="font-medium text-cyan-700 transition hover:text-cyan-800">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Log in
      </button>
    </form>
  )
}

function RegisterForm() {
  return (
    <form className="mt-8 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">First name</span>
          <input
            type="text"
            placeholder="Vojtech"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Last name</span>
          <input
            type="text"
            placeholder="Szymiczek"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          placeholder="name@example.com"
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            placeholder="Create a password"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Confirm password</span>
          <input
            type="password"
            placeholder="Repeat your password"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
        <span>I agree to the terms and want to create a bookstore account.</span>
      </label>

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Create account
      </button>
    </form>
  )
}
