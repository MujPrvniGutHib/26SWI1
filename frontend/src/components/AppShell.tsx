import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { cn } from '../utils/cn'
import { getLocalePrefix, useLanguageLinks, useLocalePath } from '../utils/locale'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/cart', label: 'Cart' },
  { to: '/about', label: 'About us' },
]

export function AppShell() {
  const [searchQuery, setSearchQuery] = useState('')
  const { isSignedIn } = useAuth()
  const { cartMessage } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const toLocalePath = useLocalePath()
  const { enPath, czPath } = useLanguageLinks()
  const isHomePage = location.pathname === '/' || location.pathname === '/cz'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`${getLocalePrefix(location.pathname)}/catalog?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe,_#f8fafc_45%,_#e2e8f0)] text-slate-900">
      <header className="border-b border-white/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-5 lg:grid lg:grid-cols-[1fr_minmax(280px,420px)_1.45fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Find your book
            </p>
          </div>
          {!isHomePage ? (
            <form onSubmit={handleSearch} className="w-full lg:justify-self-center">
              <label htmlFor="top-search" className="sr-only">
                Search books
              </label>
              <input
                id="top-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search books, authors or genres"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </form>
          ) : (
            <div className="hidden w-full lg:block" aria-hidden="true" />
          )}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-self-end">
            <div className="shrink-0 px-5 text-sm leading-tight text-slate-700 sm:text-center">
              <p className="font-semibold text-slate-950">Open 10:00-22:00</p>
              <p className="mt-1 text-slate-600">+420 777 428 913</p>
            </div>
            <nav className="flex flex-wrap gap-2 lg:flex-nowrap">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={toLocalePath(item.to)}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={toLocalePath(isSignedIn ? '/profile' : '/sign-in')}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                )
              }
            >
              {isSignedIn ? 'Profile' : 'Sign In'}
            </NavLink>
            <div className="-translate-y-0.5 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
              <NavLink
                to={enPath}
                className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="English version"
                title="English"
              >
                EN
              </NavLink>
              <NavLink
                to={czPath}
                className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Czech version"
                title="Czech"
              >
                CZ
              </NavLink>
            </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <Outlet />
        </div>
      </main>

      {cartMessage ? (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 rounded-2xl border border-cyan-200 bg-white/95 px-5 py-4 text-sm font-medium text-slate-900 shadow-lg shadow-cyan-100 backdrop-blur">
          {cartMessage}
        </div>
      ) : null}
    </div>
  )
}
