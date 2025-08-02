import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Pages/Home.jsx'
import Login from './Pages/auth/Login.jsx'
import Register from './Pages/auth/Register.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './context/UserContext'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {path:"/" , element : <Home/> },
  {path:"/auth/login" , element: <Login/>},
  {path:"/auth/Register" , element:<Register/>}
])
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router}/>
        <ToastContainer position="top-center" autoClose={3000} pauseOnHover={false} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
