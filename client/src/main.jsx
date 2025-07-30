import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home.jsx'
import Login from './Pages/auth/Login.jsx'
import Register from './Pages/auth/Register.jsx'

const router = createBrowserRouter([
  {path:"/" , element : <Home/> },
  {path:"/auth/login" , element: <Login/>},
  {path:"/auth/Register" , element:<Register/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
