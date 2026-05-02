import { useLocation } from 'react-router-dom'
import { getRemainingDeliveryDays, isOrderDelivered, type OrderRecord } from '../data/orders'
import { translations, type Language, type Translation } from '../i18n/translation'

const CZK_PER_EUR = 25

export function getLocalePrefix(pathname: string) {
  return pathname === '/cz' || pathname.startsWith('/cz/') ? '/cz' : ''
}

export function withoutLocalePrefix(pathname: string) {
  if (pathname === '/cz') {
    return '/'
  }

  if (pathname.startsWith('/cz/')) {
    return pathname.slice(3) || '/'
  }

  return pathname
}

export function useLocalePath() {
  const location = useLocation()
  const localePrefix = getLocalePrefix(location.pathname)

  return (to: string) => {
    if (!to.startsWith('/')) {
      return to
    }

    const newPath = `${localePrefix}${to === '/' ? '' : to}` || '/'
    return newPath.startsWith('/') ? newPath : `/${newPath}`
  }
}

export function useLanguage(): Language {
  const location = useLocation()

  return getLocalePrefix(location.pathname) === '/cz' ? 'cz' : 'en'
}

export function useTranslation() {
  return translations[useLanguage()]
}

export function getLocalizedOrderStatus(status: string, t: Translation) {
  const preparingStatuses = [
    translations.en.checkoutPage.order.preparing,
    translations.cz.checkoutPage.order.preparing,
  ]
  const deliveredStatuses = [
    translations.en.checkoutPage.order.delivered,
    translations.cz.checkoutPage.order.delivered,
  ]

  if (preparingStatuses.includes(status)) {
    return t.checkoutPage.order.preparing
  }

  if (deliveredStatuses.includes(status)) {
    return t.checkoutPage.order.delivered
  }

  return status
}

export function getLocalizedCategory(category: string, t: Translation) {
  const categoryIndex = translations.en.categories.findIndex((entry) => entry.title === category)

  return t.categories[categoryIndex]?.title ?? category
}

export function getLocalizedFormat(format: string, t: Translation) {
  const formatEntries = [
    ['Hardcover', 'hardcover'],
    ['Hardcover book', 'hardcoverBook'],
    ['E-book', 'ebook'],
    ['Audiobook', 'audiobook'],
  ] as const

  const entry = formatEntries.find(([englishFormat]) => englishFormat === format)

  return entry ? t.formats[entry[1]] : format
}

export function getLocalizedDeliveryMethod(method: string, t: Translation) {
  const deliveryEntries = [
    [translations.en.checkoutPage.deliveryOptions.homeDelivery, 'homeDelivery'],
    [translations.en.checkoutPage.deliveryOptions.alzaBox, 'alzaBox'],
    [translations.en.checkoutPage.deliveryOptions.ppl, 'ppl'],
    [translations.cz.checkoutPage.deliveryOptions.homeDelivery, 'homeDelivery'],
    [translations.cz.checkoutPage.deliveryOptions.alzaBox, 'alzaBox'],
    [translations.cz.checkoutPage.deliveryOptions.ppl, 'ppl'],
  ] as const

  const entry = deliveryEntries.find(([label]) => label === method)

  return entry ? t.checkoutPage.deliveryOptions[entry[1]] : method
}

export function getLocalizedPaymentMethod(method: string, t: Translation) {
  const englishIndex = translations.en.checkoutPage.billingOptions.findIndex((label) => label === method)
  const czechIndex = translations.cz.checkoutPage.billingOptions.findIndex((label) => label === method)
  const optionIndex = englishIndex >= 0 ? englishIndex : czechIndex

  return optionIndex >= 0 ? t.checkoutPage.billingOptions[optionIndex] : method
}

export function getLocalizedCountry(country: string, t: Translation) {
  if (country === 'Czech Republic' && t === translations.cz) {
    return 'Česká republika'
  }

  return country
}

export function getLocalizedTimelineNote(note: string, t: Translation) {
  const englishTimelinePattern = /^Thanks for your purchase\. Your order should be delivered in (\d+) (day|days)\.$/
  const match = note.match(englishTimelinePattern)

  if (!match) {
    return note
  }

  const days = Number(match[1])
  const dayWord = days === 1 ? t.checkoutPage.order.day : t.checkoutPage.order.days

  return t.checkoutPage.order.thanksTimeline
    .replace('{days}', String(days))
    .replace('{dayWord}', dayWord)
    .replace('{dnů}', String(days))
    .replace('{denníSlovo}', dayWord)
}

export function getOrderTimelineNote(order: OrderRecord, t: Translation) {
  if (isOrderDelivered(order)) {
    return t.checkoutPage.order.deliveredTimeline
  }

  const remainingDays = getRemainingDeliveryDays(order)

  if (remainingDays === null) {
    return getLocalizedTimelineNote(order.timelineNote, t)
  }

  const dayWord = remainingDays === 1 ? t.checkoutPage.order.day : t.checkoutPage.order.days

  return t.checkoutPage.order.thanksTimeline
    .replace('{days}', String(remainingDays))
    .replace('{dayWord}', dayWord)
}

export function formatCurrency(amountCzk: number, t: Translation) {
  if (t === translations.cz) {
    return `${amountCzk} Kč`
  }

  return `€${(amountCzk / CZK_PER_EUR).toFixed(2)}`
}

export function formatCurrencyText(value: string, t: Translation) {
  const normalizedValue = value.replace(/\bKc\b/g, 'Kč')
  const match = normalizedValue.match(/^(-?\d+(?:[.,]\d+)?)\s*Kč$/)

  if (!match) {
    return normalizedValue
  }

  return formatCurrency(Number(match[1].replace(',', '.')), t)
}

export function useLanguageLinks() {
  const location = useLocation()
  const unprefixedPath = withoutLocalePrefix(location.pathname)
  const pathWithSearch = `${unprefixedPath}${location.search}${location.hash}`

  return {
    enPath: pathWithSearch.startsWith('/') ? pathWithSearch : `/${pathWithSearch}`,
    czPath: `/cz${pathWithSearch === '/' ? '' : pathWithSearch}`,
  }
}
