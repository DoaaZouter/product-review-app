import { FiAlertTriangle } from 'react-icons/fi'

const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <div className="flex justify-center text-red-500 mb-4">
        <FiAlertTriangle size={32} />
      </div>
      <h2 className="text-xl font-bold text-red-700 mb-2">حدث خطأ!</h2>
      <p className="text-red-600 mb-4">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  )
}

export default ErrorMessage