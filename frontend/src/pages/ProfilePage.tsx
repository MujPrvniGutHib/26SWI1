import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLocalePath, useTranslation } from '../utils/locale'
import { api } from '../utils/api'

export function ProfilePage() {
  const t = useTranslation()
  useDocumentTitle(t.profilePage.documentTitle)
  const navigate = useNavigate()
  const { signOut, getUser, signIn } = useAuth()
  const toLocalePath = useLocalePath()
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [profileDetails, setProfileDetails] = useState(() => getUser())
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const handleSignOut = () => {
    signOut()
    navigate(toLocalePath('/sign-in'))
  }

  const handleDeleteProfile = () => {
    // This would be an API call in a real application
    console.log('Deleting profile...')
    signOut()
    navigate(toLocalePath('/sign-in'))
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // This would be an API call in a real application
    console.log('Changing password...')
  }

  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updatedUser = { ...getUser(), ...profileDetails }
    try {
      await api.put('/api/users/profile', {
        username: profileDetails.username,
        email: profileDetails.email,
        telephone: profileDetails.telephone,
        address: profileDetails.address,
      });
      signIn(updatedUser)
      setIsEditingDetails(false)
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.profilePage.hero.eyebrow}
        title={t.profilePage.hero.title}
        description={t.profilePage.hero.description}
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          eyebrow={t.profilePage.accountDetails.eyebrow}
          title={t.profilePage.accountDetails.title}
          actions={
            isEditingDetails ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  form="profile-details-form"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {t.profilePage.accountDetails.saveChanges}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingDetails(false)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {t.common.cancel}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingDetails(true)}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t.profilePage.accountDetails.editInformation}
              </button>
            )
          }
        >
          <form
            id="profile-details-form"
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={handleProfileSave}
          >
            <ProfileField
              label={t.profilePage.accountDetails.fields.fullName}
              value={profileDetails.username}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current: any) => ({ ...current, username: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.email}
              value={profileDetails.email}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current: any) => ({ ...current, email: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.telephone}
              value={profileDetails.telephone || ''}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current: any) => ({ ...current, telephone: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.streetAndNumber}
              value={profileDetails.address || ''}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current: any) => ({ ...current, address: value }))}
            />
          </form>
        </SectionCard>

        <SectionCard eyebrow={t.profilePage.security.eyebrow} title={t.profilePage.security.title}>
          <form className="grid gap-5" onSubmit={handlePasswordChange}>
            <PasswordField
              label={t.profilePage.security.currentPassword}
              placeholder={t.profilePage.security.currentPasswordPlaceholder}
              value={passwordForm.currentPassword}
              onChange={(value) => {
                setPasswordForm((current) => ({ ...current, currentPassword: value }))
                setPasswordError('')
                setPasswordSuccess('')
              }}
            />
            <PasswordField
              label={t.profilePage.security.newPassword}
              placeholder={t.profilePage.security.newPasswordPlaceholder}
              value={passwordForm.newPassword}
              onChange={(value) => {
                setPasswordForm((current) => ({ ...current, newPassword: value }))
                setPasswordError('')
                setPasswordSuccess('')
              }}
            />
            <PasswordField
              label={t.profilePage.security.confirmNewPassword}
              placeholder={t.profilePage.security.confirmNewPasswordPlaceholder}
              value={passwordForm.confirmNewPassword}
              onChange={(value) => {
                setPasswordForm((current) => ({ ...current, confirmNewPassword: value }))
                setPasswordError('')
                setPasswordSuccess('')
              }}
            />

            {passwordError ? <p className="text-sm font-medium text-rose-600">{passwordError}</p> : null}
            {passwordSuccess ? (
              <p className="text-sm font-medium text-emerald-700">{passwordSuccess}</p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {t.profilePage.security.updatePassword}
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t.profilePage.security.signOff}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeletePassword('')
                  setDeleteError('')
                  setIsDeleteModalOpen(true)
                }}
                className="rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
              >
                {t.profilePage.security.deleteProfile}
              </button>
            </div>
          </form>
        </SectionCard>
      </div>

      {isDeleteModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl shadow-slate-900/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-700">
              {t.profilePage.deleteModal.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {t.profilePage.deleteModal.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              {t.profilePage.deleteModal.description}
            </p>

            <label className="mt-5 grid gap-2">
              <span className="text-sm font-medium text-slate-700">{t.common.password}</span>
              <input
                type="password"
                value={deletePassword}
                onChange={(event) => {
                  setDeletePassword(event.target.value)
                  setDeleteError('')
                }}
                placeholder={t.profilePage.deleteModal.passwordPlaceholder}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-600 focus:bg-white"
              />
            </label>

            {deleteError ? (
              <p className="mt-3 text-sm font-medium text-rose-600">{deleteError}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setDeletePassword('')
                  setDeleteError('')
                }}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="rounded-full bg-rose-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
              >
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ProfileField({
  label,
  value,
  displayValue,
  isEditing = false,
  onChange,
}: {
  label: string
  value: string
  displayValue?: string
  isEditing?: boolean
  onChange?: (value: string) => void
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-cyan-700"
        />
      ) : (
        <p className="mt-2 text-sm font-medium text-slate-900">{displayValue ?? value}</p>
      )}
    </div>
  )
}

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
      />
    </label>
  )
}
