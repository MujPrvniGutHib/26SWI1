import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const values = [
  'What started as a simple idea - making book discovery better - grew into a platform focused on readers first. We wanted to build more than just a store, we wanted a place where books feel alive and easy to explore.',
  'Our mission is simple: to connect people with books they’ll love. We aim to create a smooth, enjoyable experience - from browsing to checkout - while offering a thoughtfully curated selection across genres.',
  'We offer carefully curated collections across a wide range of genres, helping you discover books that truly match your interests. Our platform is designed with a clean and distraction-free interface, so you can focus entirely on exploring and enjoying your next read. We also prioritize personalized discovery, making it easier to find books you’ll love. From browsing to checkout, we ensure a fast and seamless shopping experience.',
]

export function AboutPage() {
  useDocumentTitle('About Us | SWI Frontend')

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="About Us"
        title="A bookstore built for discovery"
        description="We believe discovering your next favorite book should feel effortless and exciting. Our bookstore is built for curious readers who love exploring new stories, ideas, and perspectives. Whether you're into fiction, business, design, or hidden gems, we make it easy to find books that truly resonate with you."
      />

      <SectionCard eyebrow="Brand Story" title="Our Mission">
        <div className="grid gap-3 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
            >
              {value}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard eyebrow="Contact Us" title="Where can you find us?">
        <div className="space-y-4 text-sm leading-7 text-slate-700">
          <p>
            <span className="font-semibold text-slate-950">Address:</span> Hlavni 128,
            110 00 Prague, Czech Republic
          </p>
          <div>
            <p className="font-semibold text-slate-950">Opening times:</p>
            <p>Monday - 10:00 - 22:00</p>
            <p>Tuesday - 10:00 - 22:00</p>
            <p>Wednesday - 10:00 - 22:00</p>
            <p>Thursday - 10:00 - 22:00</p>
            <p>Friday - 10:00 - 22:00</p>
            <p>Saturday - 10:00 - 22:00</p>
            <p>Sunday - 10:00 - 22:00</p>
          </div>
          <p>
            <span className="font-semibold text-slate-950">Contact our support:</span>{' '}
            +420 777 428 913
          </p>
        </div>
      </SectionCard>
    </div>
  )
}
