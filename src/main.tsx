import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import Home from './pages/Home/Home.tsx';
import ImageGenerator from './pages/ImageGenerator/ImageGenerator.tsx'
import QuoteGenerator from './pages/QuoteDesignerPage/QuoteDesigner.tsx'
import MemeGenerator from './pages/MemeGenerator/MemeGenerator.tsx'




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
