export type StoredAccount = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const REGISTERED_ACCOUNT_KEY = 'swi-auth-account'

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
