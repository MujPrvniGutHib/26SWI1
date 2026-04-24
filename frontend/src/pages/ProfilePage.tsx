import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { orders, type OrderRecord } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredAccount, saveStoredAccount } from '../utils/authStorage'

export function ProfilePage() {
  useDocumentTitle('Profile | SWI Frontend')
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const storedAccount = getStoredAccount()
  const activeOrders = orders.filter((order) => order.isActive)
  const previousOrders = orders.filter((order) => !order.isActive)
  const [isEditingDetails, setIsEditingDetails] = useState(false)
  const [profileDetails, setProfileDetails] = useState({
    fullName: storedAccount ? `${storedAccount.firstName} ${storedAccount.lastName}` : '',
    email: storedAccount?.email ?? '',
    telephone: '+420 777 123 456',
    company: 'SWI Customer',
    street: 'Masarykova 12',
    city: 'Ostrava',
    zipCode: '702 00',
    country: 'Czech Republic',
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleSignOut = () => {
    signOut()
    navigate('/sign-in')
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const currentAccount = getStoredAccount()

    if (!currentAccount) {
      setPasswordSuccess('')
      setPasswordError('No saved account was found. Please register again.')
      return
    }

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmNewPassword
    ) {
      setPasswordSuccess('')
      setPasswordError('Fill in all password fields first.')
      return
    }

    if (passwordForm.currentPassword !== currentAccount.password) {
      setPasswordSuccess('')
      setPasswordError('Current password is not correct.')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordSuccess('')
      setPasswordError('New password must have at least 8 characters.')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordSuccess('')
      setPasswordError('New passwords do not match.')
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
    setPasswordSuccess('Password updated. You can now sign in with the new password after signing off.')
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Profile"
        title="Your account overview"
        description="Check your contact details, billing information, password settings, and order progress in one place."
      />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          eyebrow="Account Details"
          title="Personal and billing information"
          actions={
            isEditingDetails ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  form="profile-details-form"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingDetails(false)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingDetails(true)}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Edit information
              </button>
            )
          }
        >
          <form
            id="profile-details-form"
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault()
              setIsEditingDetails(false)
            }}
          >
            <ProfileField
              label="Full name"
              value={profileDetails.fullName}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, fullName: value }))}
            />
            <ProfileField
              label="E-mail"
              value={profileDetails.email}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, email: value }))}
            />
            <ProfileField
              label="Telephone"
              value={profileDetails.telephone}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, telephone: value }))}
            />
            <ProfileField
              label="Company"
              value={profileDetails.company}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, company: value }))}
            />
            <ProfileField
              label="Street and number"
              value={profileDetails.street}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, street: value }))}
            />
            <ProfileField
              label="City"
              value={profileDetails.city}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, city: value }))}
            />
            <ProfileField
              label="ZIP code"
              value={profileDetails.zipCode}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, zipCode: value }))}
            />
            <ProfileField
              label="Country"
              value={profileDetails.country}
              isEditing={isEditingDetails}
              onChange={(value) => setProfileDetails((current) => ({ ...current, country: value }))}
            />
          </form>
        </SectionCard>

        <SectionCard eyebrow="Security" title="Change password">
          <form className="grid gap-5" onSubmit={handlePasswordChange}>
            <PasswordField
              label="Current password"
              placeholder="Enter your current password"
              value={passwordForm.currentPassword}
              onChange={(value) => {
                setPasswordForm((current) => ({ ...current, currentPassword: value }))
                setPasswordError('')
                setPasswordSuccess('')
              }}
            />
            <PasswordField
              label="New password"
              placeholder="Enter a new password"
              value={passwordForm.newPassword}
              onChange={(value) => {
                setPasswordForm((current) => ({ ...current, newPassword: value }))
                setPasswordError('')
                setPasswordSuccess('')
              }}
            />
            <PasswordField
              label="Confirm new password"
              placeholder="Repeat the new password"
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
                Update password
              </button>
              <Link
                to="/sign-in"
                onClick={(event) => {
                  event.preventDefault()
                  handleSignOut()
                }}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Sign off
              </Link>
            </div>
          </form>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Orders" title="Active order">
          <div className="grid gap-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => <OrderCard key={order.id} order={order} highlight />)
            ) : (
              <EmptyOrderState message="You do not have any active orders yet." />
            )}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Order History" title="Old orders">
          <div className="grid gap-4">
            {previousOrders.length > 0 ? (
              previousOrders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState message="Your completed orders will show up here after your first purchase." />
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function ProfileField({
  label,
  value,
  isEditing = false,
  onChange,
}: {
  label: string
  value: string
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
        <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
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
  return (
    <Link
      to={`/profile/orders/${encodeURIComponent(order.id)}`}
      className={
        highlight
          ? 'block rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-5 transition hover:border-cyan-300 hover:bg-cyan-100'
          : 'block rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-slate-300 hover:bg-slate-100'
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{order.id}</p>
          <p className="mt-1 text-sm text-slate-600">Placed on {order.placedOn}</p>
        </div>
        <span
          className={
            highlight
              ? 'rounded-full bg-cyan-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white'
              : 'rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700'
          }
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
        <span>{order.itemsLabel}</span>
        <span>{order.total}</span>
        <span className="font-medium text-cyan-700">Open details</span>
      </div>
    </Link>
  )
}
