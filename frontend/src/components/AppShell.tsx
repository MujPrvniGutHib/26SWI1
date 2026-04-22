import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../utils/cn'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/cart', label: 'Cart' },
  { to: '/about', label: 'About us' },
]

export function AppShell() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe,_#f8fafc_45%,_#e2e8f0)] text-slate-900">
      <header className="border-b border-white/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-5 lg:grid lg:grid-cols-3 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Find my book
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              React Router is ready
            </h1>
          </div>
          <div className="w-full max-w-lg lg:justify-self-center">
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
          </div>
          <nav className="flex flex-wrap gap-2 lg:justify-self-end">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
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
              to={isSignedIn ? '/profile' : '/sign-in'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                )
              }
            >
              {isSignedIn ? 'Profile' : 'Sign In'}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

