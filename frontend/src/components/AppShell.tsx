import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../utils/cn'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/about', label: 'About Us' },
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/sign-in', label: 'Sign In' },
  { to: '/profile', label: 'Profile' },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#cffafe,_#f8fafc_45%,_#e2e8f0)] text-slate-900">
      <header className="border-b border-white/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Bookstore UI
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              React Router is ready
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
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
          </nav>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
