import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredAccount, saveStoredAccount } from '../utils/authStorage'
import { cn } from '../utils/cn'
import { useLocalePath } from '../utils/locale'

type AuthTab = 'login' | 'register'

const inputClassName =
  'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white'

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
  const [profileMessage, setProfileMessage] = useState('')
  const { isSignedIn, signIn } = useAuth()
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()
  const copy = tabCopy[activeTab]

  useDocumentTitle('Sign In | SWI Frontend')

  return (
    <div className="space-y-6">
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

          {activeTab === 'login' ? (
            <LoginForm
              onSuccess={() => {
                signIn()
                setProfileMessage('')
                navigate(toLocalePath('/profile'))
              }}
            />
          ) : (
            <RegisterForm
              onSuccess={() => {
                signIn()
                setProfileMessage('')
                navigate(toLocalePath('/profile'))
              }}
            />
          )}

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

        <SectionCard eyebrow="Why Sign In" title="Make your life easier">
          <div className="grid gap-3">
            {[
              'Look at your orders old or active.',
              'You don’t have to write anything in checkout.',
              'Each month you can win a ticket for 100Kč off your order.',
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
              to={toLocalePath('/profile')}
              onClick={(event) => {
                if (!isSignedIn) {
                  event.preventDefault()
                  setProfileMessage('Not logged in.')
                  return
                }

                setProfileMessage('')
              }}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View profile
            </Link>
            <Link
              to={toLocalePath('/about')}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Read about us
            </Link>
          </div>

          {profileMessage ? (
            <p className="text-sm font-medium text-rose-600">{profileMessage}</p>
          ) : null}
        </SectionCard>
      </div>
    </div>
  )
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const toLocalePath = useLocalePath()

  return (
    <form
      className="mt-8 grid gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        const normalizedEmail = email.trim().toLowerCase()
        const storedAccount = getStoredAccount()

        if (!normalizedEmail || !password) {
          setError('Enter both your e-mail and password.')
          return
        }

        if (!isValidEmail(normalizedEmail)) {
          setError('Enter a valid e-mail address.')
          return
        }

        if (!storedAccount) {
          setError('No account found yet. Create one in the registration tab first.')
          return
        }

        if (
          normalizedEmail !== storedAccount.email.toLowerCase() ||
          password !== storedAccount.password
        ) {
          setError('The e-mail or password is not correct.')
          return
        }

        setError('')
        onSuccess()
      }}
    >
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className={inputClassName}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className={inputClassName}
        />
      </label>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <div className="flex flex-wrap justify-start gap-3 text-sm text-slate-600">
        <Link
          to={toLocalePath('/reset-password')}
          className="font-medium text-cyan-700 transition hover:text-cyan-800"
        >
          Forgot password?
        </Link>
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

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  })
  const [error, setError] = useState('')

  return (
    <form
      className="mt-8 grid gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        const normalizedEmail = form.email.trim().toLowerCase()

        if (
          !form.firstName.trim() ||
          !form.lastName.trim() ||
          !normalizedEmail ||
          !form.password ||
          !form.confirmPassword
        ) {
          setError('Fill in all required fields before creating the account.')
          return
        }

        if (!isValidEmail(normalizedEmail)) {
          setError('Enter a valid e-mail address.')
          return
        }

        if (form.password.length < 8) {
          setError('Password must have at least 8 characters.')
          return
        }

        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.')
          return
        }

        if (!form.acceptedTerms) {
          setError('You need to agree to the terms before creating the account.')
          return
        }

        saveStoredAccount({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: normalizedEmail,
          password: form.password,
        })
        setError('')
        onSuccess()
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">First name</span>
          <input
            type="text"
            value={form.firstName}
            onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
            placeholder="Vojtech"
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Last name</span>
          <input
            type="text"
            value={form.lastName}
            onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
            placeholder="Szymiczek"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="name@example.com"
          className={inputClassName}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Create a password"
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Confirm password</span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({ ...current, confirmPassword: event.target.value }))
            }
            placeholder="Repeat your password"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          checked={form.acceptedTerms}
          onChange={(event) =>
            setForm((current) => ({ ...current, acceptedTerms: event.target.checked }))
          }
          className="mt-1 h-4 w-4 rounded border-slate-300"
        />
        <span>I agree to the terms and want to create a bookstore account.</span>
      </label>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Create account
      </button>
    </form>
  )
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}
