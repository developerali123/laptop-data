import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectDetails from './components/ProjectDetails.tsx'
import BlogDetails from './components/BlogDetails.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Default Home Route (you can change this to your homepage component) */}
          <Route path="/" element={<App />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
