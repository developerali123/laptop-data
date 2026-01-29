const Cart = ({ cartItems, updateCartItem, deleteCartItem, onProceedToPay }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-[40%] p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2"
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2"
                  onClick={() => updateCartItem(item.id, { quantity: item.quantity - 1 })}
                >
                  -
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                  onClick={() => deleteCartItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mt-6">
        <p className="font-bold">Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>

      {/* Proceed to Pay Button */}
      <button
        className={`w-full ${
          cartItems.length === 0 ? "bg-white cursor-not-allowed" : "bg-blue-500"
        } text-white p-2 rounded-lg mt-4`}
        onClick={onProceedToPay}
        disabled={cartItems.length === 0}
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default Cart;