import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
      <RouterProvider router={router} />
      <Footer/>
  </StrictMode>,
)
