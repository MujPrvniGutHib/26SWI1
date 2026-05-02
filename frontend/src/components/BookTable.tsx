import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  formatCurrency,
  useLocalePath,
  useTranslation,
} from '../utils/locale'
import { api } from '../utils/api'
import type { ApiBook } from '../utils/api'

function SortIcon({
  field,
  sortField,
  sortOrder,
}: {
  field: string
  sortField: string
  sortOrder: 'asc' | 'desc'
}) {
  if (sortField !== field) return <span className="text-slate-300 ml-1">↕</span>
  return <span className="text-cyan-600 ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
}

export function BookTable() {
  const t = useTranslation()
  const toLocalePath = useLocalePath()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [books, setBooks] = useState<ApiBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      params.append('sort', sortField)
      params.append('order', sortOrder)

      const response = await api.get<ApiBook[]>(`/books?${params.toString()}`)
      setBooks(response.data)
    } catch (error) {
      console.error("Failed to fetch table data", error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, sortField, sortOrder])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th
              onClick={() => handleSort('id')}
              className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.id} <SortIcon field="id" sortField={sortField} sortOrder={sortOrder} />
            </th>
            <th
              onClick={() => handleSort('title')}
              className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.title} <SortIcon field="title" sortField={sortField} sortOrder={sortOrder} />
            </th>
            <th
              onClick={() => handleSort('author')}
              className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.author} <SortIcon field="author" sortField={sortField} sortOrder={sortOrder} />
            </th>
            <th
              onClick={() => handleSort('category')}
              className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.category} <SortIcon field="category" sortField={sortField} sortOrder={sortOrder} />
            </th>
            <th
              onClick={() => handleSort('pages')}
              className="cursor-pointer px-4 py-3 text-right font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.pages} <SortIcon field="pages" sortField={sortField} sortOrder={sortOrder} />
            </th>
            <th
              onClick={() => handleSort('price')}
              className="cursor-pointer px-4 py-3 text-right font-semibold text-slate-900 hover:bg-slate-100"
            >
              {t.tablePage.table.price} <SortIcon field="price" sortField={sortField} sortOrder={sortOrder} />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                Loading...
              </td>
            </tr>
          ) : books.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                No books found.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-600">{book.id}</td>
                <td className="px-4 py-3 font-medium text-cyan-700">
                    <Link to={toLocalePath(`/books/${book.id}`)} className="hover:underline">
                        {book.title}
                    </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">{book.author}</td>
                <td className="px-4 py-3 text-slate-600">{book.category}</td>
                <td className="px-4 py-3 text-right text-slate-600">{book.pages}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">
                  {formatCurrency(book.price, t)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
