import { ScrollToTop } from "@/components/ScrollToTop";
// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import './index.css';
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Integration from "./pages/Integration";
import NotFound from "./pages/NotFound";
import PricingPage from "./pages/PricingPage";
import Waitlist from "./pages/Waitlist";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <Toaster /> */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>,
)
