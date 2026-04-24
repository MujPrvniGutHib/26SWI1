import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { orders } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const decodedOrderId = orderId ? decodeURIComponent(orderId) : ''
  const order = orders.find((entry) => entry.id === decodedOrderId)

  useDocumentTitle(`${order?.id || 'Order Details'} | SWI Frontend`)

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow="Order Not Found"
          title="Order not found"
          description="We could not find the order you selected."
        >
          <Link
            to="/profile"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to profile
          </Link>
        </PageHero>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={order.isActive ? 'Active Order' : 'Past Order'}
        title={order.id}
        description={`Placed on ${order.placedOn} • ${order.status}`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/profile"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to profile
          </Link>
        </div>
      </PageHero>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard eyebrow="Items" title="Order contents">
          <div className="grid gap-4">
            {order.items.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-slate-900">{item.price}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Summary" title="Order details">
          <div className="space-y-3 text-sm text-slate-700">
            <DetailRow label="Status" value={order.status} />
            <DetailRow label="Placed on" value={order.placedOn} />
            <DetailRow label="Items" value={order.itemsLabel} />
            <DetailRow label="Total" value={order.total} />
            <DetailRow label="Delivery" value={order.deliveryMethod} />
            <DetailRow label="Payment" value={order.paymentMethod} />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Shipping" title="Delivery address">
          <p className="text-sm leading-7 text-slate-700">{order.shippingAddress}</p>
        </SectionCard>

        <SectionCard eyebrow="Billing" title="Billing address">
          <p className="text-sm leading-7 text-slate-700">{order.billingAddress}</p>
        </SectionCard>
      </div>

      <SectionCard eyebrow="Timeline" title="Order progress">
        <p className="text-sm leading-7 text-slate-700">{order.timelineNote}</p>
      </SectionCard>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-950">{value}</span>
    </div>
  )
}
