import { useParams } from 'react-router-dom'
import {  FiStar, FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'
import { useReviews } from '../context/ReviewContext'

const ProductDetail = ({ products }) => {
  const { id } = useParams()
  const { reviews } = useReviews()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">المنتج غير موجود</h2>
        <Link to="/" className="mt-4 inline-block text-primary-DEFAULT hover:underline">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    )
  }

  const productReviews = reviews[product.id] || []

  return (
    <div className="max-w-6xl mx-auto">
      <Link 
        to="/" 
        className="flex items-center text-primary-DEFAULT mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        العودة إلى القائمة
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-primary-light text-primary-DEFAULT text-sm px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              </div>
              <div className="text-2xl font-bold text-primary-DEFAULT">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center my-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`${i < Math.round(product.rating.rate) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-accent-DEFAULT">
                {product.rating.count} تقييمات
              </span>
            </div>

            <p className="text-accent-DEFAULT mb-6">{product.description}</p>

            <button className="w-full flex items-center justify-center bg-primary-DEFAULT text-white py-3 rounded hover:bg-primary-dark transition-colors">
              <FiShoppingCart className="mr-2" />
              أضف إلى السلة
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">التقييمات ({productReviews.length})</h2>
          
          <ReviewForm productId={product.id} />
          <ReviewList reviews={productReviews} productId={product.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail