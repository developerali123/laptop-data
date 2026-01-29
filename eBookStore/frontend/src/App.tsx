import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages (Inhein hum agle steps mein banayenge)
// import Home from './pages/Home';
// import Books from './pages/Books';
// import BookDetails from './pages/BookDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Profile from './pages/Profile';
// import Admin from './pages/Admin';

function App() {
  return (
    // [1] AuthProvider poore app ko wrap karega
    <AuthProvider>
      {/* [2] CartProvider uske andar wrap karega */}
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar har page par dikhega */}
            <Navbar />

            {/* Main Content Area - Yahan pages render honge */}
            <main className="flex-grow">
              <Routes>
                {/* Abhi ke liye, hum sirf ek dummy route rakhte hain */}
                <Route
                  path="/"
                  element={
                    <div className="p-8 text-center">
                      <h1 className="text-3xl font-bold">
                        Welcome to BookStore
                      </h1>
                      <p>Frontend is running!</p>
                    </div>
                  }
                />

                {/* In routes ko hum baad mein uncomment kareinge jab pages ban jayenge
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                */}
              </Routes>
            </main>

            {/* Footer har page par dikhega */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
