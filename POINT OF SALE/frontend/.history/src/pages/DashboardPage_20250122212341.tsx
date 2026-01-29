import { useState } from "react";
// import "./App.css";
import {
  FaBarcode,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaSave,
  FaTrashAlt,
} from "react-icons/fa";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [barcodeInput, setBarcodeInput] = useState(""); // Barcode input state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false); // Coupon modal state
  const [couponCode, setCouponCode] = useState(""); // Coupon input state
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false); // Discount modal state
  const [discountAmount, setDiscountAmount] = useState(""); // Discount amount state
  const toggleDiscountModal = () =>
    setIsDiscountModalOpen(!isDiscountModalOpen);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      price: 120,
      quantity: 1,
      discount: 0,
      image: "/images/shirt.jpg",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Chinese", "Beverages", "Bakery"];

  const products = [
    {
      id: 1,
      name: "Cheese Burger",
      price: 120,
      category: "Bakery",
      stock: 485,
      image: "/images/shirt.jpg",
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: 220,
      category: "Bakery",
      stock: 483,
      image: "/images/shirt.jpg",
    },
    {
      id: 3,
      name: "Chicken Pizza",
      price: 250,
      category: "Chinese",
      stock: 476,
      image: "/images/shirt.jpg",
    },
    {
      id: 4,
      name: "Chilli Potato",
      price: 50,
      category: "Chinese",
      stock: 473,
      image: "/images/shirt.jpg",
    },
    {
      id: 5,
      name: "Chilli Potato",
      price: 50,
      category: "Chinese",
      stock: 473,
      image: "/images/shirt.jpg",
    },
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([ ...cartItems, { ...product, quantity: 1, discount: 0 } ]); // Ensure 'discount' is initialized
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) =>
        acc +
        (item.price - (item.price * (item.discount || 0)) / 100) *
          item.quantity,
      0
    );
    const tax = subtotal * 0.1; // Example tax calculation (10%)
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const updateCartItem = (id, updatedFields) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  const { subtotal, tax, total } = calculateTotal();

  const toggleExpandedItem = (id) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const deleteCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleCouponModal = () => setIsCouponModalOpen(!isCouponModalOpen);

  return (
    <>
     
      <div className="flex-grow flex flex-row p-6 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Left Section: Products */}
        <div className="w-[60%]">
          <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-4">
            Select Category
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Search Product by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setSearchQuery("")} // Clear search input
            >
              Clear
            </button>
            <button
              className="px-4 py-2 bg-gray-100 border rounded-lg text-blue-500 flex items-center"
              onClick={toggleModal} // Open modal on click
            >
              <FaBarcode className="mr-2" />
              Scan Barcode
            </button>
          </div>

          <div
            className="w-full h-[80vh] snap-y overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg scroll- scrollbar-custom"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <img
                    className="rounded-t-lg w-full"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                    <p className="text-blue-600">${product.price.toFixed(2)}</p>
                    <p className="text-green-500">In Stock({product.stock})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Cart */}
        <div className="w-[40%] pl-4 flex flex-col h-full overflow-hidden">
          <h2 className="text-xl font-semibold text-black dark:text-gray-100 mb-4">
            Cart Items
          </h2>

          {/* Scrollable Cart Items */}
          <div className="flex-grow overflow-y-auto space-y-4 max-h-[calc(100vh-250px)]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpandedItem(item.id)}
                >
                  <div className="flex items-center">
                    {expandedItemId === item.id ? (
                      <FaChevronDown className="text-gray-500 text-xl pr-2" />
                    ) : (
                      <FaChevronUp className="text-gray-500 text-xl pr-2" />
                    )}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md"
                    />
                    <div className="ml-4">
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    ${(item.price * item.quantity).toFixed(2)} (ex. tax)
                  </p>
                  <FaTrashAlt
                    className="text-red-500 text-xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCartItem(item.id);
                    }}
                  />
                </div>

                {expandedItemId === item.id && (
                  <div className="mt-4">
                    {/* Labels */}
                    <div className="grid grid-cols-4 gap-2 mb-2 font-semibold text-gray-700 dark:text-gray-300">
                      <p className="text-center">Quantity</p>
                      <p className="text-center">Discount (%)</p>
                      <p className="text-center">Price Per Unit</p>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-4 gap-2">
                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <FaMinus
                          onClick={() =>
                            updateCartItem(item.id, {
                              quantity: Math.max(item.quantity - 1, 1),
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                        <p className="mx-2">{item.quantity}</p>
                        <FaPlus
                          onClick={() =>
                            updateCartItem(item.id, {
                              quantity: item.quantity + 1,
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                      </div>

                      {/* Discount */}
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          value={item.discount}
                          onChange={(e) =>
                            updateCartItem(item.id, {
                              discount: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-16 px-2 py-1 text-center border rounded-md"
                        />
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-center">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={toggleDiscountModal}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Apply Discount
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={toggleModal} // Close modal when clicked outside
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <h3 className="text-xl">Scan Barcode</h3>
            <input
              type="text"
              placeholder="Enter Barcode"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              className="mt-4 px-4 py-2 border rounded-lg w-full"
            />
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCouponModalOpen && (
        <div
          className="modal-overlay"
          onClick={toggleCouponModal} // Close coupon modal when clicked outside
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing coupon modal
          >
            <h3 className="text-xl">Apply Coupon</h3>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="mt-4 px-4 py-2 border rounded-lg w-full"
            />
            <button
              onClick={toggleCouponModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Apply Coupon
            </button>
          </div>
        </div>
      )}

      {isDiscountModalOpen && (
        <div
          className="modal-overlay"
          onClick={toggleDiscountModal} // Close discount modal when clicked outside
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing discount modal
          >
            <h3 className="text-xl">Apply Discount</h3>
            <input
              type="text"
              placeholder="Enter Discount Amount"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="mt-4 px-4 py-2 border rounded-lg w-full"
            />
            <button
              onClick={toggleDiscountModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Apply Discount
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
