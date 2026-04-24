import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredAccount, saveStoredAccount } from '../utils/authStorage'
import { useLocalePath } from '../utils/locale'

const inputClassName =
  'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white'

export function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()

  useDocumentTitle('Reset Password | SWI Frontend')

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const storedAccount = getStoredAccount()

    if (!normalizedEmail) {
      setError('Enter your e-mail address first.')
      return
    }

    if (!isValidEmail(normalizedEmail)) {
      setError('Enter a valid e-mail address.')
      return
    }

    if (!storedAccount || storedAccount.email.toLowerCase() !== normalizedEmail) {
      setError('No account was found for this e-mail address.')
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
      setError('This account is no longer available. Try the recovery process again.')
      return
    }

    if (!newPassword || !confirmPassword) {
      setError('Fill in both password fields.')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must have at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    saveStoredAccount({
      ...storedAccount,
      password: newPassword,
    })
    setError('')
    setSuccess('Password updated successfully. You can now sign in with your new password.')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Password Recovery"
        title="Restore your password"
        description="Confirm your account e-mail first, then choose a new password for your sign-in."
      >
        <Link
          to={toLocalePath('/sign-in')}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Back to sign in
        </Link>
      </PageHero>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard eyebrow="Step 1" title="Verify your e-mail">
          <form className="grid gap-5" onSubmit={handleEmailSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">E-mail</span>
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
              Verify e-mail
            </button>
          </form>
        </SectionCard>

        <SectionCard eyebrow="Step 2" title="Set a new password">
          {verifiedEmail ? (
            <form className="grid gap-5" onSubmit={handlePasswordSubmit}>
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-4 text-sm leading-6 text-slate-700">
                Verified account: <span className="font-medium">{verifiedEmail}</span>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">New password</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  placeholder="Enter your new password"
                  className={inputClassName}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Confirm new password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  placeholder="Repeat your new password"
                  className={inputClassName}
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Save new password
                </button>
                <button
                  type="button"
                  onClick={() => navigate(toLocalePath('/sign-in'))}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Go to sign in
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm leading-6 text-slate-600">
              Enter a valid registered e-mail on the left before you can create a new password.
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
