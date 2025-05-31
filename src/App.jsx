import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import ProductCard from './components/ProductCard'
import ProductDetail from './components/ProductDetail'
import SearchFilter from './components/SearchFilter'
import SkeletonLoader from './components/SkeletonLoader'
import ErrorMessage from './components/ErrorMessage'
import { FiHome, FiShoppingBag, FiStar, FiSearch } from 'react-icons/fi'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesPrice = 
      priceFilter === 'all' ||
      (priceFilter === 'under50' && product.price < 50) ||
      (priceFilter === '50to100' && product.price >= 50 && product.price <= 100) ||
      (priceFilter === 'over100' && product.price > 100)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const categories = [...new Set(products.map(product => product.category))]

  if (loading) return <SkeletonLoader count={6} />
  if (error) return <ErrorMessage message={error} />

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="text-gray-800 shadow-lg bg-primary-DEFAULT">
          <div className="container px-4 py-6 mx-auto">
            <h1 className="flex items-center text-3xl font-bold">
              <FiShoppingBag className="mr-2" />
              متجر المنتجات
            </h1>
            <p className="mt-2 text-primary-light">اكتشف أفضل المنتجات مع تقييمات العملاء</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container px-4 py-8 mx-auto">
          <SearchFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
          />

          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            } />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-6 mt-12 text-white bg-primary-DEFAULT">
          <div className="container px-4 mx-auto text-center">
            <p>© 2023 متجر المنتجات. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App