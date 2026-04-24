export type StoredAccount = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type StoredProfileDetails = {
  fullName: string
  email: string
  telephone: string
  company: string
  street: string
  city: string
  zipCode: string
  country: string
}

const REGISTERED_ACCOUNT_KEY = 'swi-auth-account'
const PROFILE_DETAILS_KEY = 'swi-profile-details'

export function getStoredAccount() {
  const storedValue = window.localStorage.getItem(REGISTERED_ACCOUNT_KEY)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as StoredAccount
  } catch {
    return null
  }
}

export function saveStoredAccount(account: StoredAccount) {
  window.localStorage.setItem(REGISTERED_ACCOUNT_KEY, JSON.stringify(account))
}

export function getDefaultProfileDetails(): StoredProfileDetails {
  const storedAccount = getStoredAccount()

  return {
    fullName: storedAccount ? `${storedAccount.firstName} ${storedAccount.lastName}` : '',
    email: storedAccount?.email ?? '',
    telephone: '+420 777 123 456',
    company: 'SWI Customer',
    street: 'Masarykova 12',
    city: 'Ostrava',
    zipCode: '702 00',
    country: 'Czech Republic',
  }
}

export function getStoredProfileDetails() {
  const storedValue = window.localStorage.getItem(PROFILE_DETAILS_KEY)

  if (!storedValue) {
    return getDefaultProfileDetails()
  }

  try {
    return {
      ...getDefaultProfileDetails(),
      ...(JSON.parse(storedValue) as Partial<StoredProfileDetails>),
    }
  } catch {
    return getDefaultProfileDetails()
  }
}

export function saveStoredProfileDetails(details: StoredProfileDetails) {
  window.localStorage.setItem(PROFILE_DETAILS_KEY, JSON.stringify(details))
}

export function deleteStoredProfile() {
  window.localStorage.removeItem(REGISTERED_ACCOUNT_KEY)
  window.localStorage.removeItem(PROFILE_DETAILS_KEY)
}
