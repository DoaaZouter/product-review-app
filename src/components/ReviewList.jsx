import { useState } from 'react'
import { useReviews } from '../context/ReviewContext'
import { FiStar, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi'

const ReviewList = ({ reviews, productId }) => {
  const { deleteReview, updateReview } = useReviews()
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editComment, setEditComment] = useState('')
  const [editRating, setEditRating] = useState(5)

  const handleEdit = (review, index) => {
    setEditingId(index)
    setEditName(review.name)
    setEditComment(review.comment)
    setEditRating(review.rating)
  }

  const handleUpdate = (e, index) => {
    e.preventDefault()
    updateReview(productId, index, {
      name: editName,
      comment: editComment,
      rating: editRating,
      date: new Date().toISOString()
    })
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  return (
    <div>
      {reviews.length === 0 ? (
        <p className="text-accent-DEFAULT text-center py-4">لا توجد تقييمات حتى الآن. كن أول من يقيم!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="border-b border-gray-200 pb-4 last:border-0">
              {editingId === index ? (
                <form onSubmit={(e) => handleUpdate(e, index)} className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    ></textarea>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditRating(star)}
                        className={`text-xl ${star <= editRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      >
                        <FiStar />
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-primary-DEFAULT text-white px-4 py-1 rounded text-sm"
                    >
                      حفظ
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-primary-light text-primary-DEFAULT p-2 rounded-full mr-3">
                        <FiUser />
                      </div>
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex text-yellow-500 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${i < review.rating ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-accent-DEFAULT">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="mt-2 text-accent-DEFAULT pl-12">{review.comment}</p>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={() => handleEdit(review, index)}
                      className="text-primary-DEFAULT hover:text-primary-dark"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => deleteReview(productId, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewList