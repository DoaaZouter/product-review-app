import { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  categories,
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-DEFAULT" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center md:justify-start px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {showFilters ? <FiX className="ml-2" /> : <FiFilter className="ml-2" />}
          {showFilters ? 'إغلاق الفلتر' : 'تصفية النتائج'}
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FiFilter className="ml-2" />
                التصنيف
              </h3>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              >
                <option value="all">جميع التصنيفات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FiFilter className="ml-2" />
                السعر
              </h3>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              >
                <option value="all">جميع الأسعار</option>
                <option value="under50">أقل من $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="over100">أكثر من $100</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilter