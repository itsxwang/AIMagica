import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import Home from './pages/Home.tsx';
import ImageGenerator from './pages/ImageGenerator.tsx'
import QuoteGenerator from './pages/QuoteDesigner.tsx'
import MemeGenerator from './pages/MemeGenerator.tsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/image",
    element: <ImageGenerator />,
  },
  {
    path: "/quote",
    element: <QuoteGenerator />,
  },
  {
    path: "/meme",
    element: <MemeGenerator />,
  }
]);

createRoot(document.querySelector('body')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
