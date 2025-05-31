import { useState } from 'react'
import { useReviews } from '../context/ReviewContext'
import { FiUser, FiMessageSquare, FiStar } from 'react-icons/fi'

const ReviewForm = ({ productId }) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const { addReview } = useReviews()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return
    
    addReview(productId, {
      name,
      comment,
      rating,
      date: new Date().toISOString()
    })
    
    setName('')
    setComment('')
    setRating(5)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">أضف تقييمك</h3>
      
      <div className="mb-4">
        <label className="block text-accent-DEFAULT mb-2 flex items-center">
          <FiUser className="ml-2" />
          الاسم
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-accent-DEFAULT mb-2 flex items-center">
          <FiMessageSquare className="ml-2" />
          التعليق
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="block text-accent-DEFAULT mb-2 flex items-center">
          <FiStar className="ml-2" />
          التقييم
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            >
              <FiStar />
            </button>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-primary-DEFAULT text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
      >
        إرسال التقييم
      </button>
    </form>
  )
}

export default ReviewForm