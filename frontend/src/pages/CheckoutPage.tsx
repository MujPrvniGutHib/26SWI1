import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { addDays, getIsoDate, saveStoredOrder } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredProfileDetails } from '../utils/authStorage'
import { formatCurrency, getLocalizedCategory, useLocalePath, useTranslation } from '../utils/locale'

export function CheckoutPage() {
  const t = useTranslation()
  useDocumentTitle(t.checkoutPage.documentTitle)
  const { cartItems, clearCart } = useCart()
  const { isSignedIn } = useAuth()
  const toLocalePath = useLocalePath()
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'delivery' | 'billing' | 'overview'>(
    'details',
  )
  const [checkoutDetails, setCheckoutDetails] = useState(() => {
    if (!isSignedIn) {
      return {
        name: '',
        email: '',
        telephone: '',
        address: '',
      }
    }

    const profileDetails = getStoredProfileDetails()

    return {
      name: profileDetails.fullName,
      email: profileDetails.email,
      telephone: profileDetails.telephone,
      address: [
        profileDetails.street,
        profileDetails.city,
        profileDetails.zipCode,
        profileDetails.country,
      ]
        .filter(Boolean)
        .join(', '),
    }
  })
  const [billingOption, setBillingOption] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    validUntil: '',
    cvc: '',
  })
  const [purchaseMessage, setPurchaseMessage] = useState('')
  const [isPurchaseSubmitted, setIsPurchaseSubmitted] = useState(false)

  const billingOptions = t.checkoutPage.billingOptions
  const deliveryOptions = [
    {
      label: t.checkoutPage.deliveryOptions.homeDelivery,
      address: checkoutDetails.address || t.checkoutPage.deliveryOptions.checkoutAddress,
      price: 150,
    },
    {
      label: 'AlzaBox',
      price: 69,
      address: 'AlzaBox Ostrava Centrum, Nádražní 42, 702 00 Ostrava',
    },
    {
      label: 'PPL',
      price: 89,
      address: 'PPL Parcelshop, Masarykovo náměstí 18, 702 00 Ostrava',
    },
  ]

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  const isCustomerDetailsReady =
    checkoutDetails.name.trim() !== '' &&
    /\S+@\S+\.\S+/.test(checkoutDetails.email) &&
    checkoutDetails.telephone.trim() !== '' &&
    checkoutDetails.address.trim() !== ''
  const isCardDetailsReady =
    billingOption !== t.checkoutPage.billingOptions[1] ||
    (/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, '')) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.validUntil) &&
      /^\d{3}$/.test(cardDetails.cvc))
  const isCheckoutReady =
    isCustomerDetailsReady && deliveryOption !== '' && billingOption !== '' && isCardDetailsReady
  const selectedDelivery = deliveryOptions.find((option) => option.label === deliveryOption)
  const selectedDeliveryAddress = selectedDelivery?.address ?? ''
  const selectedDeliveryPrice = selectedDelivery?.price ?? 0
  const isDeliveryPriceApplied = checkoutStep === 'billing' || checkoutStep === 'overview'
  const orderTotal = itemsTotal + (isDeliveryPriceApplied ? selectedDeliveryPrice : 0)
  const maskedCardNumber = cardDetails.cardNumber
    ? `**** **** **** ${cardDetails.cardNumber.replace(/\s/g, '').slice(-4)}`
    : ''
  const primaryButtonClassName =
    'inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300'

  const handleBuy = () => {
    if (!isCheckoutReady || isPurchaseSubmitted) {
      return
    }

    const deliveryDays = Math.floor(Math.random() * 7) + 1
    const placedOnDate = new Date()
    const deliveryDueDate = addDays(placedOnDate, deliveryDays)
    setIsPurchaseSubmitted(true)

    if (isSignedIn) {
      const placedOn = placedOnDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

      saveStoredOrder({
        id: `ORD-${Date.now()}`,
        status: t.checkoutPage.order.preparing,
        placedOn,
        placedOnDate: getIsoDate(placedOnDate),
        deliveryDueDate: getIsoDate(deliveryDueDate),
        total: `${orderTotal} Kč`,
        itemsLabel: `${itemCount} ${
          itemCount === 1 ? t.checkoutPage.order.book : t.checkoutPage.order.books
        }`,
        deliveryCost: `${selectedDeliveryPrice} Kč`,
        deliveryMethod: deliveryOption,
        paymentMethod: billingOption,
        shippingAddress: selectedDeliveryAddress,
        billingAddress: checkoutDetails.address,
        timelineNote: t.checkoutPage.order.thanksTimeline
          .replace('{days}', String(deliveryDays))
          .replace(
            '{dayWord}',
            deliveryDays === 1 ? t.checkoutPage.order.day : t.checkoutPage.order.days,
          ),
        isActive: true,
        items: cartItems.map((item) => ({
          title: item.book.title,
          quantity: item.quantity,
          price: `${item.book.price * item.quantity} Kč`,
        })),
      })
    }

    setPurchaseMessage(
      t.checkoutPage.order.thankYouPurchase
        .replace('{days}', String(deliveryDays))
        .replace(
          '{dayWord}',
          deliveryDays === 1 ? t.checkoutPage.order.day : t.checkoutPage.order.days,
        ),
    )
    clearCart()
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={t.checkoutPage.hero.eyebrow}
        title={
          cartItems.length > 0
            ? t.checkoutPage.hero.reviewTitle
            : t.checkoutPage.hero.emptyTitle
        }
        description={
          cartItems.length > 0
            ? t.checkoutPage.hero.reviewDescription
            : t.checkoutPage.hero.emptyDescription
        }
      />

      <SectionCard eyebrow={t.checkoutPage.review.eyebrow} title={t.checkoutPage.review.title}>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const itemSubtotal = item.book.price * item.quantity

              return (
                <div
                  key={item.book.title}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                >
                  <Link to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)} className="shrink-0">
                    <img
                      src={item.book.coverUrl}
                      alt={`${item.book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                      className="h-24 w-18 rounded-lg object-cover shadow-sm"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                      className="text-sm font-semibold uppercase tracking-wide text-cyan-700 hover:underline"
                    >
                      {getLocalizedCategory(item.book.category, t)}
                    </Link>
                    <Link
                      to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                      className="block text-lg font-semibold text-slate-950 hover:underline"
                    >
                      {item.book.title}
                    </Link>
                    <p className="text-sm text-slate-600">{item.book.author}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.quantity} x {formatCurrency(item.book.price, t)}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-slate-600">{t.common.subtotal}</p>
                    <p className="text-xl font-semibold text-slate-950">
                      {formatCurrency(itemSubtotal, t)}
                    </p>
                  </div>
                </div>
              )
            })}

            <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">{t.checkoutPage.review.booksSubtotal}</p>
                <p className="text-lg font-semibold text-slate-950">
                  {formatCurrency(itemsTotal, t)}
                </p>
                {isDeliveryPriceApplied ? (
                  <>
                    <p className="mt-3 text-sm text-slate-600">
                      {t.checkoutPage.review.delivery} ({deliveryOption}):
                    </p>
                    <p className="text-lg font-semibold text-slate-950">
                      {formatCurrency(selectedDeliveryPrice, t)}
                    </p>
                  </>
                ) : null}
                <p className="mt-3 text-sm text-slate-600">{t.checkoutPage.review.orderTotal}</p>
                <p className="text-2xl font-semibold text-slate-950">
                  {formatCurrency(orderTotal, t)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-600">{t.checkoutPage.review.emptyMessage}</p>
            <Link
              to={toLocalePath('/catalog')}
              className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.common.browseCatalog}
            </Link>
          </div>
        )}
      </SectionCard>

      {cartItems.length > 0 ? (
        <SectionCard
          eyebrow={
            checkoutStep === 'details'
              ? t.checkoutPage.steps.customerDetails
              : checkoutStep === 'delivery'
                ? t.checkoutPage.steps.deliveryOptions
                : checkoutStep === 'billing'
                  ? t.checkoutPage.steps.billingOptions
                  : t.checkoutPage.steps.checkoutOverview
          }
          title={
            checkoutStep === 'details'
              ? t.checkoutPage.steps.startCheckout
              : checkoutStep === 'delivery'
                ? t.checkoutPage.steps.chooseDeliveryMethod
                : checkoutStep === 'billing'
                  ? t.checkoutPage.steps.choosePaymentMethod
                  : t.checkoutPage.steps.checkYourInformation
          }
        >
          {checkoutStep === 'details' ? (
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault()
                if (!isCustomerDetailsReady) {
                  return
                }

                setCheckoutStep('delivery')
              }}
            >
              <div>
                <label htmlFor="checkout-name" className="text-sm font-medium text-slate-700">
                  {t.checkoutPage.form.name}
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={checkoutDetails.name}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder={t.checkoutPage.form.namePlaceholder}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div>
                <label htmlFor="checkout-email" className="text-sm font-medium text-slate-700">
                  {t.checkoutPage.form.email}
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={checkoutDetails.email}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div>
                <label htmlFor="checkout-telephone" className="text-sm font-medium text-slate-700">
                  {t.checkoutPage.form.telephone}
                </label>
                <input
                  id="checkout-telephone"
                  type="tel"
                  required
                  value={checkoutDetails.telephone}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, telephone: event.target.value }))
                  }
                  placeholder="+420 777 123 456"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="checkout-address" className="text-sm font-medium text-slate-700">
                  {t.checkoutPage.form.address}
                </label>
                <textarea
                  id="checkout-address"
                  required
                  value={checkoutDetails.address}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, address: event.target.value }))
                  }
                  placeholder={t.checkoutPage.form.addressPlaceholder}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={!isCustomerDetailsReady}
                  className={primaryButtonClassName}
                >
                  {t.checkoutPage.steps.startCheckout}
                </button>
              </div>
            </form>
          ) : checkoutStep === 'delivery' ? (
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <label
                  key={option.label}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 transition hover:border-cyan-300 hover:bg-white"
                >
                  <input
                    type="checkbox"
                    checked={deliveryOption === option.label}
                    onChange={() => setDeliveryOption(option.label)}
                    className="mt-0.5 h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>
                    <span className="block font-medium">{option.label}</span>
                    <span className="mt-1 block text-slate-600">{option.address}</span>
                    <span className="mt-1 block font-medium text-slate-950">
                      + {formatCurrency(option.price, t)}
                    </span>
                  </span>
                </label>
              ))}
              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {t.common.back}
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('billing')}
                  disabled={deliveryOption === ''}
                  className={primaryButtonClassName}
                >
                  {t.checkoutPage.form.continueToBilling}
                </button>
              </div>
            </div>
          ) : checkoutStep === 'billing' ? (
            <div className="space-y-3">
              {billingOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 transition hover:border-cyan-300 hover:bg-white"
                >
                  <input
                    type="checkbox"
                    checked={billingOption === option}
                    onChange={() => setBillingOption(option)}
                    className="h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  {option}
                </label>
              ))}

              {billingOption === t.checkoutPage.billingOptions[1] ? (
                <div className="grid gap-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 md:grid-cols-3">
                  <div className="md:col-span-3">
                    <label htmlFor="card-number" className="text-sm font-medium text-slate-700">
                      {t.checkoutPage.form.cardNumber}
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={19}
                      pattern="[0-9 ]{19}"
                      value={cardDetails.cardNumber}
                      onChange={(event) =>
                        setCardDetails((current) => ({
                          ...current,
                          cardNumber: event.target.value
                            .replace(/\D/g, '')
                            .slice(0, 16)
                            .replace(/(.{4})/g, '$1 ')
                            .trim(),
                        }))
                      }
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="card-validity" className="text-sm font-medium text-slate-700">
                      {t.checkoutPage.form.dayOfValidity}
                    </label>
                    <input
                      id="card-validity"
                      type="text"
                      required
                      maxLength={5}
                      pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                      value={cardDetails.validUntil}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/\D/g, '').slice(0, 4)
                        const formattedValue =
                          digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits

                        setCardDetails((current) => ({
                          ...current,
                          validUntil: formattedValue,
                        }))
                      }}
                      placeholder="MM/YY"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-cvc" className="text-sm font-medium text-slate-700">
                      CVC
                    </label>
                    <input
                      id="card-cvc"
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={3}
                      pattern="[0-9]{3}"
                      value={cardDetails.cvc}
                      onChange={(event) =>
                        setCardDetails((current) => ({
                          ...current,
                          cvc: event.target.value.replace(/\D/g, '').slice(0, 3),
                        }))
                      }
                      placeholder="123"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setCheckoutStep('delivery')}
                className="mt-2 inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t.common.back}
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep('overview')}
                disabled={billingOption === '' || !isCardDetailsReady}
                className={`${primaryButtonClassName} ml-3 mt-2`}
              >
                {t.checkoutPage.form.continueToOverview}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t.checkoutPage.form.customer}
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.name}:</span>{' '}
                      {checkoutDetails.name}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.email}:</span>{' '}
                      {checkoutDetails.email}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.telephone}:</span>{' '}
                      {checkoutDetails.telephone}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.address}:</span>{' '}
                      {checkoutDetails.address}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t.checkoutPage.form.delivery}
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.method}</span> {deliveryOption}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.deliveryAddress}</span>{' '}
                      {selectedDeliveryAddress}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.deliveryPrice}</span>{' '}
                      {formatCurrency(selectedDeliveryPrice, t)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {t.checkoutPage.form.billing}
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">{t.checkoutPage.form.payment}</span> {billingOption}
                    </p>
                    {billingOption === t.checkoutPage.billingOptions[1] ? (
                      <>
                        <p>
                          <span className="font-medium text-slate-950">{t.checkoutPage.form.card}</span>{' '}
                          {maskedCardNumber}
                        </p>
                        <p>
                          <span className="font-medium text-slate-950">{t.checkoutPage.form.validUntil}</span>{' '}
                          {cardDetails.validUntil}
                        </p>
                        <p>
                          <span className="font-medium text-slate-950">CVC:</span> ***
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('billing')}
                  disabled={isPurchaseSubmitted}
                  className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {t.common.back}
                </button>
                <button
                  type="button"
                  onClick={handleBuy}
                  disabled={!isCheckoutReady || isPurchaseSubmitted}
                  className="inline-flex rounded-full bg-cyan-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300"
                >
                  {t.common.buy}
                </button>
              </div>
            </div>
          )}
        </SectionCard>
      ) : null}

      {purchaseMessage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-emerald-200 bg-white p-6 shadow-2xl shadow-slate-900/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  {t.checkoutPage.modal.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  {t.checkoutPage.modal.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPurchaseMessage('')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg leading-none text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label={t.common.closePurchaseMessage}
              >
                x
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">{purchaseMessage}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={toLocalePath('/')}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {t.common.home}
              </Link>
              {isSignedIn ? (
                <Link
                  to={toLocalePath('/profile')}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {t.common.profile}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
