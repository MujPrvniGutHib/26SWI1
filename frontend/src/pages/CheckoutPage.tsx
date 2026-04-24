import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { saveStoredOrder } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getStoredProfileDetails } from '../utils/authStorage'
import { useLocalePath } from '../utils/locale'

export function CheckoutPage() {
  useDocumentTitle('Checkout | SWI Frontend')
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

  const billingOptions = ['Cash', 'Online card payment', 'Pay on delivery']
  const deliveryOptions = [
    {
      label: 'Home delivery',
      address: checkoutDetails.address || 'Your checkout address',
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
    billingOption !== 'Online card payment' ||
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
    setIsPurchaseSubmitted(true)

    if (isSignedIn) {
      const placedOn = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

      saveStoredOrder({
        id: `ORD-${Date.now()}`,
        status: 'Preparing',
        placedOn,
        total: `${orderTotal} Kc`,
        itemsLabel: `${itemCount} ${itemCount === 1 ? 'book' : 'books'}`,
        deliveryCost: `${selectedDeliveryPrice} Kc`,
        deliveryMethod: deliveryOption,
        paymentMethod: billingOption,
        shippingAddress: selectedDeliveryAddress,
        billingAddress: checkoutDetails.address,
        timelineNote: `Thanks for your purchase. Your order should be delivered in ${deliveryDays} ${
          deliveryDays === 1 ? 'day' : 'days'
        }.`,
        isActive: true,
        items: cartItems.map((item) => ({
          title: item.book.title,
          quantity: item.quantity,
          price: `${item.book.price * item.quantity} Kc`,
        })),
      })
    }

    setPurchaseMessage(
      `Thank you for your purchase and we are happy you chose us. Your order will be delivered in ${deliveryDays} ${
        deliveryDays === 1 ? 'day' : 'days'
      }.`,
    )
    clearCart()
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Checkout"
        title={cartItems.length > 0 ? 'Review your order' : 'Your cart is empty'}
        description={
          cartItems.length > 0
            ? 'Check the books in your cart before completing shipping and payment.'
            : 'Add books from the catalog before continuing to checkout.'
        }
      />

      <SectionCard eyebrow="Order Review" title="Books in your cart">
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
                      alt={`${item.book.title} cover`}
                      className="h-24 w-18 rounded-lg object-cover shadow-sm"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                      className="text-sm font-semibold uppercase tracking-wide text-cyan-700 hover:underline"
                    >
                      {item.book.category}
                    </Link>
                    <Link
                      to={toLocalePath(`/books/${encodeURIComponent(item.book.title)}`)}
                      className="block text-lg font-semibold text-slate-950 hover:underline"
                    >
                      {item.book.title}
                    </Link>
                    <p className="text-sm text-slate-600">{item.book.author}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.quantity} x {item.book.price} Kc
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-slate-600">Subtotal</p>
                    <p className="text-xl font-semibold text-slate-950">{itemSubtotal} Kc</p>
                  </div>
                </div>
              )
            })}

            <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Books subtotal:</p>
                <p className="text-lg font-semibold text-slate-950">{itemsTotal} Kc</p>
                {isDeliveryPriceApplied ? (
                  <>
                    <p className="mt-3 text-sm text-slate-600">Delivery ({deliveryOption}):</p>
                    <p className="text-lg font-semibold text-slate-950">
                      {selectedDeliveryPrice} Kc
                    </p>
                  </>
                ) : null}
                <p className="mt-3 text-sm text-slate-600">Order total:</p>
                <p className="text-2xl font-semibold text-slate-950">{orderTotal} Kc</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-600">There are no books in your cart yet.</p>
            <Link
              to={toLocalePath('/catalog')}
              className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Browse catalog
            </Link>
          </div>
        )}
      </SectionCard>

      {cartItems.length > 0 ? (
        <SectionCard
          eyebrow={
            checkoutStep === 'details'
              ? 'Customer Details'
              : checkoutStep === 'delivery'
                ? 'Delivery Options'
                : checkoutStep === 'billing'
                  ? 'Billing Options'
                  : 'Checkout Overview'
          }
          title={
            checkoutStep === 'details'
              ? 'Start checkout'
              : checkoutStep === 'delivery'
                ? 'Choose delivery method'
                : checkoutStep === 'billing'
                  ? 'Choose payment method'
                  : 'Check your information'
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
                  Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={checkoutDetails.name}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div>
                <label htmlFor="checkout-email" className="text-sm font-medium text-slate-700">
                  E-mail
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
                  Telephone number
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
                  Address
                </label>
                <textarea
                  id="checkout-address"
                  required
                  value={checkoutDetails.address}
                  onChange={(event) =>
                    setCheckoutDetails((current) => ({ ...current, address: event.target.value }))
                  }
                  placeholder="Street, city, ZIP code"
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
                  Start checkout
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
                      + {option.price} Kc
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
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('billing')}
                  disabled={deliveryOption === ''}
                  className={primaryButtonClassName}
                >
                  Continue to billing
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

              {billingOption === 'Online card payment' ? (
                <div className="grid gap-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 md:grid-cols-3">
                  <div className="md:col-span-3">
                    <label htmlFor="card-number" className="text-sm font-medium text-slate-700">
                      Card number
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
                      Day of validity
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
                Back
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep('overview')}
                disabled={billingOption === '' || !isCardDetailsReady}
                className={`${primaryButtonClassName} ml-3 mt-2`}
              >
                Continue to overview
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Customer
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">Name:</span>{' '}
                      {checkoutDetails.name}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">E-mail:</span>{' '}
                      {checkoutDetails.email}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">Telephone:</span>{' '}
                      {checkoutDetails.telephone}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">Address:</span>{' '}
                      {checkoutDetails.address}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Delivery
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">Method:</span> {deliveryOption}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">Delivery address:</span>{' '}
                      {selectedDeliveryAddress}
                    </p>
                    <p>
                      <span className="font-medium text-slate-950">Delivery price:</span>{' '}
                      {selectedDeliveryPrice} Kc
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Billing
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-medium text-slate-950">Payment:</span> {billingOption}
                    </p>
                    {billingOption === 'Online card payment' ? (
                      <>
                        <p>
                          <span className="font-medium text-slate-950">Card:</span>{' '}
                          {maskedCardNumber}
                        </p>
                        <p>
                          <span className="font-medium text-slate-950">Valid until:</span>{' '}
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
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleBuy}
                  disabled={!isCheckoutReady || isPurchaseSubmitted}
                  className="inline-flex rounded-full bg-cyan-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300"
                >
                  Buy
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
                  Purchase complete
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Thank you</h2>
              </div>
              <button
                type="button"
                onClick={() => setPurchaseMessage('')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg leading-none text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Close purchase message"
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
                Home
              </Link>
              {isSignedIn ? (
                <Link
                  to={toLocalePath('/profile')}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Profile
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
