import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { BookWithDetails } from "../types"; // <-- Humara custom type
import { useCart } from "../context/CartContext"; // <-- CartContext Hook
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: BookWithDetails;
  index?: number; // Yeh animation mein delay ke liye hai
}

const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Handle add to cart with animation feedback
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Card pe click event ko rokne ke liye
    addToCart(book);
    // Yahan aap ek chota notification (toast) bhi dikha sakte hain
  };

  // Navigate to book details page
  const handleViewDetails = () => {
    navigate(`/book/${book.id}`); // 'id' (virtual) use karein
  };

  // Animation variants for stagger effect
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Har card thori dair se appear hoga
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }} // Hover par thora upar move karega
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={handleViewDetails}
    >
      {/* Book Cover Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={
            book.cover_image_url ||
            "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg"
          }
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay with action buttons - shown on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="View details"
          >
            <Eye className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Stock Badge */}
        {book.stock_quantity < 10 && book.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Only {book.stock_quantity} left
          </div>
        )}

        {book.stock_quantity === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {/* Yahan hum check kareinge ke category object mojood hai ya nahi.
              Agar nahi (jaise mockData mein), toh error nahi aayega.
            */}
            {book.category?.name || "Category"}
          </span>
        </div>

        {/* Book Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>

        {/* Author Name */}
        <p className="text-sm text-gray-600 mb-2">
          {book.author?.name || "Author"}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-900">
            {book.rating.toFixed(1)}
          </span>
          <span className="ml-1 text-sm text-gray-500">/5.0</span>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${book.price.toFixed(2)}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={book.stock_quantity === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              book.stock_quantity === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {book.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
