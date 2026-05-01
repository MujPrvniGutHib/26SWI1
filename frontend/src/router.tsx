import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { AboutPage } from './pages/AboutPage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { CategoryBooksPage } from './pages/CategoryBooksPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { DiscountsPage } from './pages/DiscountsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderDetailsPage } from './pages/OrderDetailsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { SignInPage } from './pages/SignInPage'
import { BookTablePage } from './pages/BookTablePage'

const appRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'table',
    element: <BookTablePage />,
  },
  {
    path: 'catalog',
    element: <CatalogPage />,
  },
  {
    path: 'catalog/:category',
    element: <CategoryBooksPage />,
  },
  {
    path: 'discounts',
    element: <DiscountsPage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'books/:bookId',
    element: <BookDetailsPage />,
  },
  {
    path: 'cart',
    element: <CartPage />,
  },
  {
    path: 'checkout',
    element: <CheckoutPage />,
  },
  {
    path: 'sign-in',
    element: <SignInPage />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'login',
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: 'register',
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'profile/orders/:orderId',
    element: <OrderDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: appRoutes,
  },
  {
    path: '/cz',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: appRoutes,
  },
])
