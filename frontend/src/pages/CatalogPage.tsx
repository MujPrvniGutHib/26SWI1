import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionCard } from '../components/SectionCard'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useLocalePath } from '../utils/locale'

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

const books = [
  {
    title: 'The Lost Expedition',
    author: 'Erik Hansen',
    category: 'Adventure stories',
    age: 12,
    price: 349,
    pages: 304,
    format: 'Hardcover',
    originalPrice: 399,
    discountPercent: 12,
    rating: 4.5,
    coverUrl: 'https://via.placeholder.com/150x200?text=Lost+Expedition',
    description: 'Join Erik Hansen on an unforgettable journey through uncharted territories filled with danger, discovery, and wonder. A thrilling adventure that captures the spirit of exploration.',
    stock: 15,
  },
  {
    title: 'Moonlit Manor',
    author: 'Sara Doyle',
    category: 'Mystery',
    age: 16,
    price: 279,
    pages: 256,
    format: 'E-book',
    originalPrice: 279,
    discountPercent: 0,
    rating: 4.2,
    coverUrl: 'https://via.placeholder.com/150x200?text=Moonlit+Manor',
    description: 'A gripping mystery set in an ancient manor where secrets hide behind every door. Sara Doyle weaves an intricate plot of suspense and surprising revelations.',
    stock: 8,
  },
  {
    title: 'Castle of Stars',
    author: 'Nina Růžičková',
    category: 'Fantasy',
    age: 14,
    price: 429,
    pages: 416,
    format: 'Hardcover',
    originalPrice: 429,
    discountPercent: 0,
    rating: 4.8,
    coverUrl: 'https://via.placeholder.com/150x200?text=Castle+of+Stars',
    description: 'Explore a magical realm where a castle floats among the stars. An epic fantasy adventure filled with enchantment, heroism, and timeless magic that will captivate readers.',
    stock: 23,
  },
  {
    title: 'Garden of Thorns',
    author: 'Mira Vale',
    category: 'Fantasy',
    age: 13,
    price: 359,
    pages: 336,
    format: 'Hardcover',
    originalPrice: 399,
    discountPercent: 10,
    rating: 4.7,
    coverUrl: 'https://via.placeholder.com/150x200?text=Garden+of+Thorns',
    description: 'A cursed royal garden hides ancient magic, dangerous bargains, and a secret that could save an entire kingdom.',
    stock: 14,
  },
  {
    title: 'The Ember Crown',
    author: 'Tomas Reed',
    category: 'Fantasy',
    age: 15,
    price: 389,
    pages: 392,
    format: 'Hardcover',
    originalPrice: 389,
    discountPercent: 0,
    rating: 4.4,
    coverUrl: 'https://via.placeholder.com/150x200?text=Ember+Crown',
    description: 'A runaway heir must claim a burning crown before rival kingdoms awaken the fire beneath the mountains.',
    stock: 9,
  },
  {
    title: 'Winds of Aralon',
    author: 'Elena Frost',
    category: 'Fantasy',
    age: 12,
    price: 329,
    pages: 288,
    format: 'E-book',
    originalPrice: 329,
    discountPercent: 0,
    rating: 4.1,
    coverUrl: 'https://via.placeholder.com/150x200?text=Winds+of+Aralon',
    description: 'Sky sailors, storm spirits, and a young mapmaker collide in a floating world ruled by magical winds.',
    stock: 20,
  },
  {
    title: 'Dragonfall Night',
    author: 'Jonas Black',
    category: 'Fantasy',
    age: 16,
    price: 449,
    pages: 512,
    format: 'Audiobook',
    originalPrice: 499,
    discountPercent: 10,
    rating: 4.6,
    coverUrl: 'https://via.placeholder.com/150x200?text=Dragonfall+Night',
    description: 'When dragons fall from the stars, a village hunter discovers the night sky has been hiding an old war.',
    stock: 11,
  },
  {
    title: 'The Silver Oracle',
    author: 'Clara Moon',
    category: 'Fantasy',
    age: 14,
    price: 299,
    pages: 264,
    format: 'E-book',
    originalPrice: 299,
    discountPercent: 0,
    rating: 4.0,
    coverUrl: 'https://via.placeholder.com/150x200?text=Silver+Oracle',
    description: 'A reluctant seer follows silver visions through a city of mirrors where every prophecy has a price.',
    stock: 17,
  },
  {
    title: 'Forest of the Hollow King',
    author: 'Adam Kral',
    category: 'Fantasy',
    age: 15,
    price: 419,
    pages: 456,
    format: 'Hardcover',
    originalPrice: 419,
    discountPercent: 0,
    rating: 4.5,
    coverUrl: 'https://via.placeholder.com/150x200?text=Hollow+King',
    description: 'Deep in an enchanted forest, a forgotten king waits for someone brave enough to break his hollow crown.',
    stock: 6,
  },
  {
    title: 'Spellbound Harbor',
    author: 'Iris Lake',
    category: 'Fantasy',
    age: 10,
    price: 259,
    pages: 224,
    format: 'E-book',
    originalPrice: 279,
    discountPercent: 7,
    rating: 4.2,
    coverUrl: 'https://via.placeholder.com/150x200?text=Spellbound+Harbor',
    description: 'A seaside town of enchanted ships and talking lanterns becomes the key to rescuing a lost moon.',
    stock: 25,
  },
  {
    title: 'Ashes of the Moon Gate',
    author: 'Ronan Grey',
    category: 'Fantasy',
    age: 17,
    price: 469,
    pages: 540,
    format: 'Hardcover',
    originalPrice: 469,
    discountPercent: 0,
    rating: 4.7,
    coverUrl: 'https://via.placeholder.com/150x200?text=Moon+Gate',
    description: 'After a lunar portal shatters, rival mages race through its ashes to stop an empire from returning.',
    stock: 8,
  },
  {
    title: 'The Crystal Familiar',
    author: 'Petra Wild',
    category: 'Fantasy',
    age: 11,
    price: 289,
    pages: 248,
    format: 'Audiobook',
    originalPrice: 289,
    discountPercent: 0,
    rating: 4.3,
    coverUrl: 'https://via.placeholder.com/150x200?text=Crystal+Familiar',
    description: 'A student mage bonds with a crystal creature that remembers spells no one else can read.',
    stock: 19,
  },
  {
    title: 'The War Dispatch',
    author: 'Jakub Martínek',
    category: 'War',
    age: 18,
    price: 399,
    pages: 384,
    format: 'Audiobook',
    originalPrice: 449,
    discountPercent: 11,
    rating: 4.0,
    coverUrl: 'https://via.placeholder.com/150x200?text=War+Dispatch',
    description: 'A powerful narrative of courage and sacrifice during wartime. Jakub Martínek chronicles the extraordinary stories of soldiers facing impossible odds and finding hope in darkness.',
    stock: 5,
  },
  {
    title: 'Voices of Autumn',
    author: 'Lena Novak',
    category: 'Poetry',
    age: 10,
    price: 199,
    pages: 112,
    format: 'E-book',
    originalPrice: 199,
    discountPercent: 0,
    rating: 4.3,
    coverUrl: 'https://via.placeholder.com/150x200?text=Voices+of+Autumn',
    description: 'A collection of beautiful and haunting verses that capture the essence of autumn. Lena Novak\'s poetry explores themes of change, reflection, and natural beauty.',
    stock: 0,
  },
  {
    title: 'A Room for Two',
    author: 'Olivia Svobodová',
    category: 'Romance',
    age: 16,
    price: 339,
    pages: 320,
    format: 'Hardcover',
    originalPrice: 379,
    discountPercent: 11,
    rating: 4.6,
    coverUrl: 'https://via.placeholder.com/150x200?text=Room+for+Two',
    description: 'A tender romance about two souls discovering love in unexpected circumstances. Olivia Svobodová crafts an emotional journey about connection, vulnerability, and lasting devotion.',
    stock: 12,
  },
  {
    title: 'Beyond the Fog',
    author: 'Ondřej Čech',
    category: 'Horror',
    age: 18,
    price: 319,
    pages: 280,
    format: 'Audiobook',
    originalPrice: 319,
    discountPercent: 0,
    rating: 3.9,
    coverUrl: 'https://via.placeholder.com/150x200?text=Beyond+the+Fog',
    description: 'A chilling tale of terror that unfolds in the depths of an impenetrable fog. Ondřej Čech creates an atmosphere of dread where danger lurks at every turn.',
    stock: 7,
  },
  {
    title: 'Czech Heroes',
    author: 'Martina Pavlíková',
    category: 'Historical fiction',
    age: 15,
    price: 379,
    pages: 448,
    format: 'Hardcover',
    originalPrice: 379,
    discountPercent: 0,
    rating: 4.4,
    coverUrl: 'https://via.placeholder.com/150x200?text=Czech+Heroes',
    description: 'An inspiring chronicle of Czech heroes who shaped history through courage and conviction. Martina Pavlíková brings historical figures to life with vivid storytelling.',
    stock: 3,
  },
  {
    title: 'The Memoir of Anna',
    author: 'Anna Dvořáková',
    category: 'Autobiography and memoir',
    age: 20,
    price: 299,
    pages: 272,
    format: 'E-book',
    originalPrice: 299,
    discountPercent: 0,
    rating: 4.1,
    coverUrl: 'https://via.placeholder.com/150x200?text=Memoir+of+Anna',
    description: 'A poignant personal account of Anna\'s life journey, filled with triumphs and challenges. This memoir offers intimate insights into personal growth, resilience, and self-discovery.',
    stock: 18,
  },
]

const authors = [
  'Anna Dvořáková',
  'Adam Kral',
  'Clara Moon',
  'Elena Frost',
  'Erik Hansen',
  'Iris Lake',
  'Jakub Martínek',
  'Jonas Black',
  'Lena Novak',
  'Martina Pavlíková',
  'Mira Vale',
  'Nina Růžičková',
  'Ondřej Čech',
  'Olivia Svobodová',
  'Petra Wild',
  'Ronan Grey',
  'Sara Doyle',
  'Tomas Reed',
]

const formats = ['Hardcover book', 'E-book', 'Audiobook']

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

const DEFAULT_AGE = 0
const DEFAULT_PRICE = catalogPriceRange.min
const DEFAULT_LENGTH = catalogLengthRange.min

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function CatalogPage() {
  useDocumentTitle('Catalog | SWI Frontend')

  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()
  const toLocalePath = useLocalePath()
  const searchQuery = searchParams.get('q') || ''

  const [age, setAge] = useState(DEFAULT_AGE)
  const [price, setPrice] = useState(DEFAULT_PRICE)
  const [length, setLength] = useState(DEFAULT_LENGTH)
  const [isAgeFilterActive, setIsAgeFilterActive] = useState(false)
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false)
  const [isLengthFilterActive, setIsLengthFilterActive] = useState(false)
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])

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

  const handleAddToCart = (book: (typeof books)[number]) => {
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

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow="Catalog"
        title="Explore our book collection"
        description="Choose a genre, set filters by age, price or book length, and find authors that interest you."
      />

      <div className="grid gap-8 items-start xl:grid-cols-[250px_minmax(0,1fr)_280px]">
        <SectionCard eyebrow="Filters" title="Narrow selection" actions={<span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Active: {activeFilters}</span>}>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Age</span>
                <span>{age} years</span>
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
                <span>Price</span>
                <span>{price} Kč</span>
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
                <span>{catalogPriceRange.min} Kč</span>
                <span>{catalogPriceRange.max} Kč</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Length</span>
                <span>{length} pages</span>
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
                <span>{catalogLengthRange.min} pages</span>
                <span>{catalogLengthRange.max} pages</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-700">From author</div>
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
              <div className="text-sm font-medium text-slate-700">Book form</div>
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {formats.map((format) => (
                  <label key={format} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedFormats.includes(format)}
                      onChange={() => toggleFormat(format)}
                      className="h-4 w-4 rounded border-slate-300 accent-cyan-600"
                    />
                    <span>{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          {searchQuery ? (
            <SectionCard
              eyebrow="Search"
              title={`Results for "${searchQuery}"`}
              actions={
                <Link
                  to={toLocalePath('/catalog')}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Back to genres
                </Link>
              }
            >
              {filteredBooks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <div key={book.title} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                      <Link to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)} className="flex flex-1 flex-row-reverse gap-4 items-center pl-14 pr-6 py-5">
                        <img
                          src={book.coverUrl}
                          alt={`${book.title} cover`}
                          className="h-32 w-24 rounded-lg object-cover shadow-sm"
                        />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{book.category}</p>
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
                            <span>{book.pages} pages</span>
                            <span>{book.price} Kč</span>
                            <span>Age {book.age}+</span>
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
                            Add to cart
                          </button>
                        ) : (
                          <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                            Not available
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
                  <p className="text-base font-medium">No books found for "{searchQuery}".</p>
                  <p className="mt-3 text-sm">Try a different search term.</p>
                </div>
              )}
            </SectionCard>
          ) : isFiltersActive ? (
            <SectionCard eyebrow="Books" title="Filtered results">
              {filteredBooks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <div key={book.title} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                      <Link to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)} className="flex flex-1 flex-row-reverse gap-4 items-center pl-14 pr-6 py-5">
                        <img
                          src={book.coverUrl}
                          alt={`${book.title} cover`}
                          className="h-32 w-24 rounded-lg object-cover shadow-sm"
                        />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{book.category}</p>
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
                            <span>{book.pages} pages</span>
                            <span>{book.price} Kč</span>
                            <span>Age {book.age}+</span>
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
                            Add to cart
                          </button>
                        ) : (
                          <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                            Not available
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
                  <p className="text-base font-medium">No books match your filters.</p>
                  <p className="mt-3 text-sm">Try adjusting your filter settings.</p>
                </div>
              )}
            </SectionCard>
          ) : (
            <SectionCard eyebrow="Category" title="Choose your adventure">
              <p className="text-sm leading-6 text-slate-600">
                Browse our collection of books organized into categories. Whether you love thrilling adventures, timeless classics, or thought-provoking mysteries, we have something for every reader. Click on a category to explore the books that await you.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
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
          )}

        </div>

        <SectionCard eyebrow="Discounts" title="Great deals">
          <div className="space-y-4">
            {books.filter((book) => book.discountPercent > 0).slice(0, 5).map((book) => (
              <div key={book.title} className="flex flex-col">
                <Link
                  to={toLocalePath(`/books/${encodeURIComponent(book.title)}`)}
                  className="block"
                >
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="h-16 w-12 rounded object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-950">{book.title}</h3>
                    <p className="text-xs text-slate-600">{book.author}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{book.price} Kč</span>
                      <span className="text-xs text-slate-500 line-through">{book.originalPrice} Kč</span>
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
                      Add to cart
                    </button>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-300 px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed">
                      Not available
                    </span>
                  )}
                </div>
              </div>
            ))}
            <Link
              to={toLocalePath('/discounts')}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Show more
            </Link>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
