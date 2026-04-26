import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { getAllOrders } from '../data/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  getLocalizedDeliveryMethod,
  getLocalizedOrderStatus,
  getLocalizedPaymentMethod,
  getLocalizedTimelineNote,
  formatCurrencyText,
  useLocalePath,
  useTranslation,
} from '../utils/locale'

export function OrderDetailsPage() {
  const t = useTranslation()
  const { orderId } = useParams()
  const toLocalePath = useLocalePath()
  const decodedOrderId = orderId ? decodeURIComponent(orderId) : ''
  const order = getAllOrders().find((entry) => entry.id === decodedOrderId)
  const localizedStatus = order ? getLocalizedOrderStatus(order.status, t) : ''

  useDocumentTitle(`${order?.id || t.orderDetailsPage.documentTitleFallback} | SWI Frontend`)

  if (!order) {
    return (
      <div className="space-y-6">
        <PageHero
          eyebrow={t.orderDetailsPage.notFound.eyebrow}
          title={t.orderDetailsPage.notFound.title}
          description={t.orderDetailsPage.notFound.description}
        >
          <Link
            to={toLocalePath('/profile')}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {t.common.backToProfile}
          </Link>
        </PageHero>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={
          order.isActive
            ? t.orderDetailsPage.hero.activeOrder
            : t.orderDetailsPage.hero.pastOrder
        }
        title={order.id}
        description={`${t.orderDetailsPage.hero.placedOn} ${order.placedOn} - ${localizedStatus}`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={toLocalePath('/profile')}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {t.common.backToProfile}
          </Link>
        </div>
      </PageHero>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          eyebrow={t.orderDetailsPage.contents.eyebrow}
          title={t.orderDetailsPage.contents.title}
        >
          <div className="grid gap-4">
            {order.items.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {t.orderDetailsPage.contents.quantity} {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {formatCurrencyText(item.price, t)}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow={t.orderDetailsPage.summary.eyebrow}
          title={t.orderDetailsPage.summary.title}
        >
          <div className="space-y-3 text-sm text-slate-700">
            <DetailRow label={t.orderDetailsPage.summary.status} value={localizedStatus} />
            <DetailRow label={t.orderDetailsPage.summary.placedOn} value={order.placedOn} />
            <DetailRow label={t.orderDetailsPage.summary.items} value={order.itemsLabel} />
            {order.deliveryCost ? (
              <DetailRow
                label={t.orderDetailsPage.summary.deliveryCost}
                value={formatCurrencyText(order.deliveryCost, t)}
              />
            ) : null}
            <DetailRow
              label={t.orderDetailsPage.summary.total}
              value={formatCurrencyText(order.total, t)}
            />
            <DetailRow
              label={t.orderDetailsPage.summary.delivery}
              value={getLocalizedDeliveryMethod(order.deliveryMethod, t)}
            />
            <DetailRow
              label={t.orderDetailsPage.summary.payment}
              value={getLocalizedPaymentMethod(order.paymentMethod, t)}
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow={t.orderDetailsPage.shipping.eyebrow}
          title={t.orderDetailsPage.shipping.title}
        >
          <p className="text-sm leading-7 text-slate-700">{order.shippingAddress}</p>
        </SectionCard>

        <SectionCard
          eyebrow={t.orderDetailsPage.billing.eyebrow}
          title={t.orderDetailsPage.billing.title}
        >
          <p className="text-sm leading-7 text-slate-700">{order.billingAddress}</p>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow={t.orderDetailsPage.timeline.eyebrow}
        title={t.orderDetailsPage.timeline.title}
      >
        <p className="text-sm leading-7 text-slate-700">
          {getLocalizedTimelineNote(order.timelineNote, t)}
        </p>
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
