import { useState } from "react";
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
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, discount: 0 }, // Ensure 'discount' is initialized
      ]);
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

      <div className="w-full h-[80vh] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
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
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        className="text-blue-600 cursor-pointer"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartItem(item.id, {
                            quantity: Math.max(1, +e.target.value),
                          })
                        }
                        className="mx-2 text-center border rounded-md w-12"
                      />
                      <FaPlus
                        onClick={() =>
                          updateCartItem(item.id, {
                            quantity: item.quantity + 1,
                          })
                        }
                        className="text-blue-600 cursor-pointer"
                      />
                    </div>

                    {/* Discount */}
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        updateCartItem(item.id, {
                          discount: Math.max(0, +e.target.value),
                        })
                      }
                      className="text-center border rounded-md"
                      placeholder="Discount (%)"
                    />

                    {/* Price Per Unit */}
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateCartItem(item.id, {
                          price: Math.max(0, +e.target.value),
                        })
                      }
                      className="text-center border rounded-md"
                      placeholder="Price Per Unit"
                    />

                    {/* Action */}
                    <FaSave
                      onClick={() => {
                        // Add your save action logic here if needed
                      }}
                      className="text-green-600 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 shadow p-4">
          <div className="space-y-4">
            {/* Summary Details */}
            <div className="flex justify-between text-lg font-bold">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Discount</p>
              <p>
                $
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc +
                      ((item.price * item.discount) / 100) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Applied Coupon(s)</p>
              <p>N/A</p>
            </div>

            {isCouponModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsCouponModalOpen(false); // Close the modal when clicking outside
                  }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Apply Coupon
                  </h2>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    placeholder="Enter Coupon Code"
                  />
                  <div className="flex justify-center">
                    <button
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg"
                      onClick={() => {
                        console.log("Coupon Applied:", couponCode); // Logic for applying coupon
                        setIsCouponModalOpen(false);
                      }}
                    >
                      <FaCheck className="mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsModalOpen(false); // Close the modal when clicking outside
                  }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Enter/Scan Barcode
                  </h2>
                  <input
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    placeholder="Enter/Scan Barcode"
                  />
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Press enter after entering barcode to add products.
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg"
                      onClick={toggleModal}
                    >
                      <FaCheck className="mr-2" />
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isDiscountModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsDiscountModalOpen(false); // Close the modal when clicking outside
                  }
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Apply Discount
                  </h2>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    placeholder="Enter Discount Amount"
                  />
                  <div className="flex justify-center">
                    <button
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg"
                      onClick={() => {
                        console.log(
                          "Discount Applied:",
                          discountAmount
                        ); // Logic for applying discount
                        setIsDiscountModalOpen(false);
                      }}
                    >
                      <FaCheck className="mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                className="flex items-center justify-center px-4 py-3 bg-gray-100 border rounded-lg text-gray-700"
                onClick={toggleCouponModal}
              >
                <FaBarcode className="mr-2 text-gray-500" />
                Coupon
              </button>
              <button
                className="flex items-center justify-center px-4 py-3 bg-gray-100 border rounded-lg text-gray-700"
                onClick={toggleDiscountModal}
              >
                <span className="font-bold text-lg">%</span> Discount
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-100 border rounded-lg text-gray-700">
                || Hold Order
              </button>
            </div>

            {/* Proceed to Pay Button */}
            <button className="w-full flex justify-between items-center px-6 py-4 bg-blue-500 text-white rounded-lg mt-4">
              <div>
                <p className="text-lg font-bold">Proceed to Pay</p>
                <p className="text-sm">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                  Items
                </p>
              </div>
              <p className="text-lg font-bold">${total.toFixed(2)}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
