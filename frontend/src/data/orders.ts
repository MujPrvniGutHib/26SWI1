export type OrderItem = {
  title: string
  quantity: number
  price: string
}

export type OrderRecord = {
  id: string
  status: string
  placedOn: string
  placedOnDate?: string
  deliveryDueDate?: string
  total: string
  itemsLabel: string
  deliveryCost?: string
  deliveryMethod: string
  paymentMethod: string
  shippingAddress: string
  billingAddress: string
  timelineNote: string
  isActive: boolean
  items: OrderItem[]
}

export const orders: OrderRecord[] = []

const STORED_ORDERS_KEY = 'swi-profile-orders'
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

function getLocalDateOnly(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function addDays(date: Date, days: number) {
  const nextDate = getLocalDateOnly(date)
  nextDate.setDate(nextDate.getDate() + days)

  return nextDate
}

function parseIsoDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day)
}

export function getRemainingDeliveryDays(order: OrderRecord, today = new Date()) {
  if (!order.deliveryDueDate) {
    return null
  }

  const deliveryDate = parseIsoDate(order.deliveryDueDate)

  if (!deliveryDate) {
    return null
  }

  const todayDate = getLocalDateOnly(today)

  return Math.max(0, Math.round((deliveryDate.getTime() - todayDate.getTime()) / MILLISECONDS_PER_DAY))
}

export function isOrderDelivered(order: OrderRecord, today = new Date()) {
  const remainingDays = getRemainingDeliveryDays(order, today)

  return remainingDays !== null && remainingDays <= 0
}

function refreshStoredOrder(order: OrderRecord) {
  const orderWithDeliveryDate = getOrderWithDeliveryDate(order)

  if (!isOrderDelivered(orderWithDeliveryDate)) {
    return orderWithDeliveryDate
  }

  return {
    ...orderWithDeliveryDate,
    status: 'Delivered',
    isActive: false,
  }
}

function getOrderWithDeliveryDate(order: OrderRecord) {
  if (order.deliveryDueDate) {
    return order
  }

  const deliveryDaysMatch = order.timelineNote.match(/\d+/)
  const parsedPlacedOnDate = order.placedOnDate ? parseIsoDate(order.placedOnDate) : null
  const placedOnDate = parsedPlacedOnDate ?? new Date(order.placedOn)

  if (!deliveryDaysMatch || Number.isNaN(placedOnDate.getTime())) {
    return order
  }

  const deliveryDays = Number(deliveryDaysMatch[0])

  return {
    ...order,
    placedOnDate: getIsoDate(placedOnDate),
    deliveryDueDate: getIsoDate(addDays(placedOnDate, deliveryDays)),
  }
}

export function getStoredOrders() {
  const storedValue = window.localStorage.getItem(STORED_ORDERS_KEY)

  if (!storedValue) {
    return []
  }

  try {
    const storedOrders = JSON.parse(storedValue) as OrderRecord[]
    const refreshedOrders = storedOrders.map(refreshStoredOrder)

    if (JSON.stringify(storedOrders) !== JSON.stringify(refreshedOrders)) {
      window.localStorage.setItem(STORED_ORDERS_KEY, JSON.stringify(refreshedOrders))
    }

    return refreshedOrders
  } catch {
    return []
  }
}

export function getAllOrders() {
  return [...getStoredOrders(), ...orders]
}

export function saveStoredOrder(order: OrderRecord) {
  const storedOrders = getStoredOrders()
  window.localStorage.setItem(STORED_ORDERS_KEY, JSON.stringify([order, ...storedOrders]))
}

export function deleteStoredOrders() {
  window.localStorage.removeItem(STORED_ORDERS_KEY)
}
