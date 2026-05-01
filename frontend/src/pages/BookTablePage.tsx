import { useEffect, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useTranslation, formatCurrency } from '../utils/locale'
import { api } from '../utils/api'
import type { ApiBook } from '../utils/api'
import { Link } from 'react-router-dom'
import { useLocalePath } from '../utils/locale'

export function BookTablePage() {
  const t = useTranslation()
  useDocumentTitle(t.tablePage.documentTitle)
  const toLocalePath = useLocalePath()

  const [books, setBooks] = useState<ApiBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetchData()
  }, [searchTerm, sortField, sortOrder])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      params.append('sort', sortField)
      params.append('order', sortOrder)

      const response = await api.get<ApiBook[]>(`/books?${params.toString()}`)
      setBooks(response.data)
    } catch (error) {
      console.error("Failed to fetch table data", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <span className="text-slate-300 ml-1">↕</span>
    return <span className="text-cyan-600 ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={t.tablePage.hero.eyebrow}
        title={t.tablePage.hero.title}
        description={t.tablePage.hero.description}
      />

      <SectionCard>
        <div className="mb-6">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.tablePage.searchPlaceholder}
            className="w-full max-w-md rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.id} <SortIcon field="id" />
                </th>
                <th
                  onClick={() => handleSort('title')}
                  className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.title} <SortIcon field="title" />
                </th>
                <th
                  onClick={() => handleSort('author')}
                  className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.author} <SortIcon field="author" />
                </th>
                <th
                  onClick={() => handleSort('category')}
                  className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.category} <SortIcon field="category" />
                </th>
                <th
                  onClick={() => handleSort('pages')}
                  className="cursor-pointer px-4 py-3 text-right font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.pages} <SortIcon field="pages" />
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="cursor-pointer px-4 py-3 text-right font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {t.tablePage.table.price} <SortIcon field="price" />
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
                        <Link to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)} className="hover:underline">
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
      </SectionCard>
    </div>
  )
}
