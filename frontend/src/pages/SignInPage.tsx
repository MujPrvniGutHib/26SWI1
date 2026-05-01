import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { api } from '../utils/api'
import { cn } from '../utils/cn'
import { useLocalePath, useTranslation } from '../utils/locale'

type AuthTab = 'login' | 'register'

const inputClassName =
  'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white'

export function SignInPage() {
  const t = useTranslation()
  const [activeTab, setActiveTab] = useState<AuthTab>('login')
  const [profileMessage, setProfileMessage] = useState('')
  const { isSignedIn, signIn } = useAuth()
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()
  const copy = activeTab === 'login' ? t.signInPage.login : t.signInPage.register

  useDocumentTitle(t.signInPage.documentTitle)

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
                {tab === 'login' ? t.signInPage.tabs.logIn : t.signInPage.tabs.register}
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
              onSuccess={(user) => {
                signIn(user)
                setProfileMessage('')
                navigate(toLocalePath('/profile'))
              }}
            />
          ) : (
            <RegisterForm
              onSuccess={(user) => {
                signIn(user)
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

        <SectionCard
          eyebrow={t.signInPage.whySignIn.eyebrow}
          title={t.signInPage.whySignIn.title}
        >
          <div className="grid gap-3">
            {t.signInPage.whySignIn.items.map((item) => (
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
                  setProfileMessage(t.signInPage.whySignIn.notLoggedIn)
                  return
                }

                setProfileMessage('')
              }}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.signInPage.whySignIn.viewProfile}
            </Link>
            <Link
              to={toLocalePath('/about')}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              {t.signInPage.whySignIn.readAboutUs}
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

function LoginForm({ onSuccess }: { onSuccess: (user: any) => void }) {
  const t = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const toLocalePath = useLocalePath()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      setError(t.signInPage.loginForm.missingCredentials)
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError(t.signInPage.loginForm.invalidEmail)
      return
    }

    try {
      const response = await api.post('/api/auth/signin', { email: normalizedEmail, password })
      setError('')
      onSuccess(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || t.signInPage.loginForm.wrongCredentials)
    }
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">{t.signInPage.loginForm.email}</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className={inputClassName}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">
          {t.signInPage.loginForm.password}
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={t.signInPage.loginForm.passwordPlaceholder}
          className={inputClassName}
        />
      </label>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <div className="flex flex-wrap justify-start gap-3 text-sm text-slate-600">
        <Link
          to={toLocalePath('/reset-password')}
          className="font-medium text-cyan-700 transition hover:text-cyan-800"
        >
          {t.signInPage.loginForm.forgotPassword}
        </Link>
      </div>

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        {t.signInPage.login.buttonLabel}
      </button>
    </form>
  )
}

function RegisterForm({ onSuccess }: { onSuccess: (user: any) => void }) {
  const t = useTranslation()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  })
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const normalizedEmail = form.email.trim().toLowerCase()

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !normalizedEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(t.signInPage.registerForm.missingFields)
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError(t.signInPage.registerForm.invalidEmail)
      return
    }

    if (form.password.length < 8) {
      setError(t.signInPage.registerForm.shortPassword)
      return
    }

    if (form.password !== form.confirmPassword) {
      setError(t.signInPage.registerForm.passwordMismatch)
      return
    }

    if (!form.acceptedTerms) {
      setError(t.signInPage.registerForm.termsRequired)
      return
    }

    try {
      await api.post('/api/auth/signup', {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: normalizedEmail,
        password: form.password,
      })
      const response = await api.post('/api/auth/signin', {
        email: normalizedEmail,
        password: form.password,
      })
      setError('')
      onSuccess(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.')
    }
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {t.signInPage.registerForm.firstName}
          </span>
          <input
            type="text"
            value={form.firstName}
            onChange={(event) =>
              setForm((current) => ({ ...current, firstName: event.target.value }))
            }
            placeholder="Vojtech"
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {t.signInPage.registerForm.lastName}
          </span>
          <input
            type="text"
            value={form.lastName}
            onChange={(event) =>
              setForm((current) => ({ ...current, lastName: event.target.value }))
            }
            placeholder="Szymiczek"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">{t.signInPage.registerForm.email}</span>
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
          <span className="text-sm font-medium text-slate-700">
            {t.signInPage.registerForm.password}
          </span>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            placeholder={t.signInPage.registerForm.passwordPlaceholder}
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {t.signInPage.registerForm.confirmPassword}
          </span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({ ...current, confirmPassword: event.target.value }))
            }
            placeholder={t.signInPage.registerForm.confirmPasswordPlaceholder}
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
        <span>{t.signInPage.registerForm.terms}</span>
      </label>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <button
        type="submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        {t.signInPage.register.buttonLabel}
      </button>
    </form>
  )
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}
