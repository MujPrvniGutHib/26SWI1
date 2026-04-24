export type OrderItem = {
  title: string
  quantity: number
  price: string
}

export type OrderRecord = {
  id: string
  status: string
  placedOn: string
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

export function getStoredOrders() {
  const storedValue = window.localStorage.getItem(STORED_ORDERS_KEY)

  if (!storedValue) {
    return []
  }

  try {
    return JSON.parse(storedValue) as OrderRecord[]
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
