import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { deleteStoredOrders, getAllOrders, type OrderRecord } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  deleteStoredProfile,
  getStoredAccount,
  getStoredProfileDetails,
  saveStoredAccount,
  saveStoredProfileDetails,
} from '../utils/authStorage'
import {
  getLocalizedCountry,
  getLocalizedDeliveryMethod,
  getLocalizedOrderStatus,
  getOrderTimelineNote,
  formatCurrencyText,
  useLocalePath,
  useTranslation,
} from '../utils/locale'

export function ProfilePage() {
  const t = useTranslation()
  useDocumentTitle(t.profilePage.documentTitle)
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const toLocalePath = useLocalePath()
  const allOrders = getAllOrders()
  const activeOrders = allOrders.filter((order) => order.isActive)
  const previousOrders = allOrders.filter((order) => !order.isActive)
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [profileDetails, setProfileDetails] = useState(() => getStoredProfileDetails())
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
    const currentAccount = getStoredAccount()

    if (!currentAccount || deletePassword !== currentAccount.password) {
      setDeleteError(t.profilePage.security.errors.deleteWrongPassword)
      return
    }

    deleteStoredProfile()
    deleteStoredOrders()
    signOut()
    navigate(toLocalePath('/sign-in'))
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const currentAccount = getStoredAccount()

    if (!currentAccount) {
      setPasswordSuccess('')
      setPasswordError(t.profilePage.security.errors.noSavedAccount)
      return
    }

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmNewPassword
    ) {
      setPasswordSuccess('')
      setPasswordError(t.profilePage.security.errors.missingFields)
      return
    }

    if (passwordForm.currentPassword !== currentAccount.password) {
      setPasswordSuccess('')
      setPasswordError(t.profilePage.security.errors.wrongCurrentPassword)
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordSuccess('')
      setPasswordError(t.profilePage.security.errors.shortPassword)
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordSuccess('')
      setPasswordError(t.profilePage.security.errors.passwordMismatch)
      return
    }

    saveStoredAccount({
      ...currentAccount,
      password: passwordForm.newPassword,
    })
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
    setPasswordError('')
    setPasswordSuccess(t.profilePage.security.success)
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
            onSubmit={(event) => {
              event.preventDefault()
              saveStoredProfileDetails(profileDetails)

              const currentAccount = getStoredAccount()

              if (currentAccount) {
                const [firstName, ...restName] = profileDetails.fullName.trim().split(/\s+/)

                saveStoredAccount({
                  ...currentAccount,
                  firstName: firstName || currentAccount.firstName,
                  lastName: restName.join(' ') || currentAccount.lastName,
                  email: profileDetails.email.trim() || currentAccount.email,
                })
              }

              setIsEditingDetails(false)
            }}
          >
            <ProfileField
              label={t.profilePage.accountDetails.fields.fullName}
              value={profileDetails.fullName}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, fullName: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.email}
              value={profileDetails.email}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, email: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.telephone}
              value={profileDetails.telephone}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, telephone: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.company}
              value={profileDetails.company}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, company: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.streetAndNumber}
              value={profileDetails.street}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, street: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.city}
              value={profileDetails.city}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, city: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.zipCode}
              value={profileDetails.zipCode}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, zipCode: value }))}
            />
            <ProfileField
              label={t.profilePage.accountDetails.fields.country}
              value={profileDetails.country}
              displayValue={getLocalizedCountry(profileDetails.country, t)}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, country: value }))}
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
              <Link
                to={toLocalePath('/sign-in')}
                onClick={(event) => {
                  event.preventDefault()
                  handleSignOut()
                }}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t.profilePage.security.signOff}
              </Link>
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

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow={t.profilePage.orders.activeEyebrow}
          title={t.profilePage.orders.activeTitle}
        >
          <div className="grid gap-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => <OrderCard key={order.id} order={order} highlight />)
            ) : (
              <EmptyOrderState message={t.profilePage.orders.emptyActive} />
            )}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow={t.profilePage.orders.historyEyebrow}
          title={t.profilePage.orders.historyTitle}
        >
          <div className="grid gap-4">
            {previousOrders.length > 0 ? (
              previousOrders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState message={t.profilePage.orders.emptyHistory} />
            )}
          </div>
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

function EmptyOrderState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm leading-6 text-slate-600">
      {message}
    </div>
  )
}

function OrderCard({
  order,
  highlight = false,
}: {
  order: OrderRecord
  highlight?: boolean
}) {
  const t = useTranslation()
  const toLocalePath = useLocalePath()

  return (
    <Link
      to={toLocalePath(`/profile/orders/${encodeURIComponent(order.id)}`)}
      className={
        highlight
          ? 'block rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-5 transition hover:border-cyan-300 hover:bg-cyan-100'
          : 'block rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-slate-300 hover:bg-slate-100'
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{order.id}</p>
          <p className="mt-1 text-sm text-slate-600">
            {t.profilePage.orders.placedOn} {order.placedOn}
          </p>
        </div>
        <span
          className={
            highlight
              ? 'rounded-full bg-cyan-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white'
              : 'rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700'
          }
        >
          {getLocalizedOrderStatus(order.status, t)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
        <span>{order.itemsLabel}</span>
        {order.deliveryCost ? (
          <span>
            {t.profilePage.orders.delivery} {formatCurrencyText(order.deliveryCost, t)}
            {order.deliveryMethod ? ` (${getLocalizedDeliveryMethod(order.deliveryMethod, t)})` : ''}
          </span>
        ) : null}
        <span>
          {t.profilePage.orders.totalPrice} {formatCurrencyText(order.total, t)}
        </span>
        <span>{getOrderTimelineNote(order, t)}</span>
        <span className="font-medium text-cyan-700">{t.profilePage.orders.openDetails}</span>
      </div>
    </Link>
  )
}
