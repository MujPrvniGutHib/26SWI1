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
  deliveryMethod: string
  paymentMethod: string
  shippingAddress: string
  billingAddress: string
  timelineNote: string
  isActive: boolean
  items: OrderItem[]
}

export const orders: OrderRecord[] = []
