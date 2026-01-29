import { FaChevronDown, FaChevronUp, FaTrashAlt, FaTag, FaPercentage, FaPause } from "react-icons/fa";

const Cart = ({ cartItems, updateCartItem, deleteCartItem, onProceedToPay }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-[40%] p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div>
                <button onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}>+</button>
                <button onClick={() => updateCartItem(item.id, { quantity: item.quantity - 1 })}>-</button>
                <button onClick={() => deleteCartItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <p className="font-bold">Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4"
            onClick={onProceedToPay}
          >
            Proceed to Pay
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;