import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import Home from './pages/Home.tsx';
import PicGenerator from './pages/PicGenerator.tsx'
import QuoteDesigner from './pages/QuoteDesigner.tsx'
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
    path: "/pic",
    element: <PicGenerator />,
  },
  {
    path: "/quote",
    element: <QuoteDesigner />,
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
