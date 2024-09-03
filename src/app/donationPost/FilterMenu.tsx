import { useState } from 'react'

interface FilterOptions {
  page?: number
  animal_category?: string
  post_category?: string
  location?: string
  date_from?: string
  date_to?: string
}

export default function FilterMenu({
  onFilterChange,
}: {
  onFilterChange: (filters: FilterOptions) => void
}) {
  const [filters, setFilters] = useState<FilterOptions>({
    animal_category: '',
    post_category: '',
    location: '',
    date_from: '',
    date_to: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <select
        name="animal_category"
        onChange={handleInputChange}
        value={filters.animal_category}
      >
        <option value="">All Animal Categories</option>
        <option value="Dogs">Dogs</option>
        <option value="Cats">Cats</option>
        {/* Add more options as needed */}
      </select>

      <select
        name="post_category"
        onChange={handleInputChange}
        value={filters.post_category}
      >
        <option value="">All Post Categories</option>
        <option value="Donation">Donation</option>
        <option value="Adoption">Adoption</option>
        {/* Add more options as needed */}
      </select>

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleInputChange}
        value={filters.location}
      />

      <input
        type="date"
        name="date_from"
        onChange={handleInputChange}
        value={filters.date_from}
      />

      <input
        type="date"
        name="date_to"
        onChange={handleInputChange}
        value={filters.date_to}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </form>
  )
}
