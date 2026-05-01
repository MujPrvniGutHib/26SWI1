import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  formatCurrency,
  getLocalizedCategory,
  getLocalizedFormat,
  useLocalePath,
  useTranslation,
} from '../utils/locale'
import { api } from '../utils/api'
import type { ApiBook } from '../utils/api'
import { cn } from '../utils/cn'

type ViewMode = 'grid' | 'table'
type CatalogView = 'genres' | 'all-books'

const categories = [
  {
    title: 'Adventure stories',
    slug: 'adventure-stories',
    description:
      'These narratives feature thrilling journeys, explorations, and heroic quests involving danger and discovery in challenging settings.',
  },
  {
    title: 'Classics',
    slug: 'classics',
    description:
      'Timeless literary works exploring universal themes, human nature, and societal issues through masterful storytelling.',
  },
  {
    title: 'Crime',
    slug: 'crime',
    description:
      'Stories centered on criminal activities, investigations, and justice, often featuring detectives and moral dilemmas.',
  },
  {
    title: 'Fairy tales',
    slug: 'fairy-tales',
    description:
      'Enchanting, magical tales rooted in folklore, with mythical creatures, moral lessons, and happy endings.',
  },
  {
    title: 'Fantasy',
    slug: 'fantasy',
    description:
      'Imaginative worlds with magic, mythical beings, and epic quests exploring heroism and destiny.',
  },
  {
    title: 'Historical fiction',
    slug: 'historical-fiction',
    description:
      'Novels blending factual past events with fictional characters to provide insights into bygone eras and cultures.',
  },
  {
    title: 'Horror',
    slug: 'horror',
    description:
      'Tales evoking fear through supernatural elements, psychological terror, or monstrous threats.',
  },
  {
    title: 'Humour and satire',
    slug: 'humour-and-satire',
    description:
      'Witty narratives using comedy and irony to critique society and human folly.',
  },
  {
    title: 'Literary fiction',
    slug: 'literary-fiction',
    description:
      'Character-driven stories emphasizing psychological depth and complex themes in stylistic prose.',
  },
  {
    title: 'Mystery',
    slug: 'mystery',
    description:
      'Intriguing plots involving puzzles, secrets, and deductions leading to suspenseful revelations.',
  },
  {
    title: 'Poetry',
    slug: 'poetry',
    description:
      'Expressive art using rhythm, imagery, and metaphor to convey emotions and ideas.',
  },
  {
    title: 'Plays',
    slug: 'plays',
    description:
      'Dramatic scripts for performance exploring conflicts and relationships through dialogue and stage directions.',
  },
  {
    title: 'Romance',
    slug: 'romance',
    description:
      'Stories focusing on emotional connections, love affairs, and personal growth amidst challenges.',
  },
  {
    title: 'Science fiction',
    slug: 'science-fiction',
    description:
      'Speculative narratives exploring futuristic technologies and alternate realities to address ethical dilemmas.',
  },
  {
    title: 'Short stories',
    slug: 'short-stories',
    description:
      'Concise narratives delivering complete tales with a single event, insight, or twist.',
  },
  {
    title: 'Thrillers',
    slug: 'thrillers',
    description:
      'Fast-paced stories built on tension, danger, and high-stakes conflicts with unexpected twists.',
  },
  {
    title: 'War',
    slug: 'war',
    description:
      'Narratives depicting conflict, heroism, and suffering in wartime, exploring bravery and loss.',
  },
  {
    title: 'Women’s fiction',
    slug: 'womens-fiction',
    description:
      'Stories highlighting women’s experiences, relationships, and journeys from a female perspective.',
  },
  {
    title: 'Young adult',
    slug: 'young-adult',
    description:
      'Coming-of-age tales for teenagers dealing with identity, love, and self-discovery.',
  },
  {
    title: 'Autobiography and memoir',
    slug: 'autobiography-and-memoir',
    description:
      'Personal accounts of an individual’s life experiences written by the subject themselves.',
  },
  {
    title: 'Biography',
    slug: 'biography',
    description:
      'Detailed accounts of a person’s life written by another author based on research.',
  },
]

const authors: string[] = []

const formats = ['Hardcover book', 'E-book', 'Audiobook']

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function CatalogPage() {
  const t = useTranslation()
  useDocumentTitle(t.catalogPage.documentTitle)

  const { addToCart } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const toLocalePath = useLocalePath()
  const searchQuery = searchParams.get('q') || ''
  const localizedCategories = categories.map((category, index) => ({
    ...category,
    title: t.categories[index]?.title ?? category.title,
    description: t.categories[index]?.description ?? category.description,
  }))

  const [books, setBooks] = useState<ApiBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [catalogView, setCatalogView] = useState<CatalogView>('genres')

  const [age, setAge] = useState(0)
  const [price, setPrice] = useState(0)
  const [length, setLength] = useState(0)
  const [isAgeFilterActive, setIsAgeFilterActive] = useState(false)
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false)
  const [isLengthFilterActive, setIsLengthFilterActive] = useState(false)
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])

  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetchData()
  }, [searchQuery, sortField, sortOrder])

  const fetchData = async () => {
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

  const toggleFormat = (format: string) => {
    setSelectedFormats((current) =>
      current.includes(format)
        ? current.filter((item) => item !== format)
        : [...current, format],
    )
  }

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((current) =>
      current.includes(author)
        ? current.filter((item) => item !== author)
        : [...current, author],
    )
  }

  const normalizedSearchTokens = normalizeSearchText(searchQuery)
    .split(/\s+/)
    .filter(Boolean)

  const isFiltersActive = searchQuery !== '' || isAgeFilterActive || isPriceFilterActive || isLengthFilterActive || selectedAuthors.length > 0 || selectedFormats.length > 0

  const activeFilters = (isAgeFilterActive ? 1 : 0) + (isPriceFilterActive ? 1 : 0) + (isLengthFilterActive ? 1 : 0) + selectedAuthors.length + selectedFormats.length

  const handleAddToCart = (book: ApiBook) => {
    addToCart({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      coverUrl: book.coverUrl,
      stock: book.stock,
    })
  }

  const filteredBooks = books.filter((book) => {
    const searchableText = normalizeSearchText(`${book.title} ${book.author} ${book.category}`)
    const matchesSearch =
      normalizedSearchTokens.length === 0 ||
      normalizedSearchTokens.every((token) => searchableText.includes(token))
    
    return (
      matchesSearch &&
      (!isAgeFilterActive || book.age <= age) &&
      (!isPriceFilterActive || book.price <= price) &&
      (!isLengthFilterActive || book.pages <= length) &&
      (selectedAuthors.length === 0 || selectedAuthors.includes(book.author)) &&
      (selectedFormats.length === 0 || selectedFormats.includes(book.format))
    )
  })

  const catalogPriceRange = books.reduce(
    (range, book) => ({
      min: Math.min(range.min, book.price),
      max: Math.max(range.max, book.price),
    }),
    { min: books[0]?.price ?? 0, max: books[0]?.price ?? 0 },
  )
  
  const catalogLengthRange = books.reduce(
    (range, book) => ({
      min: Math.min(range.min, book.pages),
      max: Math.max(range.max, book.pages),
    }),
    { min: books[0]?.pages ?? 0, max: books[0]?.pages ?? 0 },
  )

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={t.catalogPage.hero.eyebrow}
        title={t.catalogPage.hero.title}
        description={t.catalogPage.hero.description}
      />

      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          <button
            onClick={() => setCatalogView('genres')}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition',
              catalogView === 'genres'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950',
            )}
          >
            Genres
          </button>
          <button
            onClick={() => setCatalogView('all-books')}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition',
              catalogView === 'all-books'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950',
            )}
          >
            All Books
          </button>
        </div>
        {catalogView === 'all-books' && (
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition',
                viewMode === 'grid'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950',
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition',
                viewMode === 'table'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950',
              )}
            >
              Table
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-8 items-start xl:grid-cols-[250px_minmax(0,1fr)_280px]">
        <SectionCard
          eyebrow={t.catalogPage.filters.eyebrow}
          title={t.catalogPage.filters.title}
          actions={<span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{t.catalogPage.filters.active}: {activeFilters}</span>}
        >
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{t.catalogPage.filters.age}</span>
                <span>{age} {t.catalogPage.filters.years}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={age}
                onChange={(event) => {
                  setAge(Number(event.target.value))
                  setIsAgeFilterActive(true)
                }}
                className="w-full accent-cyan-600"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{t.catalogPage.filters.price}</span>
                <span>{formatCurrency(price, t)}</span>
              </div>
              <input
                type="range"
                min={catalogPriceRange.min}
                max={catalogPriceRange.max}
                value={price}
                onChange={(event) => {
                  setPrice(Number(event.target.value))
                  setIsPriceFilterActive(true)
                }}
                className="w-full accent-cyan-600"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{formatCurrency(catalogPriceRange.min, t)}</span>
                <span>{formatCurrency(catalogPriceRange.max, t)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>{t.catalogPage.filters.length}</span>
                <span>{length} {t.catalogPage.filters.pages}</span>
              </div>
              <input
                type="range"
                min={catalogLengthRange.min}
                max={catalogLengthRange.max}
                value={length}
                onChange={(event) => {
                  setLength(Number(event.target.value))
                  setIsLengthFilterActive(true)
                }}
                className="w-full accent-cyan-600"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{catalogLengthRange.min} {t.catalogPage.filters.pages}</span>
                <span>{catalogLengthRange.max} {t.catalogPage.filters.pages}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-700">{t.catalogPage.filters.fromAuthor}</div>
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {authors.map((author) => (
                  <label key={author} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedAuthors.includes(author)}
                      onChange={() => toggleAuthor(author)}
                      className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
                    />
                    <span>{author}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-700">{t.catalogPage.filters.bookForm}</div>
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {formats.map((format) => (
                  <label key={format} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(format)}
                      onChange={() => toggleFormat(format)}
                      className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
                    />
                    <span>{getLocalizedFormat(format, t)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {catalogView === 'genres' ? (
          <SectionCard
            eyebrow={t.catalogPage.categoriesSection.eyebrow}
            title={t.catalogPage.categoriesSection.title}
          >
            <p className="text-sm leading-6 text-slate-600">
              {t.catalogPage.categoriesSection.description}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {localizedCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={toLocalePath(`/catalog/${category.slug}`)}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 py-6 pl-12 pr-12 text-center shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50"
                >
                  <h2 className="mt-4 text-xl font-semibold text-slate-950">{category.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </SectionCard>
        ) : viewMode === 'grid' ? (
          <div className="space-y-6">
            {filteredBooks.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                    <Link to={toLocalePath(`/books/${book.id}`)} className="flex flex-1 flex-row-reverse gap-4 items-center pl-14 pr-6 py-5">
                      <img
                        src={book.coverUrl}
                        alt={`${book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                        className="h-32 w-24 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                          {getLocalizedCategory(book.category, t)}
                        </p>
                        <h2 className="text-lg font-semibold text-slate-950">{book.title}</h2>
                        <p className="text-sm text-slate-600">{book.author}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                          <span className="ml-0.5 text-xs text-slate-500">({book.rating})</span>
                        </div>
                        <div className="flex flex-col gap-1.5 text-sm text-slate-500 pt-1">
                          <span>{book.pages} {t.catalogPage.bookCard.pages}</span>
                          <span>{formatCurrency(book.price, t)}</span>
                          <span>{t.catalogPage.bookCard.age} {book.age}+</span>
                        </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-5">
                      {book.stock > 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(book)}
                          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                        >
                          {t.common.addToCart}
                        </button>
                      ) : (
                        <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                          {t.common.notAvailable}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
                <p className="text-base font-medium">{t.catalogPage.filteredResults.noBooksMatch}</p>
                <p className="mt-3 text-sm">{t.catalogPage.filteredResults.adjustFilters}</p>
              </div>
            )}
          </div>
        ) : (
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
                ) : filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No books found.
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => (
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
        )}

        <SectionCard eyebrow={t.catalogPage.discounts.eyebrow} title={t.catalogPage.discounts.title}>
          <div className="space-y-4">
            {books.filter((book) => book.discountPercent > 0).slice(0, 5).map((book) => (
              <div key={book.id} className="flex flex-col">
                <Link
                  to={toLocalePath(`/books/${book.id}`)}
                  className="block"
                >
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} ${t.catalogPage.bookCard.coverSuffix}`}
                    className="h-16 w-12 rounded object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-950">{book.title}</h3>
                    <p className="text-xs text-slate-600">{book.author}</p>
                    <div className="mt-2 flex items-start gap-2">
                      <div className="flex flex-col">
                      <span className="text-xs text-slate-500 line-through">
                        {formatCurrency(book.originalPrice, t)}
                      </span>
                        <span className="text-sm font-medium text-slate-900">
                          {formatCurrency(book.price, t)}
                        </span>
                      </div>
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        -{book.discountPercent}%
                      </span>
                    </div>
                  </div>                </div>              </Link>
                <div className="mt-2 pb-2">
                  {book.stock > 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(book)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      {t.common.addToCart}
                    </button>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                      {t.common.notAvailable}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <Link
              to={toLocalePath('/discounts')}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {t.catalogPage.discounts.showMore}
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
