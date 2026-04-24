/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'

export type CartBook = {
  title: string
  author: string
  category: string
  price: number
  coverUrl: string
  stock: number
}

export type CartItem = {
  book: CartBook
  quantity: number
}

type CartContextValue = {
  cartItems: CartItem[]
  cartMessage: string
  addToCart: (book: CartBook) => void
  updateQuantity: (title: string, delta: number) => void
  removeItem: (title: string) => void
  clearCart: () => void
}

const CART_STORAGE_KEY = 'swi-cart-items'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!savedCart) {
      return []
    }

    try {
      return JSON.parse(savedCart) as CartItem[]
    } catch {
      return []
    }
  })
  const [cartMessage, setCartMessage] = useState('')

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    if (!cartMessage) {
      return
    }

    const timeout = window.setTimeout(() => {
      setCartMessage('')
    }, 2200)

    return () => window.clearTimeout(timeout)
  }, [cartMessage])

  const value = useMemo(
    () => ({
      cartItems,
      cartMessage,
      addToCart: (book: CartBook) => {
        setCartItems((current) => {
          const existingItem = current.find((item) => item.book.title === book.title)

          if (existingItem) {
            return current.map((item) =>
              item.book.title === book.title
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + 1, item.book.stock),
                  }
                : item,
            )
          }

          return [...current, { book, quantity: 1 }]
        })
        setCartMessage(`Added "${book.title}" to cart.`)
      },
      updateQuantity: (title: string, delta: number) => {
        setCartItems((current) =>
          current
            .map((item) => {
              if (item.book.title !== title) {
                return item
              }

              const nextQuantity = Math.min(item.quantity + delta, item.book.stock)
              return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : item
            })
            .filter((item) => item.quantity > 0),
        )
      },
      removeItem: (title: string) => {
        setCartItems((current) => current.filter((item) => item.book.title !== title))
      },
      clearCart: () => {
        setCartItems([])
      },
    }),
    [cartItems, cartMessage],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
