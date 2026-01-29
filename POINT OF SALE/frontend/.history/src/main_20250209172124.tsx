import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store.ts";
import DashboardPage from "./pages/DashboardPage.tsx";
import DashboardLayout from "./pages/Dashboard/layout.tsx";
import { CartProvider } from "./pages/cartContext.tsx";
// import Payment from "./pages/payment.tsx";
// import Cart from "./pages/Cart.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              }
            />
              
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
