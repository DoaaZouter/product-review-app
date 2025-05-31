import { Link } from 'react-router-dom'
import {  FiShoppingCart, FiStar } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="object-contain w-full h-full p-4"
          loading="lazy"
        />
        <span className="absolute px-2 py-1 text-xs text-white rounded top-2 right-2 bg-primary-DEFAULT">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold line-clamp-1">{product.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-accent-DEFAULT">${product.price.toFixed(2)}</span>
          <div className="flex items-center text-yellow-500">
            <FiStar className="fill-current" />
            <span className="ml-1 text-primary-DEFAULT">{product.rating.rate}</span>
          </div>
        </div>
        <Link 
          to={`/product/${product.id}`}
          className="flex items-center justify-center w-full py-2 mt-4 text-black rounded transbition-colors bg-primary-DEFAULT hover:bg-primary-dark"
        >
          <FiShoppingCart className="mr-2" />
          عرض التفاصيل
        </Link>
      </div>
    </div>
  )
}

export default ProductCard