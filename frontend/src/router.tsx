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
import { ProfilePage } from './pages/ProfilePage'
import { SignInPage } from './pages/SignInPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
