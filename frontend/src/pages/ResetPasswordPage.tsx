import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredAccount, saveStoredAccount } from '../utils/authStorage'
import { useLocalePath, useTranslation } from '../utils/locale'

const inputClassName =
  'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white'

export function ResetPasswordPage() {
  const t = useTranslation()
  const [email, setEmail] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()

  useDocumentTitle(t.resetPasswordPage.documentTitle)

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const storedAccount = getStoredAccount()

    if (!normalizedEmail) {
      setError(t.resetPasswordPage.errors.missingEmail)
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError(t.resetPasswordPage.errors.invalidEmail)
      return
    }

    if (!storedAccount || storedAccount.email.toLowerCase() !== normalizedEmail) {
      setError(t.resetPasswordPage.errors.noAccount)
      return
    }

    setVerifiedEmail(normalizedEmail)
    setError('')
    setSuccess('')
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const storedAccount = getStoredAccount()

    if (!storedAccount || storedAccount.email.toLowerCase() !== verifiedEmail) {
      setError(t.resetPasswordPage.errors.unavailableAccount)
      return
    }

    if (!newPassword || !confirmPassword) {
      setError(t.resetPasswordPage.errors.missingPasswords)
      return
    }

    if (newPassword.length < 8) {
      setError(t.resetPasswordPage.errors.shortPassword)
      return
    }

    if (newPassword !== confirmPassword) {
      setError(t.resetPasswordPage.errors.passwordMismatch)
      return
    }

    saveStoredAccount({
      ...storedAccount,
      password: newPassword,
    })
    setError('')
    setSuccess(t.resetPasswordPage.success)
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.resetPasswordPage.hero.eyebrow}
        title={t.resetPasswordPage.hero.title}
        description={t.resetPasswordPage.hero.description}
      >
        <Link
          to={toLocalePath('/sign-in')}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {t.resetPasswordPage.hero.backToSignIn}
        </Link>
      </PageHero>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          eyebrow={t.resetPasswordPage.stepOne.eyebrow}
          title={t.resetPasswordPage.stepOne.title}
        >
          <form className="grid gap-5" onSubmit={handleEmailSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                {t.resetPasswordPage.stepOne.email}
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError('')
                }}
                placeholder="name@example.com"
                className={inputClassName}
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.resetPasswordPage.stepOne.verifyEmail}
            </button>
          </form>
        </SectionCard>

        <SectionCard
          eyebrow={t.resetPasswordPage.stepTwo.eyebrow}
          title={t.resetPasswordPage.stepTwo.title}
        >
          {verifiedEmail ? (
            <form className="grid gap-5" onSubmit={handlePasswordSubmit}>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-4 text-sm leading-6 text-slate-700">
                {t.resetPasswordPage.stepTwo.verifiedAccount}{' '}
                <span className="font-medium">{verifiedEmail}</span>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {t.resetPasswordPage.stepTwo.newPassword}
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  placeholder={t.resetPasswordPage.stepTwo.newPasswordPlaceholder}
                  className={inputClassName}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {t.resetPasswordPage.stepTwo.confirmNewPassword}
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  placeholder={t.resetPasswordPage.stepTwo.confirmNewPasswordPlaceholder}
                  className={inputClassName}
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {t.resetPasswordPage.stepTwo.saveNewPassword}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(toLocalePath('/sign-in'))}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {t.resetPasswordPage.stepTwo.goToSignIn}
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm leading-6 text-slate-600">
              {t.resetPasswordPage.stepTwo.waitingForEmail}
            </div>
          )}
        </SectionCard>
      </div>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
      {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}
    </div>
  )
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}
